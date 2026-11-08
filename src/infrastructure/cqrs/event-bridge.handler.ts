import { Injectable, OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { EventBus, type IEvent } from "@nestjs/cqrs";
import { RmqService } from "@sorokchat-messenger/microservices";
import { Event } from "@sorokchat-messenger/shared-events";
import { Subscription } from "rxjs";

@Injectable()
export class EventBridgeHandler implements OnModuleInit, OnModuleDestroy {
    private subscription?: Subscription;

    public constructor(
        private readonly service: RmqService,
        private readonly eventBus: EventBus
    ) { }

    public async onModuleInit(): Promise<void> {
        this.subscription = this.eventBus.subscribe({
            next: (event: IEvent) => this.handle(event)
        });
    }

    public async onModuleDestroy() {
        this.subscription?.unsubscribe();
    }

    private async handle(event: IEvent): Promise<void> {
        if (this.isSharedEvent(event)) {
            const { pattern, ...payload } = event;
            this.service.emit(pattern, payload);
        }
    }

    public isSharedEvent(event: IEvent): event is Event {
        return event !== null && event !== undefined && typeof event === 'object' && "pattern" in event;
    }
}