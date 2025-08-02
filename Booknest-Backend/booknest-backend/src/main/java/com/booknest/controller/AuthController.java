package com.booknest.controller;

import com.booknest.dto.ChangePasswordRequest;
import com.booknest.dto.ForgotPasswordRequest;
import com.booknest.dto.LoginRequest;
import com.booknest.dto.ResetPasswordRequest;
import com.booknest.model.User;
import com.booknest.security.JwtBlacklistService;
import com.booknest.service.AuthService;
import com.booknest.util.JwtUtil;

import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.security.Principal;
import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final JwtBlacklistService jwtBlacklistService;
	private final JwtUtil jwtUtil;

	// --- Registration (unchanged) ---
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody @Valid User user) {
		String msg = authService.register(user);
		return ResponseEntity.ok(msg);
	}

	// --- Login using DTO body ---
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody @Valid LoginRequest req) {
		String token = authService.login(req.getEmail(), req.getPassword());
		return ResponseEntity.ok(token);
	}

	// --- Forgot Password (using DTO for email field) ---
	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody @Valid ForgotPasswordRequest req) {
		return ResponseEntity.ok(authService.forgotPassword(req.getEmail()));
	}

	// --- Reset Password using DTO body ---
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordRequest req) {
		return ResponseEntity.ok(authService.resetPassword(req.getToken(), req.getNewPassword()));
	}
	
    // change password	
	@PutMapping("/change-password")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<String> changePassword(@RequestBody @Valid ChangePasswordRequest req, Principal principal) {
	    return ResponseEntity.ok(authService.changePassword(principal.getName(), req.getOldPassword(), req.getNewPassword()));
	}

	// --- Logout remains header‑based ---
	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7);
			try {
				// Parse expiration time from token
				Claims claims = jwtUtil.getClaims(token);
				Instant expiryInstant = claims.getExpiration().toInstant();

				// Compute TTL as Duration between now and expiration
				Duration ttl = Duration.between(Instant.now(), expiryInstant);

				// Blacklist using Duration (matches service signature)
				jwtBlacklistService.blacklist(token, ttl);

				return ResponseEntity.ok("Logged out successfully.");
			} catch (Exception e) {
				return ResponseEntity.badRequest().body("Invalid token.");
			}
		}
		return ResponseEntity.badRequest().body("Missing token.");
	}
}
