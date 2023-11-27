package com.github.schulzenrico.esource.controller;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.services.BookmarkService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@AllArgsConstructor
public class BookmarkController {
    private BookmarkService bookmarkService;

    @PostMapping("")
    public Bookmark addBookmark(@RequestBody BookmarkDTO bookmarkDTO) {
      return bookmarkService.addBookmark(bookmarkDTO);
    }

    @GetMapping("/category/{bookmarkDropdownCategory}")
    public List<BookmarkDTO> getAllBookmarksByBookmarkDropdownCategory(@PathVariable String bookmarkDropdownCategory) {
        return bookmarkService.getAllBookmarksByBookmarkDropdownCategory(bookmarkDropdownCategory);
    }
}

