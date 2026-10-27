import { type Provider } from "@nestjs/common";
import { USER_REPOSITORY_PROVIDER } from "./user.repository.js";

export const PROVIDERS: Provider[] = [USER_REPOSITORY_PROVIDER];