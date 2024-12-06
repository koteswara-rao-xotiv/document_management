import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/admin")
  @ApiOperation({ summary: "admin registration" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: "Registration successful" })
  async registerAdmin(@Body() user: User) {
    return await this.authService.register(user, "admin");
  }

  @Post("register/editor")
  @ApiOperation({ summary: "editor registration" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: "Registration successful" })
  async registerEditor(@Body() user: User) {
    return await this.authService.register(user, "editor");
  }

  @Post("register/viewer")
  @ApiOperation({ summary: "viewer registration" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: "Registration successful" })
  async registerViewer(@Body() user: User) {
    return await this.authService.register(user, "viewer");
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Login successful" })
  async login(@Request() req) {
    req.session.user = req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @ApiBearerAuth()
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200, description: "Logout successful" })
  async logout(@Request() req, @Res() res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Could not log out.");
      }
      res.send("Logged out successfully");
    });
  }
}
