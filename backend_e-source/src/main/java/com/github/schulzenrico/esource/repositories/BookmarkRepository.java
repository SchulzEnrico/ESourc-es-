package com.github.schulzenrico.esource.repositories;

import com.github.schulzenrico.esource.models.Bookmark;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
}
