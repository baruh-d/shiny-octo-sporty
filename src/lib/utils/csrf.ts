/**
 * Gets the CSRF token from the cookie set by middleware
 *  * @param cookie - Optional cookie string (for SSR)
 * @returns The CSRF token or null if not found
 */
export const getCSRFTokenFromCookie = (cookie?: string): string | null => {
  const cookieString = cookie ?? (typeof document !== 'undefined' ? document.cookie : '');
  
  try {
      const cookies = cookieString.split('; ');
      for (const cookie of cookies) {
          if (cookie.trim().startsWith('x-csrf-token=')) {
              const decoded = decodeURIComponent(cookie.split('=').slice(1).join('='));
              return decoded.trim() || null;
          }
      }
      return null;
  } catch (error) {
      console.error('Error parsing CSRF cookie:', error);
      return null;
  }
};

/**
* Validates a CSRF token structure (basic format check)
*/
const isValidCSRFTokenFormat = (token: string): boolean => {
  // Basic validation - adjust according to your token format
  return typeof token === 'string' && 
         token.length >= 32 && 
         token.length <= 128 &&
         /^[a-zA-Z0-9\-_]+$/.test(token);
};

/**
* Verifies if a CSRF token is valid
* @param token - The token to verify
* @returns Whether the token is valid and matches the cookie
*/
export const isValidCSRFToken = (token: string | null): boolean => {
  if (!token || !isValidCSRFTokenFormat(token)) return false;
  
  const cookieToken = getCSRFTokenFromCookie();
  return !!cookieToken && 
         isValidCSRFTokenFormat(cookieToken) &&
         cookieToken === token;
};

/**
* Attaches the CSRF token to headers for API requests
* @param headers - The headers object to add the CSRF token to
* @returns The headers object with CSRF token added
*/
export const attachCSRFToken = (headers: HeadersInit = {}): HeadersInit => {
  const csrfToken = getCSRFTokenFromCookie();
  
  if (csrfToken && isValidCSRFTokenFormat(csrfToken)) {
      return {
          ...headers,
          'X-CSRF-Token': csrfToken,
          // Consider adding these for additional security:
          'X-Requested-With': 'XMLHttpRequest',
          'SameSite': 'Strict'
      };
  }
  
  return headers;
};

/**
* Generates headers with CSRF token for fetch requests
*/
export const getSecureHeaders = (additionalHeaders: HeadersInit = {}): HeadersInit => {
  return attachCSRFToken({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...additionalHeaders
  });
};