import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum NavigationType {
  HEADER = 'header',
  FOOTER = 'footer',
}

@Entity('navigation_menus')
export class NavigationMenu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleMM?: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ type: 'int' })
  order: number;

  @Column({
    type: 'enum',
    enum: NavigationType,
    default: NavigationType.HEADER,
  })
  type: NavigationType;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  parentId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
