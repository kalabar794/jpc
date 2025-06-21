import { useState, useEffect } from 'react';

export function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCSRFToken() {
      try {
        const response = await fetch('/api/csrf');
        const data = await response.json();
        setCSRFToken(data.token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCSRFToken();
  }, []);

  return { csrfToken, loading };
}