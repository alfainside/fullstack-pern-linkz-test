import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { CommonModule } from './common/common.module';
// import { UserModule } from './user/user.module';
import { UserNewModule } from './userMIkro/userMikro.module';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [CommonModule, MikroOrmModule.forRoot(), UserNewModule],
  controllers: [],
  providers: [],
})
// export class AppModule {}
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
