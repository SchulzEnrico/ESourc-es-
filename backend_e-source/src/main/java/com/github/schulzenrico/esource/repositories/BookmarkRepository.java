package com.github.schulzenrico.esource.repositories;

import com.github.schulzenrico.esource.models.Bookmark;
import com.github.schulzenrico.esource.models.BookmarkDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
    List<BookmarkDTO> findBookmarksByBookmarkDropdownCategory(String bookmarkDropdownCategory);
}
