package com.github.schulzenrico.esource.services;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.repositories.BookmarkRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookmarkService {
    private BookmarkRepository bookmarkRepository;

    public Bookmark addBookmark(BookmarkDTO bookmarkDTO) {
       return bookmarkRepository.save(Bookmark.builder()
                .url(bookmarkDTO.url())
                .destination(bookmarkDTO.destination())
                .dropdownCategory(bookmarkDTO.dropdownCategory())
                .name(bookmarkDTO.name())
                .title(bookmarkDTO.title())
        .build());
    }

    public List<BookmarkDTO> getAllBookmarksAsDTO() {
        List<Bookmark> bookmarks = bookmarkRepository.findAll();
        return bookmarks.stream()
                .map(this::convertToDTO)
                .toList();
    }

    private BookmarkDTO convertToDTO(Bookmark bookmark) {
        return BookmarkDTO.builder()
                        .id(bookmark.id())
                        .url(bookmark.url())
                        .destination(bookmark.destination())
                        .dropdownCategory(bookmark.dropdownCategory())
                        .name(bookmark.name())
                        .title(bookmark.title())
                .build();
    }

    public Bookmark editBookmark(String id, BookmarkDTO updatedBookmarkDTO) {
        Bookmark existingBookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bookmark not found."));

        // Überprüfen, ob die bereitgestellte URL nicht leer ist, bevor sie aktualisiert wird
        String updatedUrl = updatedBookmarkDTO.url();
        String updatedDestination = updatedBookmarkDTO.destination();
        String updatedDropdownCategory = updatedBookmarkDTO.dropdownCategory();
        String updatedName = updatedBookmarkDTO.name();
        String updatedTitle = updatedBookmarkDTO.title();

        Bookmark updatedBookmark = existingBookmark
                .withUrl(updatedUrl)
                .withDestination(updatedDestination)
                .withDropdownCategory(updatedDropdownCategory)
                .withName(updatedName)
                .withTitle(updatedTitle);

        return bookmarkRepository.save(updatedBookmark);
    }

    public void deleteBookmark(String id) {
        bookmarkRepository.deleteById(id);
    }
}
