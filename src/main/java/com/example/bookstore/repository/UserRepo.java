package com.example.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    @Query(value = """
            SELECT * FROM user WHERE user_id=?1 AND password=?2
            """, nativeQuery = true)
    User findById(String id, String password);
}