import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(message: string) {
        const response = {
            statusCode: HttpStatus.CONFLICT,
            message: message,
            timestamp: new Date().toISOString(),
        };
        super(response, HttpStatus.CONFLICT);
    }
}
