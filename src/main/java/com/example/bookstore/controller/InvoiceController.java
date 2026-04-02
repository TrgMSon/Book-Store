package com.example.bookstore.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.model.Invoice;
import com.example.bookstore.service.InvoiceService;

@RestController
@RequestMapping("/api/manage")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/getAllInvoice")
    public ArrayList<Invoice> getAllInvoice() {
        return invoiceService.findAllInvoice();
    }
}
