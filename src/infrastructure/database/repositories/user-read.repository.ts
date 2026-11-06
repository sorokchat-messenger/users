import { Injectable, Provider } from "@nestjs/common";
import { type UserDetails, type UserDetailsWithPassword, type IUserReadRepository, USER_READ_REPOSITORY_TOKEN } from "../../../application/index.js";
import { PrismaService } from "../prisma/index.js";

@Injectable()
class UserReadRepository implements IUserReadRepository {
    public constructor(
        private readonly prisma: PrismaService
    ) { }

    public async getById(id: string): Promise<UserDetails | null> {
        return await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                displayName: true,
                login: true,
                password: false,
                role: true
            }
        }) as UserDetails | null;
    }

    public async getByLoginWithPassword(login: string): Promise<UserDetailsWithPassword | null> {
        return await this.prisma.user.findUnique({
            where: { login },
            select: {
                id: true,
                displayName: true,
                login: true,
                password: true,
                role: true
            }
        }) as UserDetailsWithPassword | null;
    }

    public async getByTerm(term: string, limit: number, offset: number): Promise<UserDetails[]> {
        return await this.prisma.user.findMany({
            where: {
                OR: [
                    { login: { contains: term, mode: "insensitive" } },
                    { displayName: { contains: term, mode: "insensitive" } }
                ]
            },
            take: limit,
            skip: offset,
            select: {
                id: true,
                displayName: true,
                login: true,
                password: false,
                role: true
            }
        }) as UserDetails[];

    }
}

export const USER_READ_REPOSITORY_PROVIDER: Provider = {
    provide: USER_READ_REPOSITORY_TOKEN,
    useClass: UserReadRepository
}