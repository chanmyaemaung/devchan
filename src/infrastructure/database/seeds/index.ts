import { DataSource } from 'typeorm';
import { userSeed } from './user.seed';

export const runSeeds = async (dataSource: DataSource) => {
  try {
    console.log('Starting database seeding...');

    // Run seeds
    await userSeed(dataSource);

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
};
