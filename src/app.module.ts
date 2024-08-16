import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { StoresController } from './stores/stores.controller';
import { StoresModule } from './stores/stores.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    StoresModule,
    MongooseModule.forRoot(
      'mongodb://admin:mygoodprice@svc.sel4.cloudtype.app:30896/MyGoodPrice',
      {
        connectionName: 'Stores',
      },
    ),
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    StoresController,
  ],
  providers: [AppService],
})
export class AppModule {}
