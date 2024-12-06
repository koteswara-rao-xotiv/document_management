import { IsOptional, IsString } from 'class-validator';
export class CreateRoleDto {
  @IsOptional()
  @IsString()
  name?: string;
  }
  