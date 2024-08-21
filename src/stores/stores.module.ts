import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresService } from './stores.service';
import { Stores, StoreSchema } from './stores.schema';
import { StoresController } from './stores.controller';
import { StoresRepository } from './stores.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stores.name, schema: StoreSchema }]),
  ],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
  exports: [StoresService],
})
export class StoresModule {}
