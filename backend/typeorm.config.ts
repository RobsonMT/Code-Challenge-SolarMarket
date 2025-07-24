import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Product } from 'src/product/product.entity';
import { Review } from 'src/review/review.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Review],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
