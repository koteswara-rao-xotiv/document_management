import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'The password of the user', minimum: 6 })
  password: string;

  @IsString()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @IsString()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;
}
