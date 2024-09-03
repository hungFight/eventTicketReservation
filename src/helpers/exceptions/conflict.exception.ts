import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
    constructor(message: string, data?: any) {
        const response = {
            statusCode: HttpStatus.CONFLICT,
            message: message,
            data,
            timestamp: new Date().toISOString(),
        };
        super(response, HttpStatus.CONFLICT);
    }
}
