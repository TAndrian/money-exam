import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';
import { UserController } from './controller/user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController, UserService],
})
export class UserModule {}
