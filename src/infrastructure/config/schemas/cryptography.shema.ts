import z from "zod";

export const CryptographySchema = z.object({
    CRYPTOGRAPHY_PEPPER: z.string()
}).transform(({ CRYPTOGRAPHY_PEPPER }) => ({ pepper: CRYPTOGRAPHY_PEPPER }));

export type CryptograhyConfig = z.infer<typeof CryptographySchema>;