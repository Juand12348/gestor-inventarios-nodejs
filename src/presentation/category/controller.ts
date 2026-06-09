import { Request, Response } from "express";
import { CreateCategoryDto,  CustomError, UpdateCategoryDto} from "../../domain";
import { CategoryService } from "../services/category.service";


export class CategoryController{

    constructor(private readonly categoryService: CategoryService){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'})
    }

    getAll = (req: Request, res: Response) => {
        
        this.categoryService.getAll()
            .then(categories => res.json(categories))
            .catch(error => this.handleError(error, res));
    
    }

    getById = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.categoryService.getById(id)
            .then(category => res.json(category))
            .catch(error => this.handleError(error, res));
    }

    getByName = (req: Request, res: Response) => {
        const name = req.params.name as string;
        if (!name) return res.status(400).json({ error: 'name is required' });
        this.categoryService.getByName(name)
            .then(category => res.json(category))
            .catch(error => this.handleError(error, res));
    }

    create = (req: Request, res: Response) => {


        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error})

        this.categoryService.create(createCategoryDto!)
            .then(category => res.status(201).json(category))
            .catch(error => this.handleError(error, res));

    }

    update = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        const [error, updateCategoryDto] = UpdateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.categoryService.update(id, updateCategoryDto!)
            .then(category => res.json(category))
            .catch(error => this.handleError(error, res));
    } 

    enable = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.categoryService.able(id)
            .then(category => res.json(category))
            .catch(error => this.handleError(error, res));
    }

    disable = (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ error: 'Id is required' });
        this.categoryService.disable(id)
            .then(category => res.json(category))
            .catch(error => this.handleError(error, res));
    }



}