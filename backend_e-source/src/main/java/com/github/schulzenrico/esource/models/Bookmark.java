package com.github.schulzenrico.esource.models;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@Document(collection = "bookmarks")
public record Bookmark(

        @Id
        String id,
        @Getter
        @Field ("bookmark_url")
        String bookmarkUrl,
        @Getter
        @Field ("bookmark_dropdownCategory")
        String bookmarkDropdownCategory,
        @Getter
        @Field ("bookmark_name")
        String bookmarkName,
        @Getter
        @Field ("bookmark_titleAndTags")
        String bookmarkTitleAndTags
) {
}
