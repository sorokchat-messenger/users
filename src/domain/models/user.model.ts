import { ROLE_HIERARCHY } from "@sorokchat-messenger/contracts";
import { type IPasswordEncoder } from "../services/index.js";
import { HashedPassword } from "./hashed-password.model.js";
import { Id } from "./id.model.js";
import { Role } from "./role.js";
import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent, UserDeletedEvent, UserUpdatedEvent } from "@sorokchat-messenger/shared-events";

export class User extends AggregateRoot {
    private readonly _id: Id;
    private _login: string;
    private _hashedPassword: HashedPassword;
    private _displayName: string;
    private _role: Role;
    private _changed: boolean = false;
    private _deleted: boolean = false;
    private _created: boolean;

    private constructor(id: Id, login: string, hashedPassword: HashedPassword, displayName: string, role: Role, created: boolean) {
        super();
        this._id = id;
        this._login = login;
        this._hashedPassword = hashedPassword;
        this._displayName = displayName;
        this._role = role;
        this._created = created;
    }

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

    public get isChanged(): boolean {
        return this._changed;
    }

    public get isDeleted(): boolean {
        return this._deleted;
    }

    public get isCreated(): boolean {
        return this._created;
    }

    public changeLogin(login: string): User {
        if (this._login === login) return this;
        this._login = login;
        if (!this._changed) {
            this.apply(new UserUpdatedEvent(this.id.value));
            this._changed = true;
        }
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
        if (this._displayName === displayName) return this;
        this._displayName = displayName;
        if (!this._changed) {
            this.apply(new UserUpdatedEvent(this.id.value));
            this._changed = true;
        }
        return this;
    }

    public changeRole(role: Role): User {
        if (this._role === role) return this;
        this._role = role;
        if (!this._changed) {
            this.apply(new UserUpdatedEvent(this.id.value));
            this._changed = true;
        }
        return this;
    }

    public delete(): User {
        if (this._deleted) return this;
        this._deleted = true;
        this.uncommit();
        this.apply(new UserDeletedEvent(this.id.value));
        return this;
    }

    public static create(login: string, hashedPassword: HashedPassword, displayName: string | null): User {
        const user = new User(Id.create(), login, hashedPassword.clone(), displayName ?? login, Role.USER, true);
        user.apply(new UserCreatedEvent(user.id.value));
        return user;
    }

    public static restore(id: Id, login: string, hashedPassword: HashedPassword, displayName: string, role: Role): User {
        return new User(id, login, hashedPassword, displayName, role, false);
    }

    public equal(other?: User | null): boolean {
        if (!other) return false;
        return other.id.equal(this.id);
    }

    public clone(): User {
        return new User(this.id, this.login, this.hashedPassword, this.displayName, this.role, false);
    }
}