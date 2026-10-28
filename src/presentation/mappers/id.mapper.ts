import { Injectable } from "@nestjs/common";
import { type Id } from "../../domain/index.js";
import { type IMapper } from "./mapper.interface.js";

@Injectable()
export class IdMapper implements IMapper<Id, string> {
    public toPresentation(domain: Id): string {
        return domain.value;
    }
}