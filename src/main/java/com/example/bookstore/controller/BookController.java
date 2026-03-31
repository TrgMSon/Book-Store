package com.example.bookstore.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.bookstore.dto.BookDTO2;
import com.example.bookstore.dto.BookDTO3;
import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    private BookService bookService;
    
    @Autowired
    private Cloudinary cloudinary;

    @GetMapping("/getBookType")
    public ArrayList<Book> getBookType(@RequestParam String type) {
        return bookService.getAllBook(type);
    }

    @GetMapping("/pagingBook")
    public ArrayList<Book> getPagingBook(@RequestParam int index) {
        return bookService.pagingBook(index * 10);
    }

    @GetMapping("/viewBook")
    public Book viewBook(@RequestParam int bookId) {
        return bookService.findBookById(bookId);
    }

    @PostMapping("/addQtyBook")
    public void addQtyBook(@RequestBody BookDTO2 bookDTO2) {
        bookService.addQtyBook(bookDTO2.getQuantity(), bookDTO2.getBookId());
    }

    @PostMapping("/upload-image")
    public String uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        // String fileName = file.getOriginalFilename();
        // Path uploadDir = Paths.get("uploads");

        // if (!Files.exists(uploadDir)) {
        //     Files.createDirectories(uploadDir);
        // }

        // Path path = uploadDir.resolve(fileName);

        // Files.copy(file.getInputStream(), path);

        // return "/uploads/" + fileName;
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("url").toString();
    }

    @PostMapping("/addBook")
    public void addBook(@RequestBody BookDTO3 book) {
        bookService.addBook(book);
    }
}