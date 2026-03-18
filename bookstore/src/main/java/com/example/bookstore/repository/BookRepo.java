package com.example.bookstore.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {
    @Query(value="SELECT * FROM book WHERE type=?1", nativeQuery = true)
    ArrayList<Book> findAllBookType(String type);

    @Query(value = "SELECT * FROM book WHERE book_id = ?1", nativeQuery = true)
    Book findBookById(int bookId);
}
