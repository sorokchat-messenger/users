import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "./command.js";
import { Id, type IUserRepository, NotAdminException, USER_REPOSITORY_TOKEN, UserNotFoundException } from "../../../domain/index.js";
import { Inject } from "@nestjs/common";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, void> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly repository: IUserRepository
    ) { }

    public async execute(command: DeleteUserCommand): Promise<void> {
        const actorId = Id.restore(command.actorId);
        const userId = Id.restore(command.userId);
        if (!actorId.equal(userId)) {
            const actor = await this.repository.getById(actorId);
            if (actor === null) throw new UserNotFoundException();
            if (!actor.isAdmin) throw new NotAdminException();
        }
        const user = await this.repository.getById(userId);
        if (!user) throw new UserNotFoundException();
        user.delete();
        await this.repository.delete(user);
    }

}