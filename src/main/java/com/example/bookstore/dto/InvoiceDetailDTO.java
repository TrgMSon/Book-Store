package com.example.bookstore.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InvoiceDetailDTO {
    private String bookName;
    private int quantity;
    private BigDecimal price;
}