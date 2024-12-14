import { Client } from 'pg';
import { config } from 'dotenv';

config();

async function createDatabase() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    database: 'postgres', // Connect to default postgres database
  });

  try {
    await client.connect();

    // Check if database exists
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.POSTGRES_DB}'`,
    );

    if (res.rows.length === 0) {
      // Create database if it doesn't exist
      await client.query(`CREATE DATABASE ${process.env.POSTGRES_DB}`);
      console.log(`Database ${process.env.POSTGRES_DB} created successfully`);
    } else {
      console.log(`Database ${process.env.POSTGRES_DB} already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

createDatabase();
