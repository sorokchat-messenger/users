import { Module } from "@nestjs/common";
import { CONTROLLERS } from "./controllers/index.js";

@Module({
    imports: [],
    controllers: CONTROLLERS
})
export class PresentationModule { }