import { Module } from "@nestjs/common";
import { ConfigModule } from "./infrastructure/index.js";
import { PresentationModule } from "./presentation/index.js";
import { CryptographyModule } from "./infrastructure/index.js";

@Module({
    imports: [ConfigModule, PresentationModule, CryptographyModule]
})
export class AppModule { }