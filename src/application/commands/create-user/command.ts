export class CreateUserCommand {
    public constructor(
        public readonly login: string,
        public readonly password: string,
        public readonly displayName: string | null
    ) { }
}