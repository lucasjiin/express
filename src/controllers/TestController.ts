import { getReasonPhrase, StatusCodes } from 'http-status-codes';
/**
 * TestController.ts
 */
import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Service } from 'typedi';

import CreateTest from '../dto/CreateTest.js';

const LOG_TAG = 'TestController'; // eslint-disable-line

@Route('test')
@Security('dej')
@Service()
@Tags('Test')
export class TestController extends Controller {
  @Post()
  @SuccessResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED))
  public create(@Body() requestBody: CreateTest) {
    return { data: requestBody, message: 'success.' };
  }

  @Get('{id}')
  public read(@Path() id: number) {
    const user: CreateTest = {
      email: 'test@example.com',
      name: `test`,
    };
    return { data: user, message: `success ${id}.` };
  }

  @Get()
  public readAll() {
    const users: CreateTest[] = [{ email: 'test1@example.com', name: 'User 1' }];
    return { data: users, message: 'success' };
  }

  @Delete('{id}')
  public remove(@Path() id: number) {
    return { message: `success ${id}.` };
  }

  @Put('{id}')
  public update(@Path() id: number, @Body() requestBody: CreateTest) {
    return { data: requestBody, message: `success ${id}.` };
  }
}
