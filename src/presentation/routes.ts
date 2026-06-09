import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { ProductRoutes } from "./product/routes";
import { CategoryRoutes } from "./category/routes";
import { MovementRoutes } from "./movement/routes";
import { UserRoutes } from "./user/routes";


export class AppRoutes{

    static get routes(): Router{

        const router = Router();

        // router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        router.use('/api/categories', CategoryRoutes.routes);
        router.use('/api/movements', MovementRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/users', UserRoutes.routes);

        return router;
        


    }

}