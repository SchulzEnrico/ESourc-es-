package com.github.schulzenrico.esource.models;

import lombok.Builder;

@Builder
public record BookmarkDTO(
        String url,
        String dropdownCategory,
        String name,
        String title
) {
}

