import { type GrpcConnectionConfig } from "@sorokchat-messenger/config";
import { type RmqConfig, type CryptograhyConfig, type DatabaseConfig } from "../schemas/index.js";

export type AllConfigs = {
    database: DatabaseConfig;
    cryptography: CryptograhyConfig;
    grpc: GrpcConnectionConfig;
    rmq: RmqConfig
}