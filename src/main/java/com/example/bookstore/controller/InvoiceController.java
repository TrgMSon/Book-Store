package com.example.bookstore.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.dto.InvoiceDTO;
import com.example.bookstore.dto.InvoiceDTO2;
import com.example.bookstore.service.InvoiceService;

@RestController
@RequestMapping("/api/manage")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/getAllInvoice")
    public ArrayList<InvoiceDTO> getAllInvoice() {
        return invoiceService.findAllInvoice();
    }

    @GetMapping("/viewInvoiceDetail")
    public InvoiceDTO2 viewInvoiceDetail(@RequestParam int invoiceId) {
        return invoiceService.findInvoiceDetail(invoiceId);
    }

    @GetMapping("/checkDiscount")
    public String checkDiscount(@RequestParam int invoiceId) {
        if (invoiceService.findUserIdOfInvoice(invoiceId) == null) return "noDiscount";
        return "discount";
    }
    
    @GetMapping("/getTotalYear")
    public ArrayList<BigDecimal> getIncomes(@RequestParam String date) {
        LocalDate target = LocalDate.of(Integer.parseInt(date), 1, 1);
        return invoiceService.getTotalYear(target);
    }
}