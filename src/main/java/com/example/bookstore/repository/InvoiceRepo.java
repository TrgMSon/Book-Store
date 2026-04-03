package com.example.bookstore.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.Invoice;
import com.example.bookstore.model.InvoiceDetail;

@Repository
public interface InvoiceRepo extends JpaRepository<Invoice, Integer> {
    @Query(value = "SELECT * FROM invoice", nativeQuery = true)
    public ArrayList<Invoice> findAllInvoice();

    @Query(value = """
            SELECT it.* FROM invoice_detail AS it
            JOIN invoice AS i ON i.invoice_id = it.invoice_id
            WHERE i.invoice_id = ?1
            """, nativeQuery = true)
    public ArrayList<InvoiceDetail> findInvoiceDetails(int invoiceId);

    @Query(value = "SELECT * FROM invoice WHERE invoice_id=?1", nativeQuery = true)
    public Invoice findInvoice(int invoiceId);
}
