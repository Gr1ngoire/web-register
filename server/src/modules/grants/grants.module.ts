import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { GrantsController } from 'src/controllers/controllers';
import { Grant, User } from 'src/entities/entities';
import { GrantsService, JwtService, UsersService } from 'src/services/services';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grant, User]),
    forwardRef(() => UsersModule),
  ],
  controllers: [GrantsController],
  providers: [GrantsService, UsersService, JwtService],
})
export class GrantsModule {}
