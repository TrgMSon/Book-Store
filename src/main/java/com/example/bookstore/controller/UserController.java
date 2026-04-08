package com.example.bookstore.controller;

import com.example.bookstore.dto.UserDTO;
import com.example.bookstore.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getRoleUser")
    public String createCloneUser(HttpSession session) {
        int userId = Integer.parseInt((String) session.getAttribute("userId"));
        return userService.findUserById(userId).getRole();
    }
    
    @GetMapping("/getUserId")
    public String getMethodName(HttpSession session) {
        return (String) session.getAttribute("userId");
    }
    
    @PostMapping("/updateCloneInfor")
    public void updateCloneInfor(@RequestBody UserDTO userDTO, HttpSession session) {
        int userId = Integer.parseInt((String) session.getAttribute("userId"));
        userService.updateCloneInfor(userDTO.getName(), userDTO.getEmail(), userId);
    }
    
    @PostMapping("/deleteCloneUser")
    public void deleteCloneUser(HttpSession session) {
        int userId = Integer.parseInt((String) session.getAttribute("userId"));
        session.invalidate();
        userService.deleteCloneUser(userId);
    }
    
}
