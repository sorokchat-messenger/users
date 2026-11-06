import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './command.js';
import { UserDetails } from '../../contracts/index.js';
import {
    HashedPassword,
    type IPasswordEncoder,
    type IUserRepository,
    PASSWORD_ENCODER_TOKEN,
    User,
    USER_REPOSITORY_TOKEN,
    UserExistsException
} from '../../../domain/index.js';
import { Inject } from '@nestjs/common';
import { type Role } from '@sorokchat-messenger/microservices';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, UserDetails> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly repository: IUserRepository,
        @Inject(PASSWORD_ENCODER_TOKEN)
        private readonly encoder: IPasswordEncoder
    ) { }

    public async execute(command: CreateUserCommand): Promise<UserDetails> {
        if (await this.repository.existsByLogin(command.login)) throw new UserExistsException();
        const hashedPassword = await HashedPassword.create(this.encoder, command.password)
        const user = User.create(command.login, hashedPassword, command.displayName);
        await this.repository.save(user);
        return {
            id: user.id.value,
            login: user.login,
            displayName: user.displayName,
            role: user.role as Role
        }
    }
}