import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    StoresModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`,
      {
        dbName: 'MyGoodPrice',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
