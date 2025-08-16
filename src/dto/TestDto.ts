/**
 * TestDto.ts
 */
import { IsEmail, IsString } from 'class-validator';

export class TestDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}

export const testDataSchema = {
  properties: {
    email: { description: 'email', type: 'string' },
    name: { description: 'name', type: 'string' },
  },
  type: 'object',
};
