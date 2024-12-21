import { DataSource } from 'typeorm';
import { seedBlogs } from './blog.seed';
import { seedUsers } from './user.seed';

const runSeeds = async (dataSource: DataSource) => {
  try {
    console.log('🌱 Starting database seeding...');

    await seedUsers(dataSource);
    await seedBlogs(dataSource);

    console.log('✅ Database seeding completed successfully');
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    await dataSource.destroy();
    process.exit(1);
  }
};

export default runSeeds;
