import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, type ICommand, type IEvent, type IQuery, QueryBus } from "@nestjs/cqrs";

@Injectable()
export class CqrsBus {
    public constructor(
        private readonly command: CommandBus,
        private readonly query: QueryBus,
        private readonly event: EventBus
    ) { }

    public async execute<Result>(command: ICommand): Promise<Result> {
        return await this.command.execute(command);
    }

    public async fetch<Result>(query: IQuery): Promise<Result> {
        return await this.query.execute(query);
    }

    public emit(event: IEvent): void {
        this.event.publish(event);
    }
}