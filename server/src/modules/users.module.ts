import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { User } from 'src/entities/entities';
import { UsersController } from 'src/controllers/controllers';
import { JwtService, UsersService } from 'src/services/services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
