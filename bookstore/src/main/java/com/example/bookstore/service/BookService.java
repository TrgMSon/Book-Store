package com.example.bookstore.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepo;

@Service
public class BookService {
    @Autowired
    private BookRepo bookRepo;

    public ArrayList<Book> getAllBook(String type) {
        ArrayList<Book> books = new ArrayList<>();
        books = bookRepo.findAllBookType(type);
        return books;
    }

    public Book findBookById(int id) {
        return bookRepo.findBookById(id);
    }

    public boolean isInStock(int bookId, int cartQty) {
        return cartQty <= bookRepo.findQty(bookId);
    }
}
