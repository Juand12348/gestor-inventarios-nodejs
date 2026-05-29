import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    DB_USERNAME: get('DB_USERNAME').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
    DB_DATABASE: get('DB_DATABASE').required().asString(),
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').required().asString(),

}