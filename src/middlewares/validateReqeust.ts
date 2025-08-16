/**
 * validateReqeust.ts
 */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateReqeust(type: new () => object) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    const errors = await validate(dtoObj, { forbidNonWhitelisted: true, whitelist: true });

    if (errors.length > 0) {
      const messages = errors.flatMap((err) => Object.values(err.constraints ?? {}));
      return res.status(400).json({ errors: messages });
    }

    req.body = dtoObj;
    next();
  };
}
