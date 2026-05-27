import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories";



export class GetCategoryIdUseCase{

    constructor(private readonly repository: CategoryRepository){}


    async execute(id: string){

        const category = await this.repository.getById(id);

        if(!category) throw CustomError.notFound(`Category with id ${id} not exists`);

        return category;

    }

}