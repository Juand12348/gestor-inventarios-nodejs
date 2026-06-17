import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto, CustomError, UpdateProductDto } from "../../domain";


export class ProductController{

    constructor(private readonly productService: ProductService){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'})
    }

    getAll = (req: Request, res: Response) => {

        this.productService.getAll()
            .then(products => res.json(products))
            .catch(error => this.handleError(error, res));
    
    }

    getById = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.productService.getById(id)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    getByName = (req: Request, res: Response) => {
        const name = req.params.name as string;
        if (!name) return res.status(400).json({ error: 'name is required' });
        this.productService.getByName(name)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    create = (req: Request, res: Response) => {


        const [error, createProductDto] = CreateProductDto.create(req.body);
        if(error) return res.status(400).json({error})

        this.productService.create(createProductDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error, res));

    }

    update = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        const [error, updateProductDto] = UpdateProductDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.productService.update(id, updateProductDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    } 

    enable = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.productService.able(id)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    disable = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.productService.disable(id)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }



}