import { Module } from "@nestjs/common";
import { ConfigModule, CqrsModule, CryptographyModule, DatabaseModule } from "./infrastructure/index.js";
import { PresentationModule } from "./presentation/index.js";

@Module({
    imports: [ConfigModule, DatabaseModule, PresentationModule, CryptographyModule, CqrsModule]
})
export class AppModule { }