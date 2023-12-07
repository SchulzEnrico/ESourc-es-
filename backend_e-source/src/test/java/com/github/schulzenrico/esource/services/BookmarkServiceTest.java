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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookmarkServiceTest {

    @Mock
    private BookmarkRepository bookmarkRepository;

    @InjectMocks
    private BookmarkService bookmarkService;

        @Test
        void testAddBookmark () {
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
        void testGetAllBookmarksAsDTO () {
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

        @Test
        void testEditBookmark () {
            // Mocking
            String bookmarkId = "4117";
            Bookmark bookmark = Bookmark.builder()
                    .id(bookmarkId)
                    .url("http://example.com")
                    .destination("Frame1")
                    .dropdownCategory("Test Dropdown Category")
                    .title("Test Titel")
                    .name("Test Name")
                    .build();

            BookmarkDTO updatedBookmarkDTO = BookmarkDTO.builder()
                    .id(bookmarkId)
                    .url("http://EDIT-example.com")
                    .destination("EDIT Frame1")
                    .dropdownCategory("EDIT Dropdown Category")
                    .title("EDIT Titel")
                    .name("EDIT Name")
                    .build();

            Bookmark expectedBookmark = Bookmark.builder()
                    .id(bookmarkId)
                    .url("http://EDIT-example.com")
                    .destination("EDIT Frame1")
                    .dropdownCategory("EDIT Dropdown Category")
                    .title("EDIT Titel")
                    .name("EDIT Name")
                    .build();

            when(bookmarkRepository.findById(bookmarkId)).thenReturn(Optional.of(bookmark));
            when(bookmarkRepository.save(any(Bookmark.class))).thenReturn(expectedBookmark);

            // Call the method
            Bookmark result = bookmarkService.editBookmark(bookmarkId, updatedBookmarkDTO);

            // Verify the result
            assertEquals(expectedBookmark, result);

            // Verify that findById and save methods were called
            verify(bookmarkRepository, times(1)).findById(bookmarkId);
            verify(bookmarkRepository, times(1)).save(any(Bookmark.class));
        }

        @Test
        void testDeleteBookmark () {
            // Mocking
            String bookmarkId = "4117";

            // Call the method
            bookmarkService.deleteBookmark(bookmarkId);

            // Verify that deleteById method was called
            verify(bookmarkRepository, times(1)).deleteById(bookmarkId);
        }
    }