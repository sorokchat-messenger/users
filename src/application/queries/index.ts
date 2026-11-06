import { type Provider } from "@nestjs/common";
import { CheckCredentialsHandler } from "./check-credentials/index.js";
import { GetUserByIdHandler } from "./get-user-by-id/index.js";
import { GetUserByTermHandler } from "./get-user-by-term/handler.js";

export { CheckCredentialsQuery } from './check-credentials/index.js';
export { GetUserByIdQuery } from './get-user-by-id/index.js';
export { GetUserByTermQuery } from './get-user-by-term/index.js';

export const QUERIES: Provider[] = [CheckCredentialsHandler, GetUserByIdHandler, GetUserByTermHandler];