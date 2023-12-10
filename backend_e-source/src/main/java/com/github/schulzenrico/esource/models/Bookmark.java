package com.github.schulzenrico.esource.models;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@With
@Builder
@Document(collection = "bookmarks")
public record Bookmark(

        @Id
        String id,
        @Field ("bookmark_url")
        String url,
        @Field ("bookmark_destination")
        String destination,
        @Field ("bookmark_dropdownCategory")
        String dropdownCategory,
        @Field ("bookmark_tags")
        List<String> tags,
        @Field ("bookmark_title")
        String title
) {
}
