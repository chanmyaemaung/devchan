import { DataSource } from 'typeorm';
import { seedBlogs } from './blog.seed';
import { seedComments } from './comment.seed';
import { seedUsers } from './user.seed';

const runSeeds = async (dataSource: DataSource) => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear tables in reverse order of dependencies
    await dataSource.query('TRUNCATE TABLE comments CASCADE');
    await dataSource.query('TRUNCATE TABLE blogs CASCADE');
    await dataSource.query('TRUNCATE TABLE users CASCADE');

    // Seed tables in order
    await seedUsers(dataSource);
    await seedBlogs(dataSource);
    await seedComments(dataSource);

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
