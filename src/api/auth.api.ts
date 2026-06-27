import { api } from "./clients";
import type { LoginDto } from "../core/auth/auth";
import type { UserCreateDto, UserResponseDto } from "../core/user/user";

export const login = async (credentials: LoginDto): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>('/auth/login', credentials);
    return response.data;
};

export async function register(data: UserCreateDto): Promise<UserResponseDto> {
    const response = await api.post<UserResponseDto>('/user/create', data);
    return response.data;
}
