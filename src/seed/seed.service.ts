import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const roles = ['admin', 'editor', 'viewer'];
    for (const roleName of roles) {
      const role = await this.roleRepository.findOne({ where: { name: roleName } });
      if (!role) {
        await this.roleRepository.save({ name: roleName });
      }
    }
  }
}
