package com.github.schulzenrico.esource.services;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.repositories.BookmarkRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookmarkService {

    private BookmarkRepository bookmarkRepository;
    private static final Logger logger = LoggerFactory.getLogger(BookmarkService.class);

    public Bookmark addBookmark(BookmarkDTO bookmarkDTO) {
        return bookmarkRepository.save(Bookmark.builder()
                        .url(bookmarkDTO.url())
                        .dropdownCategory(bookmarkDTO.dropdownCategory())
                        .name(bookmarkDTO.name())
                        .title(bookmarkDTO.title())
                        .target(bookmarkDTO.target())
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
                        .url(bookmark.url())
                        .dropdownCategory(bookmark.dropdownCategory())
                        .name(bookmark.name())
                        .title(bookmark.title())
                        .target(bookmark.target())
                .build();
    }

    public List<BookmarkDTO> getAllBookmarksForEditAsDTO() {
        List<Bookmark> bookmarks = bookmarkRepository.findAll();
        bookmarks.forEach(bookmark -> logger.info("Bookmark with id: {}", bookmark.id()));

        return bookmarks.stream()
                .map(this::convertToDTOWithId)
                .toList();
    }

    private BookmarkDTO convertToDTOWithId(Bookmark bookmark) {
        return BookmarkDTO.builder()
                        .id(new ObjectId(bookmark.id()).toHexString())
                        .url(bookmark.url())
                        .dropdownCategory(bookmark.dropdownCategory())
                        .name(bookmark.name())
                        .title(bookmark.title())
                        .target(bookmark.target())
                .build();
    }

    public Bookmark editBookmark(String bookmarkId, BookmarkDTO bookmarkDTO) {
            Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                    .orElseThrow(() -> new RuntimeException("Bookmark not found."));

            Bookmark updatedBookmark = bookmark.updateBookmark(
                    bookmarkDTO.url(),
                    bookmarkDTO.dropdownCategory(),
                    bookmarkDTO.name(),
                    bookmarkDTO.title(),
                    bookmarkDTO.target(),
                    bookmarkDTO.links()
            );
        return bookmarkRepository.save(updatedBookmark);
    }

    public void deleteBookmark(String bookmarkId) {
        bookmarkRepository.deleteById(bookmarkId);
    }
}