import { Catch, type RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';
import {
    DomainException,
    NotIdException,
    NotAdminException,
    UserExistsException,
    PasswordNullException,
    PasswordMinException,
    PasswordMaxException,
    UserNotFoundException,
    PasswordEmptyException,
} from "../domain/index.js";
import { Observable, throwError } from "rxjs";
import { UserCodes, UNKNOWN, AuthorizationCodes } from "@sorokchat-messenger/contracts";
import { GrpcStatus } from "@sorokchat-messenger/microservices";

@Catch(DomainException)
export class DomainExceptionFilter implements RpcExceptionFilter {
    public catch(exception: DomainException): Observable<unknown> {
        let message: string = UNKNOWN;
        let code: GrpcStatus = GrpcStatus.INTERNAL;
        if (exception instanceof NotIdException) {
            message = UserCodes.ID.INCORRECT;
            code = GrpcStatus.INVALID_ARGUMENT;
        }
        if (exception instanceof NotAdminException) {
            message = AuthorizationCodes.ACCESS_DENIED;
            code = GrpcStatus.PERMISSION_DENIED;
        }
        if (exception instanceof UserExistsException) {
            message = UserCodes.EXISTS;
            code = GrpcStatus.ALREADY_EXISTS;
        }
        if (exception instanceof PasswordNullException) {
            message = UserCodes.PASSWORD.UNDEFINED;
            code = GrpcStatus.INVALID_ARGUMENT;
        }
        if (exception instanceof PasswordEmptyException) {
            message = UserCodes.PASSWORD.EMPTY;
            code = GrpcStatus.INVALID_ARGUMENT;
        }
        if (exception instanceof PasswordMinException) {
            message = UserCodes.PASSWORD.MIN_LENGTH.CODE;
            code = GrpcStatus.INVALID_ARGUMENT;
        }
        if (exception instanceof PasswordMaxException) {
            message = UserCodes.PASSWORD.MAX_LENGTH.CODE;
            code = GrpcStatus.INVALID_ARGUMENT;
        }
        if (exception instanceof UserNotFoundException) {
            message = UserCodes.NOT_FOUND;
            code = GrpcStatus.NOT_FOUND;
        }
        return throwError(() => new RpcException({ code, message }));
    }
}