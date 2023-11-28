package com.github.schulzenrico.esource.models;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@Document(collection = "bookmarks")
public record Bookmark(

        @Id
        String id,
        @Field ("bookmark_url")
        String url,
        @Field ("bookmark_dropdownCategory")
        String dropdownCategory,
        @Field ("bookmark_name")
        String name,
        @Field ("bookmark_title")
        String title
) {
}
