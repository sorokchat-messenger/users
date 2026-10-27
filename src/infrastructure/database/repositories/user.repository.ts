import { type Provider } from "@nestjs/common";
import { Id, User, USER_REPOSITORY_TOKEN, type IUserRepository } from "../../../domain/index.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { IdMapper, UserMapper } from "../mappers/index.js";

export class UserRepository implements IUserRepository {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly mapper: UserMapper,
        private readonly idMapper: IdMapper
    ) { }

    public async getById(id: Id): Promise<User | null> {
        const candidate = await this.prisma.user.findUnique({ where: { id: this.idMapper.toPersistence(id) } });
        if (candidate === null) return null;
        return this.mapper.toDomain(candidate);
    }

    public async getByTerm(term: string, limit: number, offset: number): Promise<User[]> {
        const candidates = await this.prisma.user.findMany({
            where: {
                OR: [
                    { login: { contains: term, mode: "insensitive" } },
                    { displayName: { contains: term, mode: "insensitive" } }
                ]
            },
            take: limit,
            skip: offset
        });
        return candidates.map(candidate => this.mapper.toDomain(candidate));
    }

    public async save(user: User): Promise<void> {
        const mapped = this.mapper.toPersistence(user);
        const { id, ...payload } = mapped;
        await this.prisma.user.upsert({
            where: { id: mapped.id },
            create: mapped,
            update: payload
        });
    }

    public async delete(id: Id): Promise<void> {
        await this.prisma.user.deleteMany({ where: { id: this.idMapper.toPersistence(id) } });
    }
}

export const USER_REPOSITORY_PROVIDER: Provider = {
    provide: USER_REPOSITORY_TOKEN,
    useClass: UserRepository
};