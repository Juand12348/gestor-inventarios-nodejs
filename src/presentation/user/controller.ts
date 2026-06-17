import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto, CustomError, UpdateProductDto, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";
import { ForgotPasswordDto } from "../../domain/dtos/auth/forgot-password.dto";
import { ResetPasswordDto } from "../../domain/dtos/auth/reset-password.dto";


export class UserController{

    constructor(private readonly userService: UserService){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'})
    }


    getById = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.userService.getById(id)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    getByEmail = (req: Request, res: Response) => {
        const email = req.params.name as string;
        if (!email) return res.status(400).json({ error: 'email is required' });
        this.userService.getByEmail(email)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }


    update = (req: Request, res: Response) => {
        const id = (req as any).user.id;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        const [error, updateUserDto] = UpdateUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.userService.update(id, updateUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    } 

    enable = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.userService.able(id)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    disable = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.userService.disable(id)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    forgotPassword = ( req: Request, res: Response) => {
        const [error, forgotPasswordDto] = ForgotPasswordDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.userService.forgotPassword(forgotPasswordDto!)
        .then(user => res.json(user))
        .catch(error => this.handleError(error, res));

    }

    resetPassword = (req: Request, res: Response) => {
        const token = req.params.token as string;
        const [error, resetPasswordDto] = ResetPasswordDto.create(req.body); 
        if(error) return res.status(400).json(error);

        this.userService.resetPassword(token, resetPasswordDto!)
        .then((user) => res.json(user))
        .catch(error => this.handleError(error, res));

    }



}