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
                .id(null)
                .bookmarkUrl(bookmarkDTO.bookmarkUrl())
                .bookmarkDropdownCategory(bookmarkDTO.bookmarkDropdownCategory())
                .bookmarkName(bookmarkDTO.bookmarkName())
                .bookmarkTitle(bookmarkDTO.bookmarkTitle())
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
                        .bookmarkUrl(bookmark.getBookmarkUrl())
                        .bookmarkDropdownCategory(bookmark.getBookmarkDropdownCategory())
                        .bookmarkName(bookmark.getBookmarkName())
                        .bookmarkTitle(bookmark.getBookmarkTitle())
                .build();
    }
}
