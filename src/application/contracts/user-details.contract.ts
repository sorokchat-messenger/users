import { type Role } from "@sorokchat-messenger/microservices";

export type UserDetails = {
    id: string;
    login: string;
    displayName: string;
    role: Role;
};