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
- **session**: Session management
- **cookie**: Cookie management
- **winston**: Logging

## Usage

- **Install packages**: `yarn`
- **Run demo**: `yarn dev`
- **Build**: `yarn build`
- **Test**: `curl -X GET http://localhost:3000/user && echo ''`
