package com.github.schulzenrico.esource.controller;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.services.BookmarkService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookmarks")
@AllArgsConstructor
public class BookmarkController {
    private BookmarkService bookmarkService;

    @PostMapping("/add")
    public Bookmark addBookmark(@RequestBody BookmarkDTO bookmarkDTO) {
      return bookmarkService.addBookmark(bookmarkDTO);
    }

    @GetMapping("/getAll")
    public List<BookmarkDTO> getAllBookmarksAsDTO() {
        return bookmarkService.getAllBookmarksAsDTO();
    }

    private BookmarkDTO convertToDTO(Bookmark bookmark) {
        return BookmarkDTO.builder()
                        .bookmarkUrl(bookmark.getBookmarkUrl())
                        .bookmarkDropdownCategory(bookmark.getBookmarkDropdownCategory())
                        .bookmarkName(bookmark.getBookmarkName())
                        .bookmarkTitleAndTags(bookmark.getBookmarkTitleAndTags())
                .build();
    }
}

