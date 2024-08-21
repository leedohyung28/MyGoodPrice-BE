import { forwardRef, Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { StoresService } from 'src/stores/stores.service';
import { StoresModule } from 'src/stores/stores.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [StoresModule, UsersModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
