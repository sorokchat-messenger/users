import { type Provider } from "@nestjs/common";
import { USER_REPOSITORY_PROVIDER } from "./user.repository.js";
import { USER_READ_REPOSITORY_PROVIDER } from "./user-read.repository.js";

export const PROVIDERS: Provider[] = [
    USER_REPOSITORY_PROVIDER,
    USER_READ_REPOSITORY_PROVIDER
];