import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './stores/stores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import * as dotenv from 'dotenv';

dotenv.config();

import { APP_PIPE } from '@nestjs/core';
import { MyplacesModule } from './myplaces/myplaces.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    StoresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_USER')}:${configService.get('DB_PASSWORD')}@${configService.get('DB_URI')}`,
        dbName: 'MyGoodPrice',
      }),
    }),
    AuthModule,
    UsersModule,
    LikesModule,
    MyplacesModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, //FOR PIPE(validation )
    },
  ],
})
export class AppModule {}
