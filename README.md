# Project Overview

This project is a template for using Express.
It contains sample code for using various tools.

## Project Structure

-   **constants**: Constants used throughout the project
-   **controllers**: Handles client requests
-   **dto**: Defines and validates client request data
-   **graphql**: Provides Apollo Server and resolver definitions for GraphQL operations
-   **middlewares**: Middleware functions
-   **repositories**: DAO collections for interacting with the database
-   **routes**: Route path configurations
-   **services**: Logic for handling client requests
-   **utils**: Miscellaneous utilities

## Modules Used and Configuration

### Environment Configuration

-   **eslint**: For code linting
-   **prettier**: For code formatting
-   **typescript**: For type checking and modern JavaScript features
-   **bun js**: For package manager and running ts
-   **graphql-codegen**: For generate types from graphql schema
-   **apidoc**: For documentation of rest api

### Runtime

-   **express**: Web framework for Node.js
-   **zod**: Middleware for validating data
-   **helmet**: Security middleware for Express to set various HTTP headers
-   **dotenv**: Loads environment variables from a `.env` file into `process.env`
-   **cluster**: Used for load balancing across multiple CPU cores
-   **winston, morgan**: Logging
-   **prisma**: DB ORM
-   **apollo-server**: Graphql operation handling

## Usage

-   **Prerequisites**
    -   **Bun js Install**
        -   curl -fsSL https://bun.sh/install | bash
    -   **Database Setup**
        -   You need to have a database configured for the project. If you don't have one, remove all Prisma-related code.
        1. Modify the database URL in .env to match your environment.
        2. Initialize Prisma - npx prisma init
        3. Change to below to the schema.prisma file that is automatically generated.
            ```prisma
            generator client {
                provider = "prisma-client-js"
                output   = "client" // add this line
            }
            ```
        4. Create Prisma tables - npx prisma db push
-   **Install packages**: `bun run intsall`
-   **Generate graphql types**: `bun graphql-codegen`
-   **Generate prisma client**: `npx prisma generate`
-   **Generate api docs**: `bun run apidoc`
-   **Run demo**: `bun run dev`
-   **Build**: `bun run build`
-   **Test**
    1. rest api: http://localhost:3000/docs
    2. graphql: http://localhost:3000/api

## Using PM2 for Clustering

-   **To run the application in a cluster using PM2, follow these steps**
    1. **Install PM2**: `npm install -g pm2`
    2. **Start the application with PM2**: `yarn build && yarn start:pm2`
    3. **Delete all PM2 instances**: `pm2 delete all`
    4. **Test**: `for i in $(seq 1 10); do curl -X GET http://localhost:3000/user && echo; done`
