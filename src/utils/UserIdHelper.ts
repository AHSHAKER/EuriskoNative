import {jwtDecode} from 'jwt-decode';

type DecodedToken = {
  user?: {
    _id: string;
    // other user fields if needed
  };
  exp?: number;
  iat?: number;
  // any other JWT fields
};

export function getUserIdFromToken(token: string | null): string | null {
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      console.log('Decoded token:', decoded);
      return decoded.userId ?? null;
    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  }
  
