import { type UserDetails } from "./user-details.contract.js";

export type UserDetailsWithPassword = UserDetails & {
    password: string;
}