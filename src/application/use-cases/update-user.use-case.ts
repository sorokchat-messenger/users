import { Inject, Injectable } from "@nestjs/common";
import { type IUseCase } from "./use-case.interface.js";
import {
    USER_REPOSITORY_TOKEN,
    type IUserRepository,
    Id,
    UserNotFoundException,
    User,
    NotAdminException,
    UserExistsException
} from "../../domain/index.js";

export interface UpdateUserRequest {
    actorId: Id;
    userId: Id;
    login: string | null;
    displayName: string | null;
};

export type UpdateUserResponse = void;

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest, UpdateUserResponse> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository
    ) { }

    public async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
        if (!request.actorId.equal(request.userId)) {
            const actor = await this.repository.getById(request.actorId);
            if (actor === null) throw new UserNotFoundException();
            if (!actor.isAdmin) throw new NotAdminException();
        }
        const user = await this.repository.getById(request.userId);
        if (user === null) throw new UserNotFoundException();
        if (request.login) {
            const hasByLogin = await this.repository.existsByLogin(request.login);
            if (hasByLogin) throw new UserExistsException();
            user.changeLogin(request.login);
        }
        if (request.displayName) user.changeDisplayName(request.displayName);
        await this.repository.save(user);
    }
}