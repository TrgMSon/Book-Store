package com.example.bookstore.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartDetailDTO {
    private int cartId, bookId, quantity;
    private String bookName;
    private BigDecimal price;
}
