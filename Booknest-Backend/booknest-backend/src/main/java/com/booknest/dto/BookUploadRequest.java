package com.booknest.dto;


import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookUploadRequest {

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Author must not be blank")
    private String author;

    @Size(max = 1000, message = "Description must be under 1000 characters")
    private String description;
    
    @NotEmpty
    private Set<@NotBlank String> genres;

}

