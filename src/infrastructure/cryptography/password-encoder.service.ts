import { Inject, Provider } from "@nestjs/common";
import { type IPasswordEncoder, PASSWORD_ENCODER_TOKEN } from "../../domain/index.js";
import { type PasswordEncoder as Encoder } from '@sorokchat-messenger/cryptography-abstractions';
import { ENCODER_TOKEN } from "./encoder.provider.js";

export class PasswordEncoder implements IPasswordEncoder {
    public constructor(@Inject(ENCODER_TOKEN) private readonly encoder: Encoder) { }

    public async encode(plaintext: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async verify(encoded: string, plaintext: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export const PASSWORD_ENCODER_PROVIDER: Provider = {
    provide: PASSWORD_ENCODER_TOKEN,
    useClass: PasswordEncoder
}