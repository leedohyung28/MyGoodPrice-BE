import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { StoresModule } from 'src/stores/stores.module';
import { StoresService } from 'src/stores/stores.service';

@Module({
  imports: [StoresModule],
  controllers: [LocationsController],
  providers: [LocationsService, StoresService],
})
export class LocationsModule {}


 