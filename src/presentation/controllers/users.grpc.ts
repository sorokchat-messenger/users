import { GrpcMethod, GrpcService, Payload } from '@nestjs/microservices';
import {
    type CreateUserRequest,
    type CreateUserResponse,
    type GetUserByIdRequest,
    type GetUserResponse,
    type GetUsersByTermRequest,
    USERS_SERVICE,
    type GetUsersByTermResponse,
    type UpdateUserRequest,
    type DeleteUserRequest,
    type CheckCredentialsRequest,
    type CheckCredentialsResponse
} from '@sorokchat-messenger/microservices';
import { UserNotFoundException } from '../../domain/index.js';
import { CqrsBus } from '../../infrastructure/index.js';
import {
    CheckCredentialsQuery,
    CreateUserCommand,
    DeleteUserCommand,
    GetUserByIdQuery,
    GetUserByTermQuery,
    UpdateUserCommand,
    UserDetails
} from '../../application/index.js';

@GrpcService(USERS_SERVICE.NAME)
export class UsersGrpc {
    public constructor(
        private readonly bus: CqrsBus
    ) { }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.CREATE)
    public async create(@Payload() payload: CreateUserRequest): Promise<CreateUserResponse> {
        const user = await this.bus.execute<UserDetails>(new CreateUserCommand(
            payload.login,
            payload.password,
            payload.displayName || null
        ));
        return { user };
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.GET_BY_ID)
    public async getById(@Payload() payload: GetUserByIdRequest): Promise<GetUserResponse> {
        const user = await this.bus.fetch<UserDetails | null>(new GetUserByIdQuery(payload.id));
        if (user === null) throw new UserNotFoundException();
        return user;
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.CHECK_CREDENTIALS)
    public async checkCredentials(@Payload() payload: CheckCredentialsRequest): Promise<CheckCredentialsResponse> {
        const user = await this.bus.fetch<UserDetails>(new CheckCredentialsQuery(payload.login, payload.password));
        return { user: user }
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.GET_BY_TERM)
    public async getByTerm(@Payload() payload: GetUsersByTermRequest): Promise<GetUsersByTermResponse> {
        const users = await this.bus.fetch<UserDetails[]>(new GetUserByTermQuery(
            payload.term,
            payload.limit,
            payload.offset
        ));
        return { users };
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.UPDATE)
    public async update(@Payload() payload: UpdateUserRequest): Promise<void> {
        return await this.bus.execute<void>(new UpdateUserCommand(
            payload.actorId,
            payload.userId,
            payload.login || null,
            payload.displayName || null
        ));
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.DELETE)
    public async delete(@Payload() payload: DeleteUserRequest): Promise<void> {
        return await this.bus.execute<void>(new DeleteUserCommand(payload.actorId, payload.userId));
    }
}