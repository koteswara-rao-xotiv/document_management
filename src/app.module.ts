import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { RoleModule } from './role/role.module';
import { SeedService } from './seed/seed.service';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      uuidExtension: 'pgcrypto',
    }),
    AuthModule,
    UserModule,
    DocumentModule,
    RoleModule,
    IngestionModule,
  ],
  providers: [SeedService],
})
export class AppModule {}

