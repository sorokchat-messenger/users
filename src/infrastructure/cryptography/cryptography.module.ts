import { Module } from "@nestjs/common";
import { SIGNING_PROVIDER } from "./signing.provider.js";
import { ENCODER_PROVIDER, } from "./encoder.provider.js";
import { PASSWORD_ENCODER_PROVIDER } from "./password-encoder.service.js";

@Module({
    providers: [SIGNING_PROVIDER, PASSWORD_ENCODER_PROVIDER, ENCODER_PROVIDER],
    exports: [PASSWORD_ENCODER_PROVIDER]
})
export class CryptographyModule { }