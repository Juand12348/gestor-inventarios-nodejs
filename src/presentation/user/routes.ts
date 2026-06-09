import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";


export class UserRoutes{

    static get routes(): Router{

        const router = Router();
        const service = new UserService();
        const controller = new UserController(service);

        router.get('/:id', controller.getById);
        router.get('/email/:email', controller.getByEmail);
        router.put('/', controller.update);
        router.patch('/:id/enable', controller.enable);
        router.patch('/:id/disable', controller.disable);


        return router;
    }

}