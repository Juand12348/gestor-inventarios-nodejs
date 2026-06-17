import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { UserModel } from './models/user.model';
import { ProductModel } from './models/product.model';
import { CategoryModel } from './models/category.model';
import { MovementModel } from './models/movement.model';
import { envs } from '../config';


export const AppDataSource = new DataSource({
    type: "postgres",
    url: envs.DATABASE_URL,
    ssl: true,
    synchronize: false,
    logging: true,
    entities: [
        UserModel,
        ProductModel,
        CategoryModel,
        MovementModel
    ],
    subscribers: [],
    migrations: ['src/data/migrations/*.ts'],
})

