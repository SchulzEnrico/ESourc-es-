package com.github.schulzenrico.esource.services;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ServiceResponse<T> {

    private boolean success;
    private String message;
    private T data;
}
