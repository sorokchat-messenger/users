import { Global, Module, type Provider } from "@nestjs/common";
import { CqrsModule as Cqrs } from '@nestjs/cqrs';
import { COMMANDS, QUERIES } from "../../application/index.js";
import { CqrsBus } from "./cqrs.bus.js";
import { EventBridgeHandler } from "./event-bridge.handler.js";

const PROVIDERS: Provider[] = [...COMMANDS, ...QUERIES, CqrsBus, EventBridgeHandler];

@Global()
@Module({
    imports: [Cqrs],
    providers: PROVIDERS,
    exports: [...PROVIDERS, Cqrs]

})
export class CqrsModule { }