import { Injectable, NotFoundException } from '@nestjs/common';
import { NavigationRepository } from '@modules/navigation/infrastructure/repositories/navigation.repository';
import {
  CreateNavigationMenuDto,
  UpdateNavigationMenuDto,
} from '@modules/navigation/domain/dtos/navigation.dto';
import {
  NavigationMenu,
  NavigationType,
} from '@modules/navigation/domain/entities/navigation.entity';

@Injectable()
export class NavigationService {
  constructor(private readonly navigationRepository: NavigationRepository) {}

  async create(createDto: CreateNavigationMenuDto): Promise<NavigationMenu> {
    return this.navigationRepository.create(createDto);
  }

  async findAll(): Promise<NavigationMenu[]> {
    return this.navigationRepository.findAll();
  }

  async findById(id: string): Promise<NavigationMenu> {
    const menu = await this.navigationRepository.findById(id);
    if (!menu) {
      throw new NotFoundException('Navigation menu not found');
    }
    return menu;
  }

  async update(
    id: string,
    updateDto: UpdateNavigationMenuDto,
  ): Promise<NavigationMenu> {
    await this.findById(id);
    return this.navigationRepository.update(id, updateDto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.navigationRepository.delete(id);
  }

  async findByType(type: NavigationType): Promise<NavigationMenu[]> {
    return this.navigationRepository.findByType(type);
  }
}
