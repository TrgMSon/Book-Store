package com.example.bookstore.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.User;

import com.example.bookstore.model.CartDetail;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    @Query(value = """
            SELECT * FROM user WHERE email=?1 AND password=?2
            """, nativeQuery = true)
    User findByEmail(String email, String password);

    @Query(value="""
            SELECT cd.* FROM cart_detail AS cd
	            JOIN cart AS c ON c.cart_id = cd.cart_id
                WHERE c.user_id = ?1;
            """, nativeQuery = true)
    ArrayList<CartDetail> findItemInCart(String userId);

    @Modifying
    @Query(value = "INSERT INTO cart(user_id, created_at) VALUES(?1, ?2)", nativeQuery = true)
    void createCart(String userId, LocalDateTime createdAt);

    @Modifying
    @Query(value = "DELETE FROM cart WHERE user_id=?1", nativeQuery = true)
    void deleteCart(String userId);

    @Modifying
    @Query(value = "INSERT INTO user(email, name, password) VALUES(?1, ?2, ?3)", nativeQuery = true)
    void save(String email, String name, String password);
}