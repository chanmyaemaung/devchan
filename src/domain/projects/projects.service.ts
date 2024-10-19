import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@/domain/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '@/common/dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils';
import { User } from '@/domain/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    /**
     * Injecting Project Repository
     */
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    /**
     * Injecting User Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { userId, ...projectData } = createProjectDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const project = this.projectsRepository.create({
      ...projectData,
      user: user,
    });

    return await this.projectsRepository.save(project);
  }

  async findAll(paginationDto: PaginationDto): Promise<Project[]> {
    const { limit, offset } = paginationDto;

    return await this.projectsRepository.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.PROJECT,
      relations: {
        user: true,
      },
      order: {
        registryDates: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!project) throw new NotFoundException('Project does not exist');

    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsRepository.preload({
      id: id,
      ...updateProjectDto,
    });

    if (!project) throw new NotFoundException('Project does not exist');

    return await this.projectsRepository.save(project);
  }

  async remove(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) throw new NotFoundException('Project does not exist');

    return await this.projectsRepository.remove(project);
  }
}
