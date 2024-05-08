import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity
} from 'typeorm';
import { Task } from './task';
import { User } from './user';

@Entity()
export class Project extends BaseEntity {
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

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
