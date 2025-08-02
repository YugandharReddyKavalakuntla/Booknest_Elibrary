package com.booknest.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.booknest.util.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /** 
     * Global CORS configuration allowing your Vite frontend at http://localhost:5173 
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow your frontend origin
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        // Allow these HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Allow all headers (including Authorization)
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this CORS config to all API paths
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable the CORS config defined above
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Disable CSRF for simplicity (you may re-enable and configure later)
            .csrf(csrf -> csrf.disable())
            // Stateless session (no HTTP session)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Define public and protected endpoints
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/auth/**").permitAll()
//                .requestMatchers(HttpMethod.POST, "/api/books/upload").hasRole("ADMIN")
//                .requestMatchers(HttpMethod.PUT, "/api/books/**").hasRole("ADMIN")
//                .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasRole("ADMIN")
//                .anyRequest().authenticated()
//            )
            
            .authorizeHttpRequests(auth -> auth
            	    .requestMatchers("/api/auth/**").permitAll()
            	    .requestMatchers(HttpMethod.GET, "/api/books/*/cover").permitAll()
            	    .requestMatchers(HttpMethod.GET, "/api/books/*/pdf").permitAll()
            	    .requestMatchers(HttpMethod.GET, "/api/books").permitAll()
            	    .requestMatchers(HttpMethod.GET, "/api/books/*").permitAll()
            	    .requestMatchers(HttpMethod.POST, "/api/books/upload").hasRole("ADMIN")
            	    .requestMatchers(HttpMethod.PUT, "/api/books/**").hasRole("ADMIN")
            	    .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasRole("ADMIN")
            	    .anyRequest().authenticated()
            	)
            // Add your JWT filter before the username/password filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
