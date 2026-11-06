import { Global, Module, type Provider } from "@nestjs/common";
import { CqrsModule as Cqrs } from '@nestjs/cqrs';
import { COMMANDS, QUERIES } from "../../application/index.js";
import { CqrsBus } from "./cqrs.bus.js";

const PROVIDERS: Provider[] = [...COMMANDS, ...QUERIES, CqrsBus];

@Global()
@Module({
    imports: [Cqrs],
    providers: PROVIDERS,
    exports: PROVIDERS

})
export class CqrsModule { }