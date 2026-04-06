package com.example.bookstore.service;

import java.math.BigDecimal;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.bookstore.dto.BookDTO3;
import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepo;

@Service
public class BookService {
    @Autowired
    private BookRepo bookRepo;

    public ArrayList<Book> getAllBookType(String type) {
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

    public void updateQtyBook(int bookId, int quantity) {
        bookRepo.updateQtyBook(quantity, bookId);
    }

    public ArrayList<Book> pagingBook(int index) {
        Pageable pageable = PageRequest.of(index, 10);
        return bookRepo.pagingBook(pageable);
    }

    public ArrayList<Book> getAllBook() {
        return bookRepo.findAllBook();
    }

    public void addQtyBook(int quantity, int bookId) {
        bookRepo.addQtyBook(quantity, bookId);
    }

    public void addBook(BookDTO3 book) {
        BigDecimal price = new BigDecimal(book.getPrice());
        int qty = Integer.parseInt(book.getQuantity());
        bookRepo.addBook(book.getName(), book.getDescription(), book.getAuthor(), book.getPublish(), price, qty, book.getUrlImg(), book.getType());
    }

    public ArrayList<Book> searchBookType(String type, String name) {
        return bookRepo.findBookByNameAndType(type, "%" + name + "%");
    }

    public ArrayList<Book> searchBookManage(String name) {
        return bookRepo.findBookByName("%" + name + "%");
    }

    public void deleteBook(int bookId) {
        bookRepo.deleteBook(bookId);
    }
}