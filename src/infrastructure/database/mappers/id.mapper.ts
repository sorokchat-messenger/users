import { Injectable } from "@nestjs/common";
import { type IMapper } from "./mapper.interface.js";
import { Id } from "../../../domain/index.js";

@Injectable()
export class IdMapper implements IMapper<Id, string> {
    public toDomain(persistence: string): Id {
        return Id.restore(persistence);
    }

    public toPersistence(domain: Id): string {
        return domain.value;
    }

}