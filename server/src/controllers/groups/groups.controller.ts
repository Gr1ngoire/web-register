import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  UseGuards,
} from 'src/common/decorators/decorators';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import { GroupsService } from 'src/services/services';
import {
  CreateGroupValidationDto,
  GetByIdParams,
  UpdateGroupValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { ApiPath, ExceptionsMessages, GroupsApi } from 'src/common/enums/enums';
import { AdminRoleGuard } from 'src/guards/guards';

@Controller(ApiPath.GROUPS)
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get(GroupsApi.ROOT)
  getAll() {
    return this.groupsService.getAll();
  }

  @UseGuards(AdminRoleGuard)
  @Get(GroupsApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const group = await this.groupsService.getById(id);

    if (!group) {
      throw new NotFoundException(ExceptionsMessages.GROUP_NOT_FOUND);
    }

    return group;
  }

  @UseGuards(AdminRoleGuard)
  @Post(GroupsApi.ROOT)
  create(@Body() group: CreateGroupValidationDto) {
    return this.groupsService.create(group);
  }

  @UseGuards(AdminRoleGuard)
  @Patch(GroupsApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() group: UpdateGroupValidationDto,
  ) {
    const { id } = params;

    return this.groupsService.update(id, group);
  }

  @UseGuards(AdminRoleGuard)
  @Delete(GroupsApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.groupsService.delete(id);
  }
}
