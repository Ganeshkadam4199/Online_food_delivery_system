package com.prog.jwt;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;

import com.prog.config.CustomUserDetails;

import io.jsonwebtoken.Claims;

public interface JwtProvider {

	public String generateToken(CustomUserDetails userDetails);

	public Authentication getAuthentication(HttpServletRequest request);

	boolean isTokenValid(HttpServletRequest request);

	public Claims extractClaims(HttpServletRequest request);

}
