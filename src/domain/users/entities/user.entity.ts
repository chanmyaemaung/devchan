import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../blogs/entities/comment.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe', maxLength: 100 })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ required: false, nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ default: true })
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ApiProperty({ required: false, nullable: true })
  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date;

  @ApiProperty({ required: false, nullable: true })
  @Column({ name: 'last_login_ip', nullable: true })
  lastLoginIp: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ name: 'user_agent', nullable: true })
  userAgent: string;

  @Exclude()
  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
