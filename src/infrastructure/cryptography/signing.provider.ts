import { type Provider } from "@nestjs/common";
import { HmacSigning } from "@sorokchat-messenger/cryptography-node";

export const SIGNING_TOKEN: string = "SIGNING_TOKEN";

export const SIGNING_PROVIDER: Provider = {
    provide: SIGNING_TOKEN,
    useClass: HmacSigning
};