import { api } from "./clients";

export async function getSubscriptions(): Promise<string[]> {
    const response = await api.get('/user/subscriptions');
    return response.data;
}

export async function updateSubscriptions(types: string[]): Promise<string[]> {
    const response = await api.put('/user/subscriptions', { types });
    return response.data;
}

export async function getUserProfile(): Promise<any> {
    const response = await api.get('/user/find');
    return response.data;
}

export async function getPublicProfile(id: string): Promise<any> {
    const response = await api.get(`/user/public/${id}`);
    return response.data;
}

export async function updateUserProfile(data: any): Promise<any> {
    const response = await api.put('/user', data);
    return response.data;
}

export async function updatePassword(data: any): Promise<void> {
    await api.put('/user/password', data);
}
