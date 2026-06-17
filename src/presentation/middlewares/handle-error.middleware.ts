import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain";


export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof CustomError){
        return res.status(err.statusCode).json({err: err.message});

    }

    return res.status(500).json({error: 'Internal server error'});


}