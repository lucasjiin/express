/**
 * errorHandler.ts
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidateError } from 'tsoa';

export function handleErrors(err: unknown, req: Request, res: Response) {
  return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
}

export function handleJsonParseError(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof SyntaxError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Invalid json payload');
  } else {
    next();
  }
}

export function handleNotFound(req: Request, res: Response) {
  return res.sendStatus(StatusCodes.NOT_FOUND);
}

export function handleValidationError(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.log(err);

  if (err instanceof ValidateError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Invalid format payload');
  }

  next();
}
