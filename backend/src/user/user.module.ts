import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { GoogleStrategy } from 'src/common/google.strategy';

@Module({
  providers: [UserService, GoogleStrategy],
  controllers: [userController],
})
export class UserModule {}
