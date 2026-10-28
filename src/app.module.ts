import { Module } from "@nestjs/common";
import { ConfigModule } from "./infrastructure/index.js";
import { PresentationModule } from "./presentation/index.js";

@Module({
    imports: [ConfigModule, PresentationModule]
})
export class AppModule { }