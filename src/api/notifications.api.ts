import { api } from "./clients";
import type { Notification } from "../core/notification/notification.model";

export async function getNotifications(): Promise<Notification[]> {
    const response = await api.get('/find-all');
    return response.data;
}

export async function hasUnviewedNotifications(): Promise<boolean> {
    const response = await api.get('/has-unviewed');
    return response.data;
}

export async function markAsViewed(id: string): Promise<void> {
    await api.patch(`/${id}/viewed`);
}

export async function markAllAsViewed(): Promise<void> {
    await api.patch('/viewed-all');
}
