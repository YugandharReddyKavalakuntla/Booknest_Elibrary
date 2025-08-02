package com.booknest.security;


import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JwtBlacklistService {

 // token -> expiry time
 private final Map<String, Instant> blacklist = new ConcurrentHashMap<>();

 public void blacklist(String token, Duration ttl) {
     blacklist.put(token, Instant.now().plus(ttl));
 }

 public boolean isBlacklisted(String token) {
     Instant expiry = blacklist.get(token);
     if (expiry == null) return false;

     // Remove expired tokens
     if (expiry.isBefore(Instant.now())) {
         blacklist.remove(token);
         return false;
     }
     return true;
 }
}

