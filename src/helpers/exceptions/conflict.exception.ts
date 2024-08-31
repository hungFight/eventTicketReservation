import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
    constructor(message: string) {
        const response = {
            statusCode: HttpStatus.CONFLICT,
            message: message,
            timestamp: new Date().toISOString(),
        };
        super(response, HttpStatus.CONFLICT);
    }
}
