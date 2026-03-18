package com.example.bookstore.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Invoice {
    @Id
    @Column(name="invoice_id", nullable = false)
    private int invoiceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_Id", nullable = false)
    private User user;

    @Column(name="total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name="created_at", nullable = false)
    private LocalDateTime createdAt;
}
