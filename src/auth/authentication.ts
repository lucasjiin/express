import * as express from 'express';

export function expressAuthentication(request: express.Request, securityName: string /* , scopes?: string[] */): Promise<unknown> {
  if (securityName === 'dej') {
    return Promise.resolve({});
  }

  return Promise.reject(new Error('Unknown security scheme'));
}
