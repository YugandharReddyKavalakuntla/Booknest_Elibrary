package com.booknest.service;

import com.booknest.model.Role;
import com.booknest.model.User;
import com.booknest.repository.UserRepository;
import com.booknest.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepo;
	private final JwtUtil jwtUtil;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final EmailService emailService;

	public String register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(Role.USER); // default role is USER
		userRepo.save(user);
		return "User registered successfully!";
	}

	public String login(String email, String rawPassword) {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
			throw new RuntimeException("Invalid credentials");
		}

//        return jwtUtil.generateToken(email);
		return jwtUtil.generateToken(email, user.getRole().name());

	}

	public String forgotPassword(String email) {
		Optional<User> userOpt = userRepo.findByEmail(email);
		if (userOpt.isEmpty())
			return "If the email exists, a reset link has been sent.";

		User user = userOpt.get();
		String token = UUID.randomUUID().toString();
		user.setResetToken(token);
		user.setResetTokenExpiry(Instant.now().plus(Duration.ofMinutes(15)));
		userRepo.save(user);

		// ✅ Send actual email
		emailService.sendResetEmail(user.getEmail(), token);

		return "If the email exists, a reset link has been sent.";
	}

	public String resetPassword(String token, String newPassword) {
		User user = userRepo.findByResetToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid or expired token"));

		if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(Instant.now())) {
			throw new RuntimeException("Token expired.");
		}

		user.setPassword(passwordEncoder.encode(newPassword));
		user.setResetToken(null);
		user.setResetTokenExpiry(null);
		userRepo.save(user);

		return "Password has been successfully reset.";
	}
	
	
	public String changePassword(String email, String oldPwd, String newPwd) {
	    User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
	    if (!passwordEncoder.matches(oldPwd, user.getPassword()))
	        throw new RuntimeException("Incorrect current password");
	    user.setPassword(passwordEncoder.encode(newPwd));
	    userRepo.save(user);
	    return "Password changed successfully.";
	}


}
