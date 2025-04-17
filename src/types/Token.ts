import { User } from "@/types/User";

export interface Token {
    user: User;
    token: string;
}