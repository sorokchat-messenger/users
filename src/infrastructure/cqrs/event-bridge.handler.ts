import { Injectable, OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { EventBus, type IEvent } from "@nestjs/cqrs";
import { RmqService } from "@sorokchat-messenger/microservices";
import { Subscription } from "rxjs";

@Injectable()
export class EventBridgeHandler implements OnModuleInit, OnModuleDestroy {
    private subcription?: Subscription;

    public constructor(
        private readonly service: RmqService,
        private readonly eventBus: EventBus
    ) { }

    public async onModuleInit(): Promise<void> {
        this.subcription = this.eventBus.subscribe({
            next: (event: IEvent) => this.handle(event)
        });
    }

    public async onModuleDestroy() {
        this.subcription?.unsubscribe();
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