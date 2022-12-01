import { DbTablesNames } from 'src/common/enums/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'src/common/decorators/decorators';
import { Department, Schedule, Student } from './entities';

@Entity({ name: DbTablesNames.GROUPS })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  course: number;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @OneToMany(() => Schedule, (schedule) => schedule.group)
  schedules: Schedule[];

  @ManyToOne(() => Department, (department) => department.groups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ type: 'number', name: 'department_id' })
  departmentId: number;
}