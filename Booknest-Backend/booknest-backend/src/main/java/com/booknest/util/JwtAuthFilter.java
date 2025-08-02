package com.booknest.util;

import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import org.springframework.web.filter.OncePerRequestFilter;

import com.booknest.security.JwtBlacklistService;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final UserDetailsService userDetailsService;
	private final JwtBlacklistService jwtBlacklistService; // Add this line

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    String authHeader = request.getHeader("Authorization");
	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        String jwt = authHeader.substring(7);

	        // ✅ Check if token is blacklisted
	        if (jwtBlacklistService.isBlacklisted(jwt)) {
	            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	            response.getWriter().write("Token is blacklisted. Please login again.");
	            return;
	        }

	        try {
	            String email = jwtUtil.validateToken(jwt);
	            Claims claims = jwtUtil.getClaims(jwt);
	            String role = claims.get("role", String.class);

	            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
	            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
	                    userDetails, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role)));
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	        } catch (Exception e) {
	            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	            return;
	        }
	    }

	    filterChain.doFilter(request, response);
	}

	

}
