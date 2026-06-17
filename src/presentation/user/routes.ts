import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
import { envs } from "../../config";
import { EmailService } from "../services/email.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class UserRoutes{

    static get routes(): Router{

        const router = Router();
        const emailService = new EmailService(
                    envs.MAILER_SERVICE,
                    envs.MAILER_EMAIL,
                    envs.MAILER_SECRET_KEY,
                    envs.SEND_EMAIL
        );
        const service = new UserService(emailService);
        const controller = new UserController(service);
        const authMiddleware = new AuthMiddleware();

        router.get('/email/:email', controller.getByEmail);
        router.get('/:id', controller.getById);
        router.put('/', authMiddleware.middleware,controller.update);
        router.put('/reset-password/:token', controller.resetPassword);
        router.post('/forgot-password', controller.forgotPassword);
        router.patch('/:id/enable', controller.enable);
        router.patch('/:id/disable', controller.disable);


        return router;
    }

}