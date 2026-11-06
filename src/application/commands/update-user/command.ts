export class UpdateUserCommand {
    public constructor(
        public readonly actorId: string,
        public readonly userId: string,
        public readonly login: string | null,
        public readonly displayName: string | null
    ) { }
}