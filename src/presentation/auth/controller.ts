import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";



export class AuthController{

    constructor(private readonly authService: AuthService){}

    private handleError = (error: unknown, res: Response) => {
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
            }
    
            return res.status(500).json({error: 'Internal server error'})
    }


    loginUser = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authService.loginUser(loginDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authService.registerUser(registerDto!)
        .then(user => res.status(201).json(user))
        .catch(error => this.handleError(error, res));
    }

    validatedUser = (req: Request, res: Response) => {

        const token = req.params.token as string;
        if(!token) return res.status(400).json({error: 'Missing token'});

        this.authService.validateEmail(token)
        .then(validate => res.json(validate))
        .catch(error => this.handleError(error, res));
        
    }



}