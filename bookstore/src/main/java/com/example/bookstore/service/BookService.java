package com.example.bookstore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.bookstore.dto.BookResponseDTO;
import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepo;

@Service
public class BookService {
    @Autowired
    private BookRepo bookRepo;

    public ArrayList<Book> getAllBook(String type) {
        List<Book> books;

        if (type == null || type.trim().isEmpty()) {
            books = bookRepo.findAllByOrderByBookIdAsc();
        }
        else {
            books = bookRepo.findByTypeIgnoreCaseOrderByBookIdAsc(type.trim());
        }

        return new ArrayList<>(books);
    }

    public Book findBookById(int id) {
        return bookRepo.findById(id).orElse(null);
    }

    public ArrayList<BookResponseDTO> getBooks(String type) {
        ArrayList<BookResponseDTO> books = new ArrayList<>();

        for (Book book : getAllBook(type)) {
            books.add(toBookResponse(book));
        }

        return books;
    }

    public BookResponseDTO getBookDetail(int id) {
        Book book = bookRepo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay sach voi id = " + id));

        return toBookResponse(book);
    }

    public boolean isInStock(int bookId, int cartQty) {
        Integer quantity = bookRepo.findQty(bookId);
        return quantity != null && cartQty <= quantity;
    }

    private BookResponseDTO toBookResponse(Book book) {
        BookResponseDTO response = new BookResponseDTO();
        response.setBookId(book.getBookId());
        response.setName(book.getName());
        response.setDescription(book.getDescription());
        response.setAuthor(book.getAuthor());
        response.setPublish(book.getPublish());
        response.setPrice(book.getPrice());
        response.setQuantity(book.getQuantity());
        response.setUrlImg(book.getUrlImg());
        response.setType(book.getType());
        return response;
    }
}
