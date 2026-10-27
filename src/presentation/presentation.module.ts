import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/index.js";

@Module({
    imports: [ApplicationModule]
})
export class PresentationModule { }