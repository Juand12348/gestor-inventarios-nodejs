import { Request, Response } from "express";
import {  CreateMovementDto,  CustomError, MovementType,} from "../../domain";
import { MovementService } from "../services/movement.service";


export class MovementController{

    constructor(private readonly movementService: MovementService){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'})
    }

    getAll = (req: Request, res: Response) => {
        
        this.movementService.getAll()
            .then(movements => res.json(movements))
            .catch(error => this.handleError(error, res));
    
    }

    getById = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.movementService.getById(id)
            .then(movement => res.json(movement))
            .catch(error => this.handleError(error, res));
    }

    
    create = (req: Request, res: Response) => {


        const [error, createMovementDto] = CreateMovementDto.create(req.body);
        if(error) return res.status(400).json({error})

        this.movementService.create(createMovementDto!)
            .then(movement => res.status(201).json(movement))
            .catch(error => this.handleError(error, res));

    }

    

    getByProductId = (req: Request, res: Response) =>{

        const productId = req.params.id as string;
        if(!productId) return res.status(400).json({error: 'Product id is required'});

        this.movementService.getByProductId(productId)
            .then((movements) => res.json(movements))
            .catch(error => this.handleError(error, res));

    } 

    getByType = (req: Request, res: Response) =>{

        const type = req.params.type as string;
        if(!type) return res.status(400).json({error: 'Type is required'});

        const validTypes = Object.values(MovementType);
        if (!validTypes.includes(type as MovementType)) {
            return res.status(400).json({ 
            error: `Type invalid. Valid types: ${validTypes.join(', ')}` 
        });
        }

        this.movementService.getByType(type as MovementType)
            .then((movements) => res.json(movements))
            .catch(error => this.handleError(error, res));

    } 



}