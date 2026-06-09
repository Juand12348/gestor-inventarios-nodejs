import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services/category.service";


export class CategoryRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new CategoryService();
        const controller = new CategoryController(service);

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