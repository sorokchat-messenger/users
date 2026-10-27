import { uuidv7 } from "uuidv7";
import { NotIdException } from "../exceptions/index.js";

export class Id {
    private static readonly PATTERN: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    public static create(): Id {
        return new Id(uuidv7());
    }

    public static restore(value?: string | null): Id {
        if (!value || !Id.PATTERN.test(value)) throw new NotIdException();
        return new Id(value);
    }

    public get value(): string {
        return this._value;
    }

    public equal(other?: Id | null): boolean {
        if (!other) return false;
        return other.value === this._value;
    }

    public clone(): Id {
        return new Id(this._value);
    }
}