import { PrismaClient } from "./generated/client.js";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient {
    private readonly pool: Pool;

    public constructor() {
        const pool = new Pool();
        super({ adapter: new PrismaPg(pool) });
        this.pool = pool;
    }
}