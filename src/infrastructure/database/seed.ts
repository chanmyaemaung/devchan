import { DataSource } from 'typeorm';
import runSeeds from './seeds';
import AppDataSource from './typeorm.config';

const seed = async () => {
  let dataSource: DataSource;

  try {
    dataSource = await AppDataSource.initialize();
    await runSeeds(dataSource);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seed();
