import z from "zod";

export const DatabaseSchema = z.object({
    DATABASE_CONNECTION_STRING: z.url()
}).transform(({ DATABASE_CONNECTION_STRING }) => ({ connectionString: DATABASE_CONNECTION_STRING }));

export type DatabaseConfig = z.infer<typeof DatabaseSchema>;