import { Router } from "express";
import { MovementService } from "../services/movement.service";
import { MovementController } from "./constroller";


export class MovementRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new MovementService();
        const controller = new MovementController(service);

        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.get('/product/:productId', controller.getByProductId);
        router.get('/type/:type', controller.getByType);
        router.post('/', controller.create);


        return router;
    }

}