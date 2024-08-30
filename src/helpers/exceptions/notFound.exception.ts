import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(message: string) {
        const response = {
            statusCode: HttpStatus.NOT_FOUND,
            message: message,
            timestamp: new Date().toISOString(),
        };
        super(response, HttpStatus.NOT_FOUND);
    }
}
