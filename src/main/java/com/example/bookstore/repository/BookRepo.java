package com.example.bookstore.repository;

import java.math.BigDecimal;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.Book;

import jakarta.transaction.Transactional;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {
    @Query(value="SELECT * FROM book WHERE type=?1", nativeQuery = true)
    ArrayList<Book> findAllBookType(String type);

    @Query(value = "SELECT * FROM book WHERE book_id = ?1", nativeQuery = true)
    Book findBookById(int bookId);

    @Query(value = "SELECT quantity FROM book WHERE book_id = ?1", nativeQuery = true)
    int findQty(int bookId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE book SET quantity = quantity - ?1 WHERE book_id = ?2", nativeQuery = true)
    void updateQtyBook(int quantity, int bookId);

    @Query(value = "SELECT * FROM book ORDER BY book_id LIMIT ?1 , 10", nativeQuery = true)
    ArrayList<Book> pagingBook(int index);

    @Transactional
    @Modifying
    @Query(value = "UPDATE book SET quantity = ?1 WHERE book_id = ?2", nativeQuery = true)
    void addQtyBook(int quantity, int bookId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO book(name, description, author, publish, price, quantity, url_img, type) VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)", nativeQuery = true)
    void addBook(String name, String description, String author, String publish, BigDecimal price, int quantity, String urlImg, String type);
}
