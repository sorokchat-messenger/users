import { getGrpcEnv } from "@sorokchat-messenger/config";
import { getCryptographyEnv } from "./cryptographt.env.js";
import { getDatabaseEnv } from "./database.env.js";
import { getRmqEnv } from "./rmq.env.js";

export function loadEnv() {
    return [
        getDatabaseEnv(process.env),
        getCryptographyEnv(process.env),
        getGrpcEnv(process.env),
        getRmqEnv(process.env)
    ];
}