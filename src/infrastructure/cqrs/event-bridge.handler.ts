import { EventsHandler, type IEvent, type IEventHandler } from "@nestjs/cqrs";
import { RmqService } from "@sorokchat-messenger/microservices";

@EventsHandler()
export class EventBridgeHandler implements IEventHandler<IEvent> {
    public constructor(
        private readonly service: RmqService
    ) { }

    public async handle(event: IEvent): Promise<void> {
        const eventName = event.constructor.name;
        const pattern = eventName
            .replace(/Event$/, '')
            .replace(/([a-z])([A-Z])/g, "$1.$2")
            .toLowerCase();
        this.service.emit(pattern, event);
    }
}