package com.github.schulzenrico.esource.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.List;

@Builder
public record BookmarkDTO(
        @JsonProperty("_id") String id,
        String url,
        String dropdownCategory,
        String name,
        String title,
        String target,
        List<Link> links
) {
}
