import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RolesGuard } from "../common/guards/roles.guard";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("roles")
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Create a role" })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: "Role created successfully" })
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.createRole(createRoleDto);
    return { message: "Role created successfully", role };
  }
  @Get()
  @Roles(Role.Admin, Role.Editor)
  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, description: "List of roles" })
  async findAll() {
    const roles = await this.roleService.findAll();
    return { roles };
  }
}
