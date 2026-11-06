import { HostSchema, PortSchema } from "@sorokchat-messenger/config";
import z from "zod";

export const RmqSchema = z.object({
    RMQ_PROTOCOL: z.string().default("amqp"),
    RMQ_HOST: HostSchema,
    RMQ_PORT: PortSchema,
    RMQ_USER: z.string(),
    RMQ_PASSWORD: z.string()
}).transform(({
    RMQ_HOST,
    RMQ_PASSWORD,
    RMQ_PORT,
    RMQ_PROTOCOL,
    RMQ_USER
}) => {
    const encodedUser = encodeURIComponent(RMQ_USER);
    const encodedPassword = encodeURIComponent(RMQ_PASSWORD);
    return {
        url: `${RMQ_PROTOCOL}://${encodedUser}:${encodedPassword}@${RMQ_HOST}:${RMQ_PORT}/`
    }
});

export type RmqConfig = z.infer<typeof RmqSchema>;