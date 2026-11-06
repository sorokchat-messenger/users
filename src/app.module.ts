import { Module } from "@nestjs/common";
import { ConfigModule, CqrsModule, CryptographyModule, DatabaseModule, RmqModule } from "./infrastructure/index.js";
import { PresentationModule } from "./presentation/index.js";

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        PresentationModule,
        CryptographyModule,
        CqrsModule,
        RmqModule
    ]
})
export class AppModule { }