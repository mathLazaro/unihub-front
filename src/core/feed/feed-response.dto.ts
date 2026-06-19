export interface ViewFeedDto {
    id: string;
    content: string;
    author: { id: string, name: string }
    type: string;
    contactInfo?: string;
    location?: string;
    expiresAt?: string;
    createdAt: Date
}


export interface FeedResponse {
    data: ViewFeedDto[];
    next_offset: number;
    has_more: boolean;
    seed: string;
}