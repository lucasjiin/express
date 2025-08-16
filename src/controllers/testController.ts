/**
 * testController.ts
 */
import { Request, Response } from 'express';

// import { TestDto } from '../dto/TestDto.js';

const LOG_TAG = 'testController'; // eslint-disable-line

function create(req: Request, res: Response): void {
  //   const data = req.body as TestDto;
  res.send('success');
}

function read(req: Request, res: Response): void {
  res.send('success');
}

function readAll(req: Request, res: Response): void {
  res.send('success');
}

function remove(req: Request, res: Response): void {
  res.send('success');
}

function update(req: Request, res: Response): void {
  res.send('success');
}

const testController = {
  create,
  read,
  readAll,
  remove,
  update,
};

export default testController;
