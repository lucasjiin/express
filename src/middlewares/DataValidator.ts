/**
 * DataValidator.ts
 */
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue, ZodSchema } from 'zod';

class DataValidator {
    static validate =
        <T>(schema: ZodSchema<T>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });

                next();
            } catch (error) {
                console.log(error);

                if (error instanceof ZodError) {
                    const message = error.errors.reduce((previousValue, issue: ZodIssue) => {
                        return `${previousValue} \n${issue.path.join('.')} ${issue.message}`;
                    }, '');

                    return res.status(StatusCodes.BAD_REQUEST).send(message);
                }
                return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            }
        };
}

export default DataValidator;
