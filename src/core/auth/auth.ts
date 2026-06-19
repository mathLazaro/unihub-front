export interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export interface AuthUser {
  id: string;
  email: string;
}
