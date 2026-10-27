import { Injectable } from "@nestjs/common";
import { HashedPassword } from "../../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";

@Injectable()
export class HashedPasswordMapper implements IMapper<HashedPassword, string> {
    public toDomain(persistence: string): HashedPassword {
        return HashedPassword.restore(persistence);
    }

    public toPersistence(domain: HashedPassword): string {
        return domain.value;
    }
}