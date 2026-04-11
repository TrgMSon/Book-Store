package com.example.bookstore.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.dto.InvoiceDTO;
import com.example.bookstore.dto.InvoiceDTO2;
import com.example.bookstore.dto.InvoiceDetailDTO;
import com.example.bookstore.model.Invoice;
import com.example.bookstore.model.InvoiceDetail;
import com.example.bookstore.repository.InvoiceRepo;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepo;

    public ArrayList<InvoiceDTO> findAllInvoice() {
        ArrayList<Invoice> invoices = invoiceRepo.findAllInvoice();
        ArrayList<InvoiceDTO> invoiceDTOs = new ArrayList<>();

        for (Invoice invoice : invoices) {
            invoiceDTOs.add(new InvoiceDTO(invoice.getInvoiceId(), invoice.getCreatedAt()));
        }

        return invoiceDTOs;
    }

    public InvoiceDTO2 findInvoiceDetail(int invoiceId) {
        InvoiceDTO2 invoiceDTO2 = new InvoiceDTO2();

        Invoice invoice = invoiceRepo.findInvoice(invoiceId);
        if (invoice.getUser() == null) {
            invoiceDTO2.setUserName(invoice.getCustomerName());
            invoiceDTO2.setEmail(invoice.getCustomerEmail());
        } else {
            invoiceDTO2.setUserName(invoice.getUser().getName());
            invoiceDTO2.setEmail(invoice.getUser().getEmail());
        }

        invoiceDTO2.setTotalAmount(invoice.getTotalAmount());

        ArrayList<InvoiceDetail> invoiceDetails = invoiceRepo.findInvoiceDetails(invoiceId);
        ArrayList<InvoiceDetailDTO> invoiceDetailDTOs = new ArrayList<>();
        for (InvoiceDetail invoiceDetail : invoiceDetails) {
            invoiceDetailDTOs.add(new InvoiceDetailDTO(invoiceDetail.getBook().getName(), invoiceDetail.getQuantity(),
                    invoiceDetail.getPrice()));
        }
        invoiceDTO2.setInvoiceDetails(invoiceDetailDTOs);

        return invoiceDTO2;
    }

    public Integer findUserIdOfInvoice(int invoiceId) {
        return invoiceRepo.findUserIdOfInvoice(invoiceId);
    }

    public ArrayList<BigDecimal> getTotalMonth(LocalDate target) {
        ArrayList<BigDecimal> listIncome = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
            String date = target.format(formatter);
            System.out.println(date);
            listIncome.add(invoiceRepo.getTotal("%" + date + "%"));
            target = target.plusMonths(1);
        }

        return listIncome;
    }

    public BigDecimal getTotalYear(String date) {
        return invoiceRepo.getTotal("%" + date + "%");
    }
}