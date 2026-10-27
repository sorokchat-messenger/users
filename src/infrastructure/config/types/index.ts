import { type GrpcConnectionConfig } from "@sorokchat-messenger/config";
import { type CryptograhyConfig, type DatabaseConfig } from "../schemas/index.js";

export type AllConfigs = {
    database: DatabaseConfig;
    cryptography: CryptograhyConfig;
    grpc: GrpcConnectionConfig;
}