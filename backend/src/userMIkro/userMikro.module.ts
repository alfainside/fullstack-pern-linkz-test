import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserNewService } from './userMikro.service';
import { UserNewController } from './userMikro.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { user } from './userMikro.entity';
import { UserNewGoogleController } from './userGoogleMikro.contoller';
import { AuthMiddlewareMikro } from 'src/common/auth.middlewaremikro';
import { GoogleStrategy } from 'src/common/google.strategy';

@Module({
  providers: [UserNewService, GoogleStrategy],
  controllers: [UserNewController, UserNewGoogleController],
  exports: [UserNewService],
  imports: [MikroOrmModule.forFeature({ entities: [user] })],
})
export class UserNewModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlewareMikro).forRoutes(
      { path: 'api/users/*', method: RequestMethod.GET },
      { path: 'api/users/*', method: RequestMethod.PUT },
      // { path: 'user', method: RequestMethod.PUT },
    );
  }
}
