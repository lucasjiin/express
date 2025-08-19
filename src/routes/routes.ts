/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestController } from './../controllers/TestController.js';
import { expressAuthentication } from './../auth/authentication.js';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  CreateTest: {
    dataType: 'refObject',
    properties: {
      email: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, { noImplicitAdditionalProperties: 'throw-on-extras', bodyCoercion: true });

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsTestController_create: Record<string, TsoaRoute.ParameterSchema> = {
    requestBody: { in: 'body', name: 'requestBody', required: true, ref: 'CreateTest' },
  };
  app.post(
    '/test',
    authenticateMiddleware([{ dej: [] }]),
    ...fetchMiddlewares<RequestHandler>(TestController),
    ...fetchMiddlewares<RequestHandler>(TestController.prototype.create),

    async function TestController_create(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsTestController_create, request, response });

        const controller = new TestController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsTestController_read: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'path', name: 'id', required: true, dataType: 'double' },
  };
  app.get(
    '/test/:id',
    authenticateMiddleware([{ dej: [] }]),
    ...fetchMiddlewares<RequestHandler>(TestController),
    ...fetchMiddlewares<RequestHandler>(TestController.prototype.read),

    async function TestController_read(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsTestController_read, request, response });

        const controller = new TestController();

        await templateService.apiHandler({
          methodName: 'read',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsTestController_readAll: Record<string, TsoaRoute.ParameterSchema> = {};
  app.get(
    '/test',
    authenticateMiddleware([{ dej: [] }]),
    ...fetchMiddlewares<RequestHandler>(TestController),
    ...fetchMiddlewares<RequestHandler>(TestController.prototype.readAll),

    async function TestController_readAll(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsTestController_readAll, request, response });

        const controller = new TestController();

        await templateService.apiHandler({
          methodName: 'readAll',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsTestController_remove: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'path', name: 'id', required: true, dataType: 'double' },
  };
  app.delete(
    '/test/:id',
    authenticateMiddleware([{ dej: [] }]),
    ...fetchMiddlewares<RequestHandler>(TestController),
    ...fetchMiddlewares<RequestHandler>(TestController.prototype.remove),

    async function TestController_remove(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsTestController_remove, request, response });

        const controller = new TestController();

        await templateService.apiHandler({
          methodName: 'remove',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsTestController_update: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'path', name: 'id', required: true, dataType: 'double' },
    requestBody: { in: 'body', name: 'requestBody', required: true, ref: 'CreateTest' },
  };
  app.put(
    '/test/:id',
    authenticateMiddleware([{ dej: [] }]),
    ...fetchMiddlewares<RequestHandler>(TestController),
    ...fetchMiddlewares<RequestHandler>(TestController.prototype.update),

    async function TestController_update(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsTestController_update, request, response });

        const controller = new TestController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(request: any, response: any, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response).catch(pushAndRethrow));
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            }),
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response).catch(pushAndRethrow));
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await Promise.any(secMethodOrPromises);

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }

        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
