import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services/category.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class CategoryRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new CategoryService();
        const controller = new CategoryController(service);
        const authMiddleware = new AuthMiddleware();


        router.use(authMiddleware.middleware);
        router.get('/', controller.getAll);
        router.get('/name/:name', controller.getByName);
        router.get('/:id', controller.getById);
        router.post('/', controller.create);
        router.put('/:id', controller.update);
        router.patch('/:id/enable', controller.enable);
        router.patch('/:id/disable', controller.disable);


        return router;
    }

}