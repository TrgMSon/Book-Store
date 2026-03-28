package com.example.bookstore.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookResponseDTO {
    private Integer bookId;
    private String name;
    private String description;
    private String author;
    private LocalDateTime publish;
    private BigDecimal price;
    private Integer quantity;
    private String urlImg;
    private String type;
}
