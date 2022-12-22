import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
} from 'src/common/decorators/decorators';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  ApiPath,
  ExceptionsMessages,
  SchedulesApi,
} from 'src/common/enums/enums';
import { SchedulesService } from 'src/services/services';
import {
  CreateScheduleValidationDto,
  GetByIdParams,
  UpdateScheduleValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller(ApiPath.SCHEDULES)
export class SchedulesController {
  constructor(private scheduleService: SchedulesService) {}

  @Get(SchedulesApi.ROOT)
  getAll() {
    return this.scheduleService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(SchedulesApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const schedule = await this.scheduleService.getById(id);

    if (!schedule) {
      throw new NotFoundException(ExceptionsMessages.SCHEDULE_NOT_FOUND);
    }

    return schedule;
  }

  @UseGuards(JwtAuthGuard)
  @Post(SchedulesApi.ROOT)
  create(@Body() schedule: CreateScheduleValidationDto) {
    return this.scheduleService.create(schedule);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(SchedulesApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() group: UpdateScheduleValidationDto,
  ) {
    const { id } = params;

    return this.scheduleService.update(id, group);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(SchedulesApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.scheduleService.delete(id);
  }
}
