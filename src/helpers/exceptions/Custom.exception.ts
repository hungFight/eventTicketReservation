import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ConflictException } from './conflict.exception';
import { NotFoundException } from './notFound.exception';

export class CustomException extends HttpException {
    constructor(error: any, value: string | string[] | Number, data?: any) {
        const meta = error.meta;

        const response: any = {
            timestamp: new Date().toISOString(),
        };
        let errorCode;
        switch (error.code) {
            case 'P2002':
                response.message = `${meta?.modelName} with ${value} is already taken.`;
                response.statusCode = 409;
                response.data = data;
                break;
            case 'P2025':
                response.message = `${meta?.modelName} with ${value} not found`;
                response.statusCode = 404;
                response.data = data;
                break;
            case 'P2003':
                response.message = `Foreign key constraint failed: ${value} might not exist or is referenced elsewhere.`;
                response.statusCode = 500;
                response.data = data;
                break;
            default:
                response.message = `${meta?.modelName} ${meta?.cause} value: ${value}`;
                response.statusCode = 500;
                response.data = data;
                break;
        }
        super(response, errorCode);
    }
}
