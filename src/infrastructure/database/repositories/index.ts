import { type Provider } from "@nestjs/common";
import { USER_REPOSITORY_PROVIDER } from "./user.repository.js";
import { HashedPasswordMapper, IdMapper, UserMapper } from "../mappers/index.js";

export const PROVIDERS: Provider[] = [USER_REPOSITORY_PROVIDER, IdMapper, UserMapper, HashedPasswordMapper];