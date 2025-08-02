package com.booknest.model;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(unique = true)
	private String email;

	private String password;

	private String resetToken;

	private Instant resetTokenExpiry;

	@Enumerated(EnumType.STRING)
	private Role role;

}
