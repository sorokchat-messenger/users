import { Injectable, type OnModuleInit } from "@nestjs/common";
import { EventBus, type IEvent } from "@nestjs/cqrs";
import { RmqService } from "@sorokchat-messenger/microservices";

@Injectable()
export class EventBridgeHandler implements OnModuleInit {
    public constructor(
        private readonly service: RmqService,
        private readonly eventBus: EventBus
    ) { }

    public async onModuleInit(): Promise<void> {
        this.eventBus.subscribe({
            next: (event: IEvent) => this.handle(event)
        })
    }

    private async handle(event: IEvent): Promise<void> {
        const eventName = event.constructor.name;
        const pattern = eventName
            .replace(/Event$/, '')
            .replace(/([a-z])([A-Z])/g, "$1.$2")
            .toLowerCase();
        this.service.emit(pattern, event);
    }
}