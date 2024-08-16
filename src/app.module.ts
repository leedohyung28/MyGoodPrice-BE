import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { StoresController } from './stores/stores.controller';
import { StoresModule } from './stores/stores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresService } from './stores/stores.service';

@Module({
  imports: [
    AuthModule,
    StoresModule,
    MongooseModule.forRoot(
      'mongodb://admin:mygoodprice@svc.sel4.cloudtype.app:30896',
      // {
      //   dbName: 'MyGoodPrice',
      //   connectionName: 'Stores',
      // },
    ),
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    StoresController,
  ],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
