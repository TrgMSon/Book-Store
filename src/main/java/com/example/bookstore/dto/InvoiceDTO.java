package com.example.bookstore.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InvoiceDTO {
    private int invoiceId;
    private LocalDateTime createdAt;
}
