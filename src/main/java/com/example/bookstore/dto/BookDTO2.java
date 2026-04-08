package com.example.bookstore.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO2 {
    private int bookId;
    private String name;
    private String author;
    private String description;
    private String publish;
    private BigDecimal price;
    private int quantity;
    private String urlImg;
}
