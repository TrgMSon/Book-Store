package com.example.bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {
    List<Book> findAllByOrderByBookIdAsc();

    List<Book> findByTypeIgnoreCaseOrderByBookIdAsc(String type);

    @Query("SELECT b.quantity FROM Book b WHERE b.bookId = ?1")
    Integer findQty(int bookId);
}
