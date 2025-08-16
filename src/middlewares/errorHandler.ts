/**
 * errorHandler.ts
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function handleErrors(err: Error, req: Request, res: Response) {
  return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
}

export function handleJsonParseError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Invalid json payload');
  } else {
    next();
  }
}

export function handleNotFound(req: Request, res: Response) {
  return res.sendStatus(StatusCodes.NOT_FOUND);
}
