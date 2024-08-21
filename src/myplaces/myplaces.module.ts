import { Module } from '@nestjs/common';
import { MyplacesService } from './myplaces.service';
import { MyplacesController } from './myplaces.controller';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [LikesModule],
  providers: [MyplacesService],
  controllers: [MyplacesController],
})
export class MyplacesModule {}
