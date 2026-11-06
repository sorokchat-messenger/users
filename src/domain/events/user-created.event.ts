export class UserCreatedEvent {
    public constructor(
        public readonly userId: string
    ) { }
}