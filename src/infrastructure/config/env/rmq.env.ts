import { registerEnv } from "@sorokchat-messenger/config";
import { RmqSchema } from "../schemas/index.js";

export function getRmqEnv(data: unknown) {
    return registerEnv("rmq", RmqSchema, data);
}