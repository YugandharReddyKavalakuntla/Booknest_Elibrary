package com.booknest.model;


import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @EqualsAndHashCode.Include
	    private Long id;

	    private String title;
	    private String author;
	    private String fileName;
	    private String coverImageFileName;
	    private Timestamp uploadedAt;
	    private String description;
	    
//	    multiple genres per book 
	    @ElementCollection(fetch = FetchType.EAGER)
	    @CollectionTable(name = "book_genres",
	                     joinColumns = @JoinColumn(name = "book_id"))
	    @Column(name = "genre")
	    private Set<String> genres = new HashSet<>();


}
