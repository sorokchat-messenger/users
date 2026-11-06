import { Provider } from '@nestjs/common';
import { CreateUserHandler } from './create-user/index.js';
import { DeleteUserHandler } from './delete-user/index.js';
import { UpdateUserHandler } from './update-user/handler.js';

export { CreateUserCommand } from './create-user/index.js';
export { DeleteUserCommand } from './delete-user/index.js';
export { UpdateUserCommand } from './update-user/index.js';

export const COMMANDS: Provider[] = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];