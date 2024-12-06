import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @IsString()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @IsString()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @IsOptional()
  @ApiProperty({ description: 'The role ID of the user', required: false })
  roleId?: number;  
}
