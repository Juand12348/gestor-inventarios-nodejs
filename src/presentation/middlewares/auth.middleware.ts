import { NextFunction, Request, Response } from "express";
import { ValidateTokenUseCase } from "../../domain/use-cases/auth/token/validate-token.use-case";
import { CustomError } from "../../domain";


export class AuthMiddleware{

    constructor(){}

    private handleError = (error: unknown, res: Response) => {
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
            }
    
            return res.status(500).json({error: 'Internal server error'})
    }

    middleware = (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.headers['authorization'];

        if(!authorization) return res.status(401).json({error: 'No token provided'});

        const token = authorization.split(' ')[1];
        if(token.length === 0) return res.status(401).json({error: 'No token provider'});
        
        new ValidateTokenUseCase().execute(token)
            .then((payload) => {
                (req as any).user = payload;
                next()
            })
            .catch(error => this.handleError(error, res));



    }


}