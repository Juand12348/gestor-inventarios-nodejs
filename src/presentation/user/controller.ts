import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto, CustomError, UpdateProductDto, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";


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
        const id = req.params.id as string;
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



}