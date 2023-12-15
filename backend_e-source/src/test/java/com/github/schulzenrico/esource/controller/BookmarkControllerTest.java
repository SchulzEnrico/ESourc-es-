package com.github.schulzenrico.esource.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.services.BookmarkService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = BookmarkController.class)
@ExtendWith(MockitoExtension.class)
class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookmarkService bookmarkService;

    @InjectMocks
    private BookmarkController bookmarkController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddBookmark() throws Exception {
        // Mocking
        Bookmark bookmark = Bookmark.builder()
                .id("4117")
                .title("Test Bookmark")
                .url("http://example.com")
                .build();
        when(bookmarkService.addBookmark(any(BookmarkDTO.class))).thenReturn(bookmark);

        // Test
        mockMvc.perform(post("/api/bookmarks/add")
                        .contentType("application/json")
                        .content("{\"bookmarkTitle\":\"Test Bookmark\",\"bookmarkUrl\":\"http://example.com\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAllBookmarksAsDTO() throws Exception {
        // Mocking
        BookmarkDTO bookmarkDTO1 = BookmarkDTO.builder()
                .title("Bookmark 1")
                .url("http://bookmark1.com")
                .build();
        BookmarkDTO bookmarkDTO2 = BookmarkDTO.builder()
                .title("Bookmark 2")
                .url("http://bookmark2.com")
                .build();
        List<BookmarkDTO> bookmarkDTOList = Arrays.asList(bookmarkDTO1, bookmarkDTO2);
        when(bookmarkService.getAllBookmarksAsDTO()).thenReturn(bookmarkDTOList);

        // Test
        mockMvc.perform(get("/api/bookmarks/getAll"))
                .andExpect(status().isOk());
    }

    @Test
    void testEditBookmark() throws Exception {
        // Mocking
        String bookmarkId = "4117";
        BookmarkDTO updatedBookmarkDTO = BookmarkDTO.builder()
                .id(bookmarkId)
                .url("http://EDIT-example.com")
                .destination("EDIT Frame1")
                .dropdownCategory("EDIT Dropdown Category")
                .title("EDIT Titel")
                .build();

        Bookmark expectedBookmark = Bookmark.builder()
                .id(bookmarkId)
                .url("http://EDIT-example.com")
                .destination("EDIT Frame1")
                .dropdownCategory("EDIT Dropdown Category")
                .title("EDIT Titel")
                .build();

        when(bookmarkService.editBookmark(eq(bookmarkId), any(BookmarkDTO.class))).thenReturn(expectedBookmark);

        // Perform the request
        mockMvc.perform(put("/api/bookmarks/edit/{id}", bookmarkId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedBookmarkDTO)))
                .andExpect(status().isOk());

        // Verify that editBookmark method was called
        verify(bookmarkService, times(1)).editBookmark(eq(bookmarkId), any(BookmarkDTO.class));
    }

    @Test
    void testDeleteBookmark() {
        // Arrange
        String bookmarkId = "123";

        // Act
        bookmarkController.deleteBookmark(bookmarkId);

        // Assert
        verify(bookmarkService, times(1)).deleteBookmark(bookmarkId);
    }
}
