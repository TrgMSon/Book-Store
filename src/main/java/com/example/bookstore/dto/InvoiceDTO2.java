package com.example.bookstore.dto;

import java.math.BigDecimal;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO2 {
    private String userName;
    private String email;
    private ArrayList<InvoiceDetailDTO> invoiceDetails;
    private BigDecimal totalAmount;
}
