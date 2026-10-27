import { type Provider } from "@nestjs/common";
import { type PasswordEncoder, type ISigning } from "@sorokchat-messenger/cryptography-abstractions";
import { Argon2PasswordEncoder } from "@sorokchat-messenger/cryptography-node";
import { ConfigService } from '@nestjs/config';
import { type AllConfigs } from "../config/index.js";
import { SIGNING_TOKEN } from "./signing.provider.js";

export const ENCODER_TOKEN: string = "ENCODER_TOKEN";

export const ENCODER_PROVIDER: Provider = {
    provide: ENCODER_TOKEN,
    inject: [ConfigService, SIGNING_TOKEN],
    useFactory(config: ConfigService<AllConfigs>, signing: ISigning): PasswordEncoder {
        return new Argon2PasswordEncoder(
            config.getOrThrow("cryptography.pepper", { infer: true }),
            signing
        )
    },
}