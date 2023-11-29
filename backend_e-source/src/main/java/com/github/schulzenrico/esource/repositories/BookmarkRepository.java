package com.github.schulzenrico.esource.repositories;

import com.github.schulzenrico.esource.models.Bookmark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
}
