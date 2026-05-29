import { AppDataSource } from './data/data-source';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main() {

    try {

        await AppDataSource.initialize();

        console.log('Database connected');

        const server = new Server();

        server.start();

    } catch (error) {

        console.error('Database connection error');
        console.error(error);

        process.exit(1);

    }

}