import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(massage: string) {
        const response = {
            statusCode: HttpStatus.FORBIDDEN,
            message: massage,
            timestamp: new Date().toISOString(),
        };
        super(response, HttpStatus.FORBIDDEN);
    }
}
