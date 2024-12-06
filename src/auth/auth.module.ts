import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RoleModule } from '../role/role.module';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'x-SecreteCode_key',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([User]),
    RoleModule,
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, SessionSerializer], 
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
