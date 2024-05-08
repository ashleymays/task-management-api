import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Project } from './project';
import { User } from './user';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('boolean', { nullable: true })
  isDelayed: boolean | null;

  @Column('date', { nullable: true })
  startedAt: Date | null;

  @Column('date', { nullable: true })
  completedAt: Date | null;

  @Column('date')
  plannedCompletionAt: Date | null;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
