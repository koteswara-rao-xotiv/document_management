import { VerificationStatus } from '../../common/enums/verification-status.enum';

export class UpdateDocumentDto {
  title: string;
  fileUrl: string;
  verification_status?: VerificationStatus;
}
