# Project Overview

This project is a template for using Express. It is implemented using a class-based, object-oriented approach.

## Project Structure

- **constants**: Constants used throughout the project
- **controllers**: Handles client requests
- **docs**: Documentation for Swagger (currently not implemented)
- **dto**: Defines and validates client request data
- **middlewares**: Middleware functions
- **repositories**: DAO collections for interacting with the database
- **routes**: Route path configurations
- **services**: Logic for handling client requests
- **utils**: Miscellaneous utilities
## Modules Used and Configuration

### Environment Configuration

- **eslint**: For code linting
- **prettier**: For code formatting
- **typescript**: For type checking and modern JavaScript features
- **swc**: For compiling

### Runtime

- **express**: Web framework for Node.js
- **express-validator**: Middleware for validating and sanitizing request data
- **helmet**: Security middleware for Express to set various HTTP headers
- **dotenv**: Loads environment variables from a `.env` file into `process.env`
- **winston**: Logging

## Usage

- **Install packages**: `yarn`
- **Run demo**: `yarn dev`
- **Build**: `yarn build`
- **Test**: `curl -X GET http://localhost:3000/user && echo ''`


## Using the TSC Compiler

To use the `tsc` compiler with watch mode, follow the steps below:

### 1. Install `tsc-watch`
```bash
yarn add -D tsc-watch
```

### 2. Modify package.json scripts
```json
"scripts": {
    "dev": "tsc-watch --onSuccess \"npm run start\"",
    "dev:lint": "tsc-watch --onSuccess \"npm run start:lint\"",
    "start": "node dist/main.js",
    "start:lint": "npm run lint && node dist/main.js",
    "build": "npm run clean && tsc",
    "clean": "rm -rf ./dist",
    "lint": "eslint \"src/**/*.ts\"",
    "format": "prettier --write .",
    "api-docs": "swagger-cli bundle docs/openapi.yaml --outfile ./docs/swagger.yaml --type yaml --verbose"
}
```
