package com.example.bookstore.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class InvoiceDetailId implements Serializable {
    @Column(name="invoice_id", nullable=false)
    private int invoiceId;

    @Column(name="book_id", nullable=false)
    private int bookId;
}