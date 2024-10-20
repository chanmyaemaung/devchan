import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/domain/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '@/common/dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    const { limit, offset } = paginationDto;

    return await this.usersRepository.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.USER,
      relations: {
        projects: true,
      },
      order: {
        registryDates: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        projects: true,
      },
      withDeleted: true,
    });
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException('User does not exist');
    return this.usersRepository.save(user);
  }

  async remove(id: number, soft: boolean): Promise<User> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User does not exist');

    return soft
      ? this.usersRepository.softRemove(user)
      : this.usersRepository.remove(user);
  }

  async recover(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        projects: true,
      },
      withDeleted: true,
    });

    if (!user) throw new NotFoundException('User does not exist');
    if (!user.isDeleted) throw new ConflictException('User not deleted');

    return this.usersRepository.recover(user);
  }
}
