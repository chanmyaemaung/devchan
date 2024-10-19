import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '@/common/embedded';

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

  @Column()
  password: string;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
