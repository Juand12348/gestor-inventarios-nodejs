import { Router } from "express";
import { AuthConstroller } from "./controller";
import { AuthService } from "../services/auth.service";


export class AuthRoutes{

    static get routes(): Router{

        const router = Router();

        const authService = new AuthService();
        const controller = new AuthConstroller(authService);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        router.post('/validate-email', controller.validatedUser);



        return router;
        


    }

}