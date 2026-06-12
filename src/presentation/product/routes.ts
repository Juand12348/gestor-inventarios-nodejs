import { Router } from "express";
import { ProductService } from "../services/product.service";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ProductRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new ProductService();
        const controller = new ProductController(service);
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