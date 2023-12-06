package com.github.schulzenrico.esource.controller;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import com.github.schulzenrico.esource.services.BookmarkService;
import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@AllArgsConstructor
public class BookmarkController {

    private static final Logger logger = LoggerFactory.getLogger(BookmarkController.class);

    private final BookmarkService bookmarkService;

    @PostMapping("/add")
    public Bookmark addBookmark(@RequestBody BookmarkDTO bookmarkDTO) {
        logger.info("Received bookmark DTO: {}", bookmarkDTO);
        return bookmarkService.addBookmark(bookmarkDTO);
    }

    @GetMapping("/getAll")
    public List<BookmarkDTO> getAllBookmarks() {
        return bookmarkService.getAllBookmarksAsDTO();
    }

    @GetMapping("/getAllBookmarksForEdit")
    public ResponseEntity<List<BookmarkDTO>> getAllBookmarksForEdit() {
        try {
            List<BookmarkDTO> bookmarks = bookmarkService.getAllBookmarksForEditAsDTO();
            bookmarks.forEach(bookmarkDTO -> logger.info("BookmarkDTO with _id: {}", bookmarkDTO.id()));  // Hier 'get_id()' statt 'id()'
            return ResponseEntity.ok(bookmarks);
        } catch (Exception e) {
            logger.error("Error retrieving all bookmarks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Bookmark> editBookmark(@PathVariable String id, @RequestBody BookmarkDTO bookmarkDTO) {
        try {
            Bookmark bookmark = bookmarkService.editBookmark(id, bookmarkDTO);
            return ResponseEntity.ok(bookmark);
        } catch (Exception e) {
            logger.error("Error editing the bookmark", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookmark(@PathVariable String id) {
        try {
            bookmarkService.deleteBookmark(id);
            return ResponseEntity.ok("Bookmark deleted successfully");
        } catch (Exception e) {
            logger.error("Error deleting the bookmark", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bookmark");
        }
    }
}
