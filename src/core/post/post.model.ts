export interface Post {
    id?: string;
    content: string;
    authorId?: string;
    type: string;
    contactInfo?: string;
    location?: string;
    expiresAt?: string;
}