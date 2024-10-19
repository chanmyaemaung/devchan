import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '@/common/embedded';
import { ProjectType } from '@/domain/projects/enums';
import { User } from '@/domain/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: ProjectType, default: ProjectType.OTHER })
  projectType: ProjectType;

  @ManyToOne(() => User, (user) => user.projects, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
