import { getDatabaseEnv } from "./database.env.js";

export function loadEnv() {
    return [getDatabaseEnv(process.env)];
}