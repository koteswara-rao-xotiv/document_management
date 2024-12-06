import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: Partial<User>) {
    const payload: JwtPayload = { email: user.email, userId: user.id, role: user.role.name };
    return {
      access_token: this.jwtService.sign(payload),
      userRes: user
    };
  }
  

  async register(user: User, roleName: string): Promise<{access_token: string, userRes: User}> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const role = await this.roleService.findOneByName(roleName);
    if (!role) {
      throw new BadRequestException('Invalid role');
    }
    user.password = bcrypt.hashSync(user.password, 10);
    user.role = role;
    const userRes = await this.userService.create(user);
    const payload = { email: userRes.email, userId: userRes.id, role: user.role.name }; 
    return { access_token: this.jwtService.sign(payload), userRes };
  }
}
