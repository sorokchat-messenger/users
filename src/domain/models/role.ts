export const Role = {
    USER: "USER",
    PRO: "PRO",
    ADMIN: "ADMIN",
} as const;

export type Role = typeof Role[keyof typeof Role];