/**
 * swagger.ts
 */
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

import { testDataSchema } from '../dto/TestDto.js';
import { getServerIpAddresses } from '../utils/commonUtils.js';
import { rootPath, WEB_PORT } from './environments.js';

const serverUrls = getServerIpAddresses().map((ip) => ({
  description: `Local development server`,
  url: `http://${ip}:${WEB_PORT}`,
}));

if (serverUrls.length === 0) {
  serverUrls.push({
    description: 'Local development server',
    url: `http://localhost:${WEB_PORT}`,
  });
}

const swaggerOptions: swaggerJSDoc.Options = {
  apis: [path.join(rootPath, './src/routes/*.ts')],
  definition: {
    components: {
      schemas: {
        TestData: testDataSchema,
      },
      // securitySchemes: {
      //   cookieAuth: {
      //     description: 'Session cookie for authentication',
      //     in: 'cookie',
      //     name: 'session_cookie_intellilab',
      //     type: 'apiKey',
      //   },
      // },
    },
    info: {
      contact: {
        email: 'bjpark0813@gmail.com',
        name: 'express',
      },
      description: 'express template',
      title: 'Express',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: serverUrls,
  },
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;

// Custom options sample
// export const swaggerOptions = {
//   explorer: true,
//   customCss: `
//     .swagger-ui .topbar { display: none }
//     .swagger-ui .info { margin: 20px 0 }
//   `,
//   customSiteTitle: 'Intellilab API Documentation',
//   customfavIcon: '/favicon.ico',
//   swaggerOptions: {
//     persistAuthorization: true,
//     displayRequestDuration: true,
//   },
// };
