import { DeleteUserUseCase } from "./delete-user.use-case.js";
import { GetUserByIdUseCase } from "./get-user-by-id.use-case.js";
import { GetUsersByTermUseCase } from "./get-users-by-term.use-case.js";
import { UpdateUserUseCase } from "./update-user.use-case.js";

export * from './get-user-by-id.use-case.js';
export * from './create-user.use-case.js';
export * from './update-user.use-case.js';
export * from './delete-user.use-case.js';
export * from './get-users-by-term.use-case.js';

export const USE_CASES = [
    GetUserByIdUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUsersByTermUseCase
];