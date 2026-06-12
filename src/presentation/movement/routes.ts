import { Router } from "express";
import { MovementService } from "../services/movement.service";
import { MovementController } from "./constroller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class MovementRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new MovementService();
        const controller = new MovementController(service);
        const authMiddleware = new AuthMiddleware()


        router.use(authMiddleware.middleware);
        router.get('/', controller.getAll);
        router.get('/product/:productId', controller.getByProductId);
        router.get('/type/:type', controller.getByType);
        router.get('/:id', controller.getById);
        router.post('/', controller.create);


        return router;
    }

}