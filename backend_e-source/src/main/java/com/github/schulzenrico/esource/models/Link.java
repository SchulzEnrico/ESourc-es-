package com.github.schulzenrico.esource.models;

import lombok.Builder;

@Builder
public record Link(
        String id,
        String name,
        String url,
        String title,
        String target
) {
}
