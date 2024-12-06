import { IsOptional, IsString, IsEnum } from 'class-validator';
import { VerificationStatus } from '../../common/enums/verification-status.enum';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsEnum(VerificationStatus)
  verification_status?: VerificationStatus;
}
