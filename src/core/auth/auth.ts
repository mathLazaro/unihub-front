export interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}
