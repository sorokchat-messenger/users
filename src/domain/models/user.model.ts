import { ROLE_HIERARCHY } from "@sorokchat-messenger/contracts";
import { type IPasswordEncoder } from "../services/index.js";
import { HashedPassword } from "./hashed-password.model.js";
import { Id } from "./id.model.js";
import { Role } from "./role.js";

export class User {
    private readonly _id: Id;
    private _login: string;
    private _hashedPassword: HashedPassword;
    private _displayName: string;
    private _role: Role;

    public get id(): Id {
        return this._id.clone();
    }

    public get login(): string {
        return this._login;
    }

    public get hashedPassword(): HashedPassword {
        return this._hashedPassword.clone();
    }

    public get role(): Role {
        return this._role;
    }

    public get isUser(): boolean {
        return ROLE_HIERARCHY.hasRole(Role.USER, this.role);
    }

    public get isPro(): boolean {
        return ROLE_HIERARCHY.hasRole(Role.PRO, this.role);
    }

    public get isAdmin(): boolean {
        return ROLE_HIERARCHY.hasRole(Role.ADMIN, this.role);
    }

    public get displayName(): string {
        return this._displayName;
    }

    public changeLogin(login: string): User {
        this._login = login;
        return this;
    }

    public async changePassword(encoder: IPasswordEncoder, password: string): Promise<User> {
        this._hashedPassword = await this._hashedPassword.change(encoder, password);
        return this;
    }

    public async verifyPassword(encoder: IPasswordEncoder, password: string): Promise<boolean> {
        return await this.hashedPassword.verify(encoder, password);
    }

    public changeDisplayName(displayName: string): User {
        this._displayName = displayName;
        return this;
    }

    public changeRole(role: Role): User {
        this._role = role;
        return this;
    }

    private constructor(id: Id, login: string, hashedPassword: HashedPassword, displayName: string, role: Role) {
        this._id = id;
        this._login = login;
        this._hashedPassword = hashedPassword;
        this._displayName = displayName;
        this._role = role;
    }

    public static create(login: string, hashedPassword: HashedPassword, displayName: string | null) {
        return new User(Id.create(), login, hashedPassword.clone(), displayName ?? login, Role.USER);
    }

    public static restore(id: Id, login: string, hashedPassword: HashedPassword, displayName: string, role: Role): User {
        return new User(id, login, hashedPassword, displayName, role);
    }

    public equal(other?: User | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public clone(): User {
        return new User(this.id, this.login, this.hashedPassword, this.displayName, this.role);
    }
}