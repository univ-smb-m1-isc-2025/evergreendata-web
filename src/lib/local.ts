import { User } from "@/types/User";

export function getToken(): string | null {
    return localStorage.getItem('token');
  }
  
export function getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }