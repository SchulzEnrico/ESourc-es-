package com.github.schulzenrico.esource.services;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.repositories.BookmarkRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookmarkServiceTest {

    @Mock
    private BookmarkRepository bookmarkRepository;

    @InjectMocks
    private BookmarkService bookmarkService;

    @Test
    void testAddBookmark() {
        // Mocking
        BookmarkDTO bookmarkDTO = BookmarkDTO.builder()
                .title("Test Bookmark")
                .url("http://example.com")
                .build();
        Bookmark expectedBookmark = Bookmark.builder()
                .id("4117")
                .title("Test Bookmark")
                .url("http://example.com")
                .build();
        when(bookmarkRepository.save(any(Bookmark.class))).thenReturn(expectedBookmark);

        // Test
        Bookmark actualBookmark = bookmarkService.addBookmark(bookmarkDTO);
        assertEquals(expectedBookmark, actualBookmark);
    }

    @Test
    void testGetAllBookmarksAsDTO() {
        // Mocking
        Bookmark bookmark1 = Bookmark.builder()
                .title("Bookmark 1")
                .url("http://bookmark1.com")
                .build();
        Bookmark bookmark2 = Bookmark.builder()
                .title("Bookmark 2")
                .url("http://bookmark2.com")
                .build();
        List<Bookmark> bookmarks = Arrays.asList(bookmark1, bookmark2);
        when(bookmarkRepository.findAll()).thenReturn(bookmarks);

        // Test
        List<BookmarkDTO> bookmarkDTOList = bookmarkService.getAllBookmarksAsDTO();
        assertEquals(2, bookmarkDTOList.size());
        assertEquals("Bookmark 1", bookmarkDTOList.get(0).title());
        assertEquals("http://bookmark1.com", bookmarkDTOList.get(0).url());
        assertEquals("Bookmark 2", bookmarkDTOList.get(1).title());
        assertEquals("http://bookmark2.com", bookmarkDTOList.get(1).url());
    }
}
