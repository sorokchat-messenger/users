import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/index.js";
import { PROVIDERS } from "./repositories/index.js";

@Global()
@Module({
    imports: [PrismaModule],
    providers: PROVIDERS,
    exports: PROVIDERS
})
export class DatabaseModule { }