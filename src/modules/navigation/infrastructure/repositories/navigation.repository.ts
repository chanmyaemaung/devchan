import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NavigationMenu,
  NavigationType,
} from '@modules/navigation/domain/entities/navigation.entity';

@Injectable()
export class NavigationRepository {
  constructor(
    @InjectRepository(NavigationMenu)
    private readonly repository: Repository<NavigationMenu>,
  ) {}

  async create(menu: Partial<NavigationMenu>): Promise<NavigationMenu> {
    const newMenu = this.repository.create(menu);
    return this.repository.save(newMenu);
  }

  async findAll(): Promise<NavigationMenu[]> {
    return this.repository.find({
      order: {
        order: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<NavigationMenu> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: string,
    menu: Partial<NavigationMenu>,
  ): Promise<NavigationMenu> {
    await this.repository.update(id, menu);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByType(type: NavigationType): Promise<NavigationMenu[]> {
    return this.repository.find({
      where: { type, isActive: true },
      order: { order: 'ASC' },
    });
  }
}
