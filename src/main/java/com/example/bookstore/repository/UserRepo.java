package com.example.bookstore.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.User;

import jakarta.transaction.Transactional;

import com.example.bookstore.model.Cart;
import com.example.bookstore.model.CartDetail;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
        @Query(value = """
                        SELECT * FROM user WHERE email=?1 AND password=?2
                        """, nativeQuery = true)
        User findByEmail(String email, String password);

        @Query(value = """
                           SELECT cd.* FROM cart_detail AS cd
                        JOIN cart AS c ON c.cart_id = cd.cart_id
                               WHERE c.user_id = ?1;
                           """, nativeQuery = true)
        ArrayList<CartDetail> findItemInCart(int userId);

        @Query(value = """
                        SELECT cd.* FROM cart_detail AS cd
                            WHERE cd.cart_id = ?1 AND cd.book_id = ?2;
                        """, nativeQuery = true)
        CartDetail isItemExist(int cartId, int bookId);

        @Query(value = "SELECT * FROM cart WHERE user_id = ?1", nativeQuery = true)
        Cart findCartByUserId(int userId);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO cart(user_id, created_at) VALUES(?1, ?2)", nativeQuery = true)
        void createCart(int userId, LocalDateTime createdAt);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO cart_detail(cart_id, book_id, quantity) VALUES(?1, ?2, ?3)", nativeQuery = true)
        void addItemCart(int cartId, int bookId, int quantity);

        @Transactional
        @Modifying
        @Query(value = "DELETE FROM cart WHERE user_id=?1", nativeQuery = true)
        void deleteCart(int userId);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO user(email, name, password, role) VALUES(?1, ?2, ?3, ?4)", nativeQuery = true)
        void save(String email, String name, String password, String role);

        @Transactional
        @Modifying
        @Query(value = "UPDATE cart_detail SET quantity=?1 WHERE cart_id=?2 AND book_id=?3", nativeQuery = true)
        void updateCart(int quantity, int cartId, int bookId);

        @Transactional
        @Modifying
        @Query(value = "DELETE FROM cart_detail WHERE cart_id=?1 AND book_id=?2", nativeQuery = true)
        void deleteItemInCart(int cartId, int bookId);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO invoice(user_id, total_amount, created_at) VALUES(?1, ?2, ?3)", nativeQuery = true)
        void createInvoice(int userId, BigDecimal totalAmount, LocalDateTime createdAt);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO invoice(user_id, cust_name, cust_email, total_amount, created_at) VALUES(?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
        void createInvoiceForClone(int userId, String cust_name, String cust_email, BigDecimal totalAmount, LocalDateTime createdAt);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO invoice_detail(invoice_id, book_id, quantity, price) VALUES(?1, ?2, ?3, ?4)", nativeQuery = true)
        void addItemInvoice(int invoiceId, int bookId, int quantity, BigDecimal price);

        @Query(value = """
                SELECT invoice_id FROM invoice WHERE user_id=?1 
                    ORDER BY created_at DESC
                    LIMIT 1
                """, nativeQuery = true)
        int findInvoiceId(int userId);

        @Transactional
        @Modifying
        @Query(value = "DELETE FROM invoice WHERE user_id=?1 ORDER BY created_at DESC LIMIT 1", nativeQuery = true)
        void deleteInvoice(int userId);

        @Transactional
        @Modifying
        @Query(value = "INSERT INTO user(role) VALUES('clone')", nativeQuery = true)
        void createCloneUser();

        @Query(value = "SELECT user_id FROM user WHERE role = 'clone' ORDER BY user_id DESC LIMIT 0, 1", nativeQuery = true)
        int getCloneUserId();

        @Transactional
        @Modifying
        @Query(value = "UPDATE user SET name = ?1, email = ?2 WHERE user_id = ?3", nativeQuery = true)
        void updateCloneInfor(String name, String email, int userId);

        @Transactional
        @Modifying
        @Query(value = "DELETE FROM user WHERE user_id = ?1", nativeQuery = true)
        void deleteCloneUser(int userId);
}