import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";



export class AuthConstroller{

    constructor(private readonly authService: AuthService){}


    loginUser = (req: Request, res: Response) => {

        res.json()
    }

    registerUser = (req: Request, res: Response) => {
        res.json()
    }

    validatedUser = (req: Request, res: Response) => {

        res.json()
    }



}