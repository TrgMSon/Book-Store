package com.example.bookstore.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookstore.model.Invoice;

@Repository
public interface InvoiceRepo extends JpaRepository<Invoice, Integer> {
    @Query(value = "SELECT * FROM invoice", nativeQuery = true)
    public ArrayList<Invoice> findAllInvoice();
}
