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
    BadCredentialsException,
} from "../domain/index.js";
import { Observable, throwError } from "rxjs";
import { UserCodes, UNKNOWN, AuthorizationCodes } from "@sorokchat-messenger/contracts";
import { GrpcStatus } from "@sorokchat-messenger/microservices";

interface ExceptionMapping {
    code: GrpcStatus;
    message: string;
}

@Catch(DomainException)
export class DomainExceptionFilter implements RpcExceptionFilter {
    private readonly exceptionMap = new Map<Function, ExceptionMapping>([
        [NotIdException, { code: GrpcStatus.INVALID_ARGUMENT, message: UserCodes.ID.INCORRECT }],
        [NotAdminException, { code: GrpcStatus.PERMISSION_DENIED, message: AuthorizationCodes.ACCESS_DENIED }],
        [UserExistsException, { code: GrpcStatus.ALREADY_EXISTS, message: UserCodes.EXISTS }],
        [PasswordNullException, { code: GrpcStatus.INVALID_ARGUMENT, message: UserCodes.PASSWORD.UNDEFINED }],
        [PasswordEmptyException, { code: GrpcStatus.INVALID_ARGUMENT, message: UserCodes.PASSWORD.EMPTY }],
        [PasswordMinException, { code: GrpcStatus.INVALID_ARGUMENT, message: UserCodes.PASSWORD.MIN_LENGTH.CODE }],
        [PasswordMaxException, { code: GrpcStatus.INVALID_ARGUMENT, message: UserCodes.PASSWORD.MAX_LENGTH.CODE }],
        [UserNotFoundException, { code: GrpcStatus.NOT_FOUND, message: UserCodes.NOT_FOUND }],
        [BadCredentialsException, { code: GrpcStatus.INVALID_ARGUMENT, message: AuthorizationCodes.BAD_CREDENTIALS }],
    ]);

    public catch(exception: DomainException): Observable<unknown> {
        let mapping = this.exceptionMap.get(exception.constructor);
        if (!mapping) {
            const exceptionName = exception.constructor?.name;
            for (const [cls, value] of this.exceptionMap.entries()) {
                if (cls.name === exceptionName) {
                    mapping = value;
                    break;
                }
            }
        }
        const code = Number(mapping?.code ?? GrpcStatus.INTERNAL);
        const message = String(mapping?.message ?? UNKNOWN);
        return throwError(() => new RpcException({
            code,
            details: message,
        }));
    }
}