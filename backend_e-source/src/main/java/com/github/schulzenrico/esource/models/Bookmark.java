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
        String bookmarkUrl,
        @Field ("bookmark_dropdownCategory")
        String bookmarkDropdownCategory,
        @Field ("bookmark_name")
        String bookmarkName,
        @Field ("bookmark_titleAndTags")
        String bookmarkTitleAndTags

) {
}
