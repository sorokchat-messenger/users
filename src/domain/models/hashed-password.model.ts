import { PasswordNullException, PasswordEmptyException, PasswordSizeException } from "../exceptions/index.js";
import { type IPasswordEncoder } from "../services/index.js";

export class HashedPassword {
    private _value: string;

    public get value(): string {
        return this._value;
    }

    private constructor(value: string) {
        this._value = value;
    }

    public static async create(encoder: IPasswordEncoder, password?: string | null): Promise<HashedPassword> {
        if (!password) throw new PasswordNullException();
        const plaintext = password.trim();
        if (!plaintext.length) throw new PasswordEmptyException();
        if (plaintext.length < 8 || plaintext.length > 100) throw new PasswordSizeException();
        return new HashedPassword(await encoder.encode(plaintext));
    }

    public static restore(value: string): HashedPassword {
        return new HashedPassword(value);
    }

    public equal(other?: HashedPassword | null): boolean {
        if (!other) return false;
        return other.value === this.value;
    }

    public clone(): HashedPassword {
        return new HashedPassword(this.value)
    }

    public async verify(encoder: IPasswordEncoder, password: string): Promise<boolean> {
        return await encoder.verify(this._value, password);
    }

    public async change(encoder: IPasswordEncoder, password: string): Promise<HashedPassword> {
        this._value = await encoder.encode(password);
        return this;
    }
}