import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: Error, payload: User) => void): Promise<any> {
    const user = await this.userService.findOneByEmail(payload.email);
    done(null, user);
  }
}
