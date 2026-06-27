export interface CreatePostDto {
  content: string;
  type: string;
  contactInfo?: string;
  location?: string;
  expiresAt?: string;
}

export interface UpdatePostDto {
  content: string;
  contactInfo?: string;
  location?: string;
  expiresAt?: string;
}