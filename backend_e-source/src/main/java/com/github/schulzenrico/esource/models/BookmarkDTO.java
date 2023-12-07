package com.github.schulzenrico.esource.models;

import lombok.Builder;

@Builder
public record BookmarkDTO(
        String id,
        String url,
        String destination,
        String dropdownCategory,
        String name,
        String title
) {
}

