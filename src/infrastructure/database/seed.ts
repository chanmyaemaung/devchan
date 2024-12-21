import { config } from 'dotenv';
import { runSeeds } from './seeds';
import dataSource from './typeorm.config';

config();

const seed = async () => {
  try {
    await dataSource.initialize();
    await runSeeds(dataSource);
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seed();
