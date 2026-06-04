import { Router } from "express";
import { ProductService } from "../services/product.service";
import { ProductController } from "./controller";


export class ProductRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new ProductService();
        const controller = new ProductController(service);

        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.get('/name/:name', controller.getByName);
        router.post('/', controller.create);
        router.put('/', controller.update);
        router.patch('/:id/enable', controller.enable);
        router.patch('/:id/disable', controller.disable);


        return router;
    }

}