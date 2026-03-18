package com.example.bookstore.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.dto.CartDetailDTO;
import com.example.bookstore.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private UserService userService;

    @GetMapping("/viewCart")
    public ArrayList<CartDetailDTO> viewCart(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        return userService.itemsInCart(userId);
    }
}
