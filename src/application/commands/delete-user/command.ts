export class DeleteUserCommand {
    public constructor(
        public readonly actorId: string,
        public readonly userId: string
    ) { }
}