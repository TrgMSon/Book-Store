package com.example.bookstore.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.example.bookstore.dto.BookDTO4;
import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private ObjectProvider<Cloudinary> cloudinaryProvider;

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
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        // Local dev can run without Cloudinary. Only the upload endpoint is blocked.
        Cloudinary cloudinary = cloudinaryProvider.getIfAvailable();
        if (cloudinary == null) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Cloudinary chua duoc cau hinh. Hay them CLOUDINARY_NAME, CLOUDINARY_API_KEY va CLOUDINARY_API_SECRET de bat upload anh.");
        }

        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return ResponseEntity.ok(uploadResult.get("url").toString());
    }

    @PostMapping("/addBook")
    public void addBook(@RequestBody BookDTO3 book) {
        bookService.addBook(book);
    }

    @GetMapping("/searchBook")
    public ArrayList<Book> searchBookType(@RequestParam String type, @RequestParam String name) {
        return bookService.searchBookType(type, name);
    }

    @GetMapping("/searchBookManage")
    public ArrayList<Book> searchBookManage(@RequestParam String name) {
        return bookService.searchBookManage(name);
    }

    @PostMapping("/deleteBook")
    public void deleteBook(@RequestBody BookDTO4 bookDTO4) {
        bookService.deleteBook(bookDTO4.getBookId());
    }
}
