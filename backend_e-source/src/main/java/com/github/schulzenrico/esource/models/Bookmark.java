package com.github.schulzenrico.esource.models;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Builder
@Document(collection = "bookmarks")
public record Bookmark(

        @Id
        String id,
        @Field("bookmark_url")
        String url,
        @Field("bookmark_dropdownCategory")
        String dropdownCategory,
        @Field("bookmark_name")
        String name,
        @Field("bookmark_title")
        String title,
        @Field("bookmark_target")
        String target,
        @Field("bookmark_links")
        List<Link> links
) {
        // Erstellen einer neuen Instanz mit aktualisierten Werten
        public Bookmark updateBookmark(String url, String dropdownCategory, String name, String title, String target, List<Link> links) {
                return new Bookmark(this.id(), url, dropdownCategory, name, title, target, links);
        }
}