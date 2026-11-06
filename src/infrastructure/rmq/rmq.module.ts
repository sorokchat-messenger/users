import { Global, Module } from "@nestjs/common";
import { RmqModule as Rmq } from "@sorokchat-messenger/microservices";
import { ConfigService } from '@nestjs/config';
import { type AllConfigs } from "../config/index.js";

const asyncModule = Rmq.registerAsync({
    inject: [ConfigService],
    queue: "users",
    useFactory: (config: ConfigService<AllConfigs>) => {
        return {
            urls: [config.getOrThrow("rmq.url", { infer: true })],
            queueOptions: {
                durable: true
            }
        }
    }
})

@Global()
@Module({
    imports: [asyncModule],
    exports: [asyncModule]
})
export class RmqModule { }