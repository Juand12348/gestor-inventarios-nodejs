import { envs } from './config';
import { AppDataSource } from './data/data-source';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main() {

    try {

        await AppDataSource.initialize();

        console.log('Database connected');

        const server = new Server({
            port: envs.PORT,
            routes: AppRoutes.routes
        });

        server.start();

    } catch (error) {

        console.error('Database connection error');
        console.error(error);

        process.exit(1);

    }

}