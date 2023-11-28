package com.github.schulzenrico.esource.models;

import lombok.Builder;
import lombok.Getter;

@Builder
public record BookmarkDTO(
        @Getter
        String bookmarkUrl,
        @Getter
        String bookmarkDropdownCategory,
        @Getter
        String bookmarkName,
        @Getter
        String bookmarkTitleAndTags
) {
}
