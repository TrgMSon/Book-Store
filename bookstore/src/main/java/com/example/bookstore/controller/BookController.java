package com.example.bookstore.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.dto.BookResponseDTO;
import com.example.bookstore.service.BookService;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public ArrayList<BookResponseDTO> getBooks(@RequestParam(required = false) String type) {
        return bookService.getBooks(type);
    }

    @GetMapping("/{bookId}")
    public BookResponseDTO getBookDetail(@PathVariable int bookId) {
        return bookService.getBookDetail(bookId);
    }
}
