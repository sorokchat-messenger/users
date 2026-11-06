import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "./command.js";
import { Id, type IUserRepository, NotAdminException, USER_REPOSITORY_TOKEN, UserExistsException, UserNotFoundException } from "../../../domain/index.js";
import { Inject } from "@nestjs/common";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, void> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly repository: IUserRepository
    ) { }

    public async execute(command: UpdateUserCommand): Promise<void> {
        const actorId = Id.restore(command.actorId);
        const userId = Id.restore(command.userId);
        if (!actorId.equal(userId)) {
            const actor = await this.repository.getById(actorId);
            if (actor === null) throw new UserNotFoundException();
            if (!actor.isAdmin) throw new NotAdminException();
        }
        const user = await this.repository.getById(userId);
        if (user === null) throw new UserNotFoundException();
        if (command.login) {
            const hasByLogin = await this.repository.existsByLogin(command.login);
            if (hasByLogin) throw new UserExistsException();
            user.changeLogin(command.login);
        }
        if (command.displayName) user.changeDisplayName(command.displayName);
        await this.repository.save(user);
    }
}