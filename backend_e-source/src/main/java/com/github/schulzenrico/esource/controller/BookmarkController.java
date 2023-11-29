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

    @PostMapping("/add")
    public Bookmark addBookmark(@RequestBody BookmarkDTO bookmarkDTO) {
      return bookmarkService.addBookmark(bookmarkDTO);
    }

    @GetMapping("/getAll")
    public List<BookmarkDTO> getAllBookmarksAsDTO() {
        return bookmarkService.getAllBookmarksAsDTO();
    }
}

