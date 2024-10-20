import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '@/domain/users/entities/user.entity';
import { Project } from '@/domain/projects/entities/project.entity';
import { ProjectType } from '@/domain/projects/enums';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepository = queryRunner.manager.getRepository(User);
      const projectRepository = queryRunner.manager.getRepository(Project);

      const users = await this.createFakeUsers(userRepository);
      await this.createFakeProjects(projectRepository, users);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createFakeUsers(userRepository: any): Promise<User[]> {
    const users: User[] = [];

    for (let i = 0; i < 10; i++) {
      const user = new User();
      user.name = faker.person.fullName();
      user.phone = faker.phone.number();
      user.email = faker.internet.email();
      user.password = await bcrypt.hash('password123', 10);
      // We don't need to set registryDates manually, TypeORM will handle it

      users.push(await userRepository.save(user));
    }

    return users;
  }

  private async createFakeProjects(projectRepository: any, users: User[]) {
    for (const user of users) {
      const projectCount = faker.number.int({ min: 1, max: 5 });

      for (let i = 0; i < projectCount; i++) {
        const project = new Project();
        project.title = faker.lorem.words(3);
        project.description = faker.lorem.paragraph();
        project.image = faker.image.url();
        project.url = faker.internet.url();
        project.projectType = faker.helpers.arrayElement(
          Object.values(ProjectType),
        );
        project.user = user;
        // We don't need to set registryDates manually, TypeORM will handle it

        await projectRepository.save(project);
      }
    }
  }
}
