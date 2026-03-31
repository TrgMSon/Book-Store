package com.example.bookstore.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.model.Cart;
import com.example.bookstore.model.CartDetail;
import com.example.bookstore.model.User;
import com.example.bookstore.dto.CartDetailDTO;
import com.example.bookstore.repository.UserRepo;;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User findUserByEmail(String email, String password) {
        User result = userRepo.findByEmail(email, password);
        return result;
    }

    public ArrayList<CartDetailDTO> itemsInCart(int userId) {
        ArrayList<CartDetail> cartDetails = userRepo.findItemInCart(userId);
        ArrayList<CartDetailDTO> items = new ArrayList<>();

        for (CartDetail i : cartDetails) {
            items.add(new CartDetailDTO(i.getCart().getCartId(), i.getBook().getBookId(), i.getQuantity(), i.getBook().getName(), i.getBook().getPrice()));
        }

        return items;
    }

    public Cart findCart(int userId) {
        return userRepo.findCartByUserId(userId);
    }

    public void createCart(int userId, LocalDateTime createdAt) {
        userRepo.createCart(userId, createdAt);
    }

    public void addItemCart(int cartId, int bookId) {
        userRepo.addItemCart(cartId, bookId, 1);
    }

    public void deleteCart(int userId) {
        userRepo.deleteCart(userId);
    }

    public void saveUser(User user) {
        userRepo.save(user.getEmail(), user.getName(), user.getPassword());
    }

    public boolean isItemExist(int cartId, int bookId) {
        return userRepo.isItemExist(cartId, bookId) != null;
    }

    public void updateCart(int quantity, int cartId, int bookId) {
        userRepo.updateCart(quantity, cartId, bookId);
    }

    public void deleteItemInCart(int cartId, int bookId) {
        userRepo.deleteItemInCart(cartId, bookId);
    }

    public void createInvoice(int userId, String totalAmount) {
        userRepo.createInvoice(userId, new BigDecimal(totalAmount), LocalDateTime.now());
    }

    public void addItemInvoice(int invoiceId, int bookId, int quantity, BigDecimal price) {
        userRepo.addItemInvoice(invoiceId, bookId, quantity, price);
    }

    public int findInvoiceId(int userId) {
        return userRepo.findInvoiceId(userId);
    }

    public void deleteInvoice(int userId) {
        userRepo.deleteInvoice(userId);
    }
}
