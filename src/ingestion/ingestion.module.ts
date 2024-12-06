import { Module } from '@nestjs/common';
import { DocumentModule } from '../document/document.module';
import { IngestionController } from './ingestion.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DocumentModule, AuthModule],
  controllers: [IngestionController],
})
export class IngestionModule {}

