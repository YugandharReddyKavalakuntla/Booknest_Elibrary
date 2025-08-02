// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../api.js';

export default function useAuth() {
  const nav = useNavigate();
  useEffect(() => {
    if (!isTokenValid()) nav('/login', { replace: true });
  }, [nav]);
}
