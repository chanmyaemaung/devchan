import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '@/common/embedded';
import { Project } from '@/domain/projects/entities/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Project, (project) => project.user, {
    cascade: ['soft-remove', 'recover'],
  })
  projects: Project[];

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }
}
