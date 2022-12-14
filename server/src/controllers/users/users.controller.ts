import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
} from 'src/common/decorators/decorators';
import { ApiPath, ExceptionsMessages, UsersApi } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import { GetByIdParams } from 'src/common/validation-dtos/validation-dtos';
import { AdminRoleGuard } from 'src/guards/guards';
import { UsersService } from 'src/services/services';

@UseGuards(AdminRoleGuard)
@Controller(ApiPath.USERS)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(UsersApi.ROOT)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(UsersApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const teacher = await this.usersService.getById(id);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.USER_NOT_FOUND);
    }

    return teacher;
  }

  @Delete(UsersApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.usersService.delete(id);
  }
}
