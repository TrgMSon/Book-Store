package com.example.bookstore.dto;

import lombok.Data;

@Data
public class BookDTO {
    private int bookId;
    private int cartId;

    public BookDTO(int bookId, int cartId) {
        this.bookId = bookId;
        this.cartId = cartId;
    }
}
