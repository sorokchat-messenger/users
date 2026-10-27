import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { AllConfigs } from "../../config/index.js";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly pool: Pool;

    public constructor(configService: ConfigService<AllConfigs>) {
        const pool = new Pool({
            connectionString: configService.getOrThrow('database.connectionString', { infer: true }),
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            keepAlive: true
        });
        super({ adapter: new PrismaPg(pool) });
        this.pool = pool;
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
        await this.pool.end();
    }
}