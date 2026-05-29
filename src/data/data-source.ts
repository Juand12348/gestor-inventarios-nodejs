import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { envs } from '../config';
import { UserModel } from './models/user.model';
import { ProductModel } from './models/product.model';
import { CategoryModel } from './models/category.model';
import { MovementModel } from './models/movement.model';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        UserModel,
        ProductModel,
        CategoryModel,
        MovementModel
    ],
    subscribers: [],
    migrations: [],
})

