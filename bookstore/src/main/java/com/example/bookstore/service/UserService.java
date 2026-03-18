package com.example.bookstore.service;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public ArrayList<CartDetailDTO> itemsInCart(String userId) {
        ArrayList<CartDetail> cartDetails = userRepo.findItemInCart(userId);
        ArrayList<CartDetailDTO> items = new ArrayList<>();

        for (CartDetail i : cartDetails) {
            items.add(new CartDetailDTO(i.getCart().getCartId(), i.getBook().getBookId(), i.getQuantity(), i.getBook().getName(), i.getBook().getPrice()));
        }

        return items;
    }

    public void createdCart(String userId, LocalDateTime createdAt) {
        userRepo.createCart(userId, createdAt);
    }

    public void deleteCart(String userId) {
        userRepo.deleteCart(userId);
    }

    public void saveUser(User user) {
        userRepo.save(user.getEmail(), user.getName(), user.getPassword());
    }
}
