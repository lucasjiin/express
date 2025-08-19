/**
 * CreateTest.ts
 */
import { IsEmail, IsString } from 'class-validator';

class CreateTest {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}

export default CreateTest;
