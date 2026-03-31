package com.example.bookstore.dto;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartDTO {
    private String totalAmount;
    private ArrayList<CartDetailDTO> cartDetail;
}
