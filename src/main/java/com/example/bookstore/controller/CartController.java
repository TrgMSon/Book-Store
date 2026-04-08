package com.example.bookstore.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.dto.BookDTO;
import com.example.bookstore.dto.CartDTO;
import com.example.bookstore.dto.CartDetailDTO;
import com.example.bookstore.dto.CartDetailDTO2;
import com.example.bookstore.dto.CartDetailDTO4;
import com.example.bookstore.dto.CartIdDTO;
import com.example.bookstore.model.User;
import com.example.bookstore.service.BookService;
import com.example.bookstore.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @GetMapping("/viewCart")
    public ArrayList<CartDetailDTO> viewCart(HttpSession session) {
        String tmp = (String) session.getAttribute("userId");
        int userId = 0;
        
        if (tmp == null) {
            userId = userService.createCloneUser();
            session.setAttribute("userId", userId+"");
        }
        else userId = Integer.parseInt(tmp);

        return userService.itemsInCart(userId);
    }

    @PostMapping("/createCart")
    public void createCart(HttpSession session) {
        String tmp = (String) session.getAttribute("userId");
        int userId = 0;
        
        if (tmp == null) {
            userId = userService.createCloneUser();
            session.setAttribute("userId", userId+"");
        }
        else userId = Integer.parseInt(tmp);

        if (userService.findCart(userId) == null) {
            System.out.println(userId + " NULLLL");
            userService.createCart(userId, LocalDateTime.now());
        }
    }

    @GetMapping("/checkExistItem") 
    public boolean checkExistItem(@RequestParam int cartId, @RequestParam int bookId) {
        return userService.isItemExist(cartId, bookId);
    }

    @PostMapping("/addItemCart")
    public void addItemCart(@RequestBody BookDTO book) {
        userService.addItemCart(book.getCartId(), book.getBookId());
    }

    @PostMapping("/deleteCart")
    public void deleteCart(HttpSession session) {
        int userId = Integer.parseInt((String) session.getAttribute("userId"));
        if (userService.findCart(userId) != null) {
            userService.deleteCart(userId);
        }
    }

    @GetMapping("/findCart")
    public CartIdDTO findCart(HttpSession session) {
        String tmp = (String) session.getAttribute("userId");
        int userId = 0;
        
        if (tmp == null) {
            userId = userService.createCloneUser();
            session.setAttribute("userId", userId+"");
        }
        else userId = Integer.parseInt(tmp);

        return new CartIdDTO(userService.findCart(userId).getCartId());
    }

    @PostMapping("/updateCart")
    public void updateCart(@RequestBody ArrayList<CartDetailDTO> cartDetails) {
        for (CartDetailDTO cartDetail : cartDetails) {
            userService.updateCart(cartDetail.getQuantity(), cartDetail.getCartId(), cartDetail.getBookId());
        }
    }

    @PostMapping("/deleteItemCart")
    public void deleteItemCart(@RequestBody CartDetailDTO2 item) {
        userService.deleteItemInCart(item.getCartId(), item.getBookId());
    }

    @PostMapping("/payCart")
    public CartDetailDTO4 payCart(@RequestBody CartDTO cart, HttpSession session) {
        int userId = Integer.parseInt((String) session.getAttribute("userId"));
        
        User user = userService.findUserById(userId);
        if (user.getRole().equals("clone")) {
            userService.createInvoiceForClone(userId, user.getName(), user.getEmail(), cart.getTotalAmount());
        }
        else {
            userService.createInvoice(userId, cart.getTotalAmount());
        }

        int invoiceId = userService.findInvoiceId(userId);

        CartDetailDTO4 ans = new CartDetailDTO4();
        ArrayList<Integer> bookIds = new ArrayList<>();
        for (CartDetailDTO cartDetail : cart.getCartDetail()) {
            if (!bookService.isInStock(cartDetail.getBookId(), cartDetail.getQuantity())) {
                bookIds.add(cartDetail.getBookId());
            }
        }

        if (bookIds.size() > 0) {
            ans.setBookIds(bookIds);
            ans.setResult("false");
            userService.deleteInvoice(userId);
            return ans;
        }

        for (CartDetailDTO cartDetail : cart.getCartDetail()) {
            userService.addItemInvoice(invoiceId, cartDetail.getBookId(), cartDetail.getQuantity(), cartDetail.getPrice());
            bookService.updateQtyBook(cartDetail.getBookId(), cartDetail.getQuantity());
        }

        ans.setResult("true");

        return ans;
    }
}