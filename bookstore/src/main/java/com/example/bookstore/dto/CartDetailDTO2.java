package com.example.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartDetailDTO2 {
    private int cartId;
    private int bookId;
}
