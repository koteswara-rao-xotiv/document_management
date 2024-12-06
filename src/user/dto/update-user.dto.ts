import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'The email of the user', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The password of the user', required: false })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The first name of the user', required: false })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The last name of the user', required: false })
  lastName?: string;

  @IsOptional()
  @ApiProperty({ description: 'The role ID of the user', required: false })
  roleId?: number; 
}
