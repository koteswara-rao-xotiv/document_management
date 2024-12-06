import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../user/user.entity';

export default {
  passport: {
    initialize: true,
    session: true,
  },
  strategies: {
    local: {
      'use': Strategy,
      'name': 'local',
      'successMessage': 'Authenticated successfully.',
      'fields': ['email', 'password'],
      'entity': User,
    },
  },
};
