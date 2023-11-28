package com.github.schulzenrico.esource.models;

import lombok.Builder;

@Builder
public record BookmarkDTO(
        String bookmarkUrl,
        String bookmarkDropdownCategory,
        String bookmarkName,
        String bookmarkTitle
) {
}

