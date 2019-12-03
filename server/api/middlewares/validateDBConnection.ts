import { NextFunction, Request, Response } from 'express';
import { db } from '../../database';
import { InvalidDBConnectionError } from '../errors';

export async function validateDBConnection(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await db.connect();
        result.done();
        next();
    } catch (e) {
        next(new InvalidDBConnectionError());
    }
}
