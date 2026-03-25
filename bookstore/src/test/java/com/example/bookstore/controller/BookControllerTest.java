package com.example.bookstore.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import com.example.bookstore.dto.BookResponseDTO;
import com.example.bookstore.service.BookService;

@WebMvcTest(BookController.class)
class BookControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    void shouldReturnBooksByType() throws Exception {
        ArrayList<BookResponseDTO> books = new ArrayList<>();
        books.add(createBook(1, "Clean Code", "IT"));
        books.add(createBook(2, "Effective Java", "IT"));

        when(bookService.getBooks("IT")).thenReturn(books);

        mockMvc.perform(get("/api/books").param("type", "IT"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].bookId").value(1))
            .andExpect(jsonPath("$[0].name").value("Clean Code"))
            .andExpect(jsonPath("$[0].type").value("IT"))
            .andExpect(jsonPath("$[1].bookId").value(2));
    }

    @Test
    void shouldReturnBookDetail() throws Exception {
        when(bookService.getBookDetail(1)).thenReturn(createBook(1, "Clean Code", "IT"));

        mockMvc.perform(get("/api/books/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.bookId").value(1))
            .andExpect(jsonPath("$.author").value("Robert Martin"))
            .andExpect(jsonPath("$.price").value(450000));
    }

    @Test
    void shouldReturnNotFoundWhenBookDoesNotExist() throws Exception {
        when(bookService.getBookDetail(999))
            .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay sach voi id = 999"));

        mockMvc.perform(get("/api/books/999"))
            .andExpect(status().isNotFound());
    }

    private BookResponseDTO createBook(int bookId, String name, String type) {
        BookResponseDTO book = new BookResponseDTO();
        book.setBookId(bookId);
        book.setName(name);
        book.setDescription("Mo ta sach");
        book.setAuthor("Robert Martin");
        book.setPublish(LocalDateTime.of(2010, 1, 1, 0, 0));
        book.setPrice(BigDecimal.valueOf(450000));
        book.setQuantity(20);
        book.setUrlImg("/uploads/book.jpg");
        book.setType(type);
        return book;
    }
}
