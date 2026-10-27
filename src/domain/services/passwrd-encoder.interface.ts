export interface IPasswordEncoder {
    encode(plaintext: string): Promise<string>;
    verify(encoded: string, plaintext: string): Promise<boolean>;
}

export const PASSWORD_ENCODER_TOKEN: string = "PASSWORD_ENCODER";