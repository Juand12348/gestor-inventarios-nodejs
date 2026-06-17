import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    DB_USERNAME: get('DB_USERNAME').asString(),
    DB_PASSWORD: get('DB_PASSWORD').asString(),
    DB_DATABASE: get('DB_DATABASE').asString(),
    DB_PORT: get('DB_PORT').asPortNumber(),
    DB_HOST: get('DB_HOST').asString(),
    SEND_EMAIL: get('SEND_EMAIL').required().asBool(),
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),

}