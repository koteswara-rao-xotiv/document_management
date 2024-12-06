import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/role.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const role = await this.roleRepository.findOne({ where: { id: createUserDto.roleId } });
    if (!role) {
      throw new InternalServerErrorException('Role not found');
    }

    const user = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: role,
    });

    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: ['role'] });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ select:['id', 'email', 'firstName', 'lastName'], relations: ['role'] });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, select:['id', 'email', 'firstName', 'lastName'] });

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    if (updateUserDto.roleId) {
      const role = await this.roleRepository.findOne({ where: { id: updateUserDto.roleId } });
      if (!role) {
        throw new InternalServerErrorException('Role not found');
      }
      user.role = role;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['role'] });
  }
}
