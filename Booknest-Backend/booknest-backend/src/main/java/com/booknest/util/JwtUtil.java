package com.booknest.util;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private final long expirationMs = 86400000; // 1 day

	public String generateToken(String email, String role) {
		return Jwts.builder().setSubject(email).claim("role", role).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expirationMs)).signWith(key).compact();
	}

	public String validateToken(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
	}
	
	public Claims getAllClaimsFromToken(String token) {
	    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}
	
	
	public Claims getClaims(String token) {
	    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}


}
