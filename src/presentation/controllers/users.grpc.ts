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
import {
    CheckCredentialsUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    GetUsersByTermUseCase,
    UpdateUserUseCase
} from '../../application/index.js';
import { Id, UserNotFoundException } from '../../domain/index.js';
import { IdMapper, UserMapper } from '../mappers/index.js';

@GrpcService(USERS_SERVICE.NAME)
export class UsersGrpc {
    public constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly checkCredentialUseCase: CheckCredentialsUseCase,
        private readonly getUsersByTermUseCase: GetUsersByTermUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly mapper: UserMapper,
        private readonly idMapper: IdMapper
    ) { }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.CREATE)
    public async create(@Payload() payload: CreateUserRequest): Promise<CreateUserResponse> {
        const { id } = await this.createUserUseCase.execute({
            login: payload.login,
            password: payload.password,
            displayName: payload.displayName || null
        });
        return { id: this.idMapper.toPresentation(id) };
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.GET_BY_ID)
    public async getById(@Payload() payload: GetUserByIdRequest): Promise<GetUserResponse> {
        const user = await this.getUserByIdUseCase.execute({ id: payload.id });
        if (user === null) throw new UserNotFoundException();
        return this.mapper.toPresentation(user);
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.CHECK_CREDENTIALS)
    public async checkCredentials(@Payload() payload: CheckCredentialsRequest): Promise<CheckCredentialsResponse> {
        return await this.checkCredentialUseCase.execute(payload);
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.GET_BY_TERM)
    public async getByTerm(@Payload() payload: GetUsersByTermRequest): Promise<GetUsersByTermResponse> {
        const users = await this.getUsersByTermUseCase.execute({
            term: payload.term,
            limit: payload.limit,
            offset: payload.offset
        });
        return { users: users.map(user => this.mapper.toPresentation(user)) };
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.UPDATE)
    public async update(@Payload() payload: UpdateUserRequest): Promise<void> {
        return await this.updateUserUseCase.execute({
            actorId: Id.restore(payload.actorId),
            userId: Id.restore(payload.userId),
            login: payload.login || null,
            displayName: payload.displayName || null
        });
    }

    @GrpcMethod(USERS_SERVICE.NAME, USERS_SERVICE.DELETE)
    public async delete(@Payload() payload: DeleteUserRequest): Promise<void> {
        return await this.deleteUserUseCase.execute({
            actorId: Id.restore(payload.actorId),
            userId: Id.restore(payload.userId)
        });
    }
}