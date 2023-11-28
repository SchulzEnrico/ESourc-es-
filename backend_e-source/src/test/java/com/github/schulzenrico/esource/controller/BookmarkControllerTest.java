package com.github.schulzenrico.esource.controller;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.services.BookmarkService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = BookmarkController.class)
@ExtendWith(MockitoExtension.class)
public class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookmarkService bookmarkService;

    @Test
    public void testAddBookmark() throws Exception {
        // Mocking
        Bookmark bookmark = Bookmark.builder()
                .id("4117")
                .bookmarkTitle("Test Bookmark")
                .bookmarkUrl("http://example.com")
                .build();
        when(bookmarkService.addBookmark(any(BookmarkDTO.class))).thenReturn(bookmark);

        // Test
        mockMvc.perform(post("/api/bookmarks/add")
                        .contentType("application/json")
                        .content("{\"bookmarkTitle\":\"Test Bookmark\",\"bookmarkUrl\":\"http://example.com\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllBookmarksAsDTO() throws Exception {
        // Mocking
        BookmarkDTO bookmarkDTO1 = BookmarkDTO.builder()
                .bookmarkTitle("Bookmark 1")
                .bookmarkUrl("http://bookmark1.com")
                .build();
        BookmarkDTO bookmarkDTO2 = BookmarkDTO.builder()
                .bookmarkTitle("Bookmark 2")
                .bookmarkUrl("http://bookmark2.com")
                .build();
        List<BookmarkDTO> bookmarkDTOList = Arrays.asList(bookmarkDTO1, bookmarkDTO2);
        when(bookmarkService.getAllBookmarksAsDTO()).thenReturn(bookmarkDTOList);

        // Test
        mockMvc.perform(get("/api/bookmarks/getAll"))
                .andExpect(status().isOk());
    }
}
