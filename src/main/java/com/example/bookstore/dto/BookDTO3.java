package com.example.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO3 {
    private String name;
    private String description;
    private String author;
    private String publish;
    private String price;
    private String quantity;
    private String urlImg;
    private String type;
}
