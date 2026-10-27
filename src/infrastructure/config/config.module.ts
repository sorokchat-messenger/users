import 'dotenv/config';

import { Global, Module } from "@nestjs/common";
import { ConfigModule as Config } from '@nestjs/config';
import { loadEnv } from "./env/index.js";

@Global()
@Module({
    imports: [
        Config.forRoot({
            load: loadEnv(),
            isGlobal: true
        })
    ]
})
export class ConfigModule { }