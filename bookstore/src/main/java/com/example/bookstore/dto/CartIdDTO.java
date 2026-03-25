package com.example.bookstore.dto;

import lombok.Data;

@Data
public class CartIdDTO {
    private int cartId;

    public CartIdDTO(int cartId) {
        this.cartId = cartId;
    }
}
