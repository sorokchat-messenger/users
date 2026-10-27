import { Injectable } from "@nestjs/common";
import { type IMapper } from "./mapper.interface.js";
import { User as Domain, HashedPassword } from "../../../domain/index.js";
import { IdMapper } from "./id.mapper.js";
import { HashedPasswordMapper } from "./hashed-password.mapper.js";
import { User as Persistence } from "../prisma/generated/client.js"

@Injectable()
export class UserMapper implements IMapper<Domain, Persistence> {
    public constructor(
        private readonly idMapper: IdMapper,
        private readonly hashedPasswordMapper: HashedPasswordMapper
    ) { }

    public toDomain(persistence: Persistence): Domain {
        return Domain.restore(
            this.idMapper.toDomain(persistence.id),
            persistence.login,
            HashedPassword.restore(persistence.password),
            persistence.displayName,
            persistence.role
        );
    }

    public toPersistence(domain: Domain): Persistence {
        return {
            id: this.idMapper.toPersistence(domain.id),
            login: domain.login,
            displayName: domain.displayName,
            password: this.hashedPasswordMapper.toPersistence(domain.hashedPassword),
            role: domain.role
        }
    }
}