import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsMessages } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
} from 'src/common/types/types';
import { FacultiesService } from 'src/faculties/faculties.service';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private repository: Repository<Department>,
    private facultiesService: FacultiesService,
  ) {}

  getAll(): Promise<Department[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Department | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(department: CreateDepartmentRequestDto): Promise<Department> {
    const facultyInDb = this.facultiesService.getById(department.facultyId);

    if (!facultyInDb) {
      throw new BadRequestException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    const newDepartment = this.repository.create(department);

    return this.repository.save(newDepartment);
  }

  async update(
    id: number,
    department: Partial<UpdateDepartmentRequestDto>,
  ): Promise<Department> {
    const departmentToUpdate = await this.getById(id);

    if (!departmentToUpdate) {
      throw new NotFoundException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    const facultyToJoin = await this.facultiesService.getById(
      department.facultyId,
    );

    if (!facultyToJoin) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    Object.assign(departmentToUpdate, department);
    return this.repository.save(departmentToUpdate);
  }

  async delete(id: number): Promise<Department> {
    const department = await this.getById(id);

    if (!department) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    return this.repository.remove(department);
  }
}
