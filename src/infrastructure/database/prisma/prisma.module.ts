import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";

@Module({
    imports: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule { }