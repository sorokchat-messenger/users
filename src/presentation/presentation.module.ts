import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/index.js";
import { CONTROLLERS } from "./controllers/index.js";
import { IdMapper, UserMapper } from "./mappers/index.js";

@Module({
    imports: [ApplicationModule],
    controllers: CONTROLLERS,
    providers: [IdMapper, UserMapper]
})
export class PresentationModule { }