import { Injectable } from "@nestjs/common";
import { User } from "../../domain/index.js";
import { IMapper } from "./mapper.interface.js";
import { type GetUserResponse, type Role } from "@sorokchat-messenger/microservices";
import { IdMapper } from "./id.mapper.js";

@Injectable()
export class UserMapper implements IMapper<User, GetUserResponse> {
    public constructor(private readonly idMapper: IdMapper) { }

    public toPresentation(domain: User): GetUserResponse {
        return {
            login: domain.login,
            role: domain.role as Role,
            displayName: domain.displayName,
            id: this.idMapper.toPresentation(domain.id)
        }
    }

}