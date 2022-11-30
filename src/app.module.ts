import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ChangeModule } from './change/change.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/helpers/user.schema';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/user/user.service';
import { UserMiddleware } from './middleware/user/user.middleware';

@Module({
  imports: [
    ChangeModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'money-exam-db',
    }),
    /*  MongooseModule.forRoot(process.env.DB_URL, { dbName: 'Haut-tuto' }), */
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '/user/create', method: RequestMethod.POST });
  }
}
