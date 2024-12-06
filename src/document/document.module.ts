import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Document } from './document.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), AuthModule],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [TypeOrmModule, DocumentService],
})
export class DocumentModule {}
