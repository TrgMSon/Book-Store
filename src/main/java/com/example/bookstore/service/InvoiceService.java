package com.example.bookstore.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.model.Invoice;
import com.example.bookstore.repository.InvoiceRepo;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepo;

    public ArrayList<Invoice> findAllInvoice() {
        return invoiceRepo.findAllInvoice();
    }
}
