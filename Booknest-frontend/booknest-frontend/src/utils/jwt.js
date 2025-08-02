// src/utils/jwt.js
export function getJwtPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Failed to decode JWT payload:', e);
    return {};
  }
}

export function getJwtClaim(token, claim) {
  const payload = getJwtPayload(token);
  return payload[claim];
}
