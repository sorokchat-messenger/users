import { Id } from "./id.model.js";

export class User {
    private readonly _id: Id;
    private _login: string;
    private _displayName: string;

    public get id(): Id {
        return this._id;
    }

    public get login(): string {
        return this._login;
    }

    public get displayName(): string {
        return this._displayName;
    }

    public changeLogin(login: string): User {
        this._login = login;
        return this;
    }

    public changeDisplayName(displayName: string): User {
        this._displayName = displayName;
        return this;
    }

    private constructor(id: Id, login: string, displayName: string) {
        this._id = id;
        this._login = login;
        this._displayName = displayName;
    }

    public equal(other?: User | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public clone(): User {
        return new User(this.id.clone(), this.login, this.displayName);
    }
}