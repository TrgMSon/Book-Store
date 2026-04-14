package com.example.bookstore.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

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
        User result = userRepo.findByEmailAndPassword(email, password);
        return result;
    }

    public boolean checkUserExist(String email) {
        ArrayList<User> result = userRepo.findByEmail(email);
        return result != null;
    }

    public User findUserById(int userId) {
        Optional<User> optional = userRepo.findById(userId);
        if (optional.isEmpty())
            return null;
        else
            return optional.get();
    }

    public void updateCloneInfor(String name, String email, int userId) {
        userRepo.updateCloneInfor(name, email, userId);
    }

    public ArrayList<CartDetailDTO> itemsInCart(int userId) {
        ArrayList<CartDetail> cartDetails = userRepo.findItemInCart(userId);
        ArrayList<CartDetailDTO> items = new ArrayList<>();

        for (CartDetail i : cartDetails) {
            items.add(new CartDetailDTO(i.getCart().getCartId(), i.getBook().getBookId(), i.getQuantity(),
                    i.getBook().getName(), i.getBook().getPrice()));
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
        userRepo.save(user.getEmail(), user.getName(), user.getPassword(), "user");
    }

    public int createCloneUser() {
        userRepo.createCloneUser();
        return userRepo.getCloneUserId();
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

    public void createInvoiceForClone(int userId, String cust_name, String cust_email, String totalAmount) {
        userRepo.createInvoiceForClone(userId, cust_name, cust_email, new BigDecimal(totalAmount), LocalDateTime.now());
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

    public void deleteCloneUser(int userId) {
        userRepo.deleteCloneUser(userId);
    }
}
