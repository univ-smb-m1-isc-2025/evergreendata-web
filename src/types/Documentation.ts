import { User } from "@/types/User";

export interface Documentation {
    id: number;
    author: User;
    content: string;
    date: string;
}