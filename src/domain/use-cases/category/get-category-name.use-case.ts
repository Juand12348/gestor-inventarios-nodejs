import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories";



export class GetCategoryNameUseCase{

    constructor(private readonly repository: CategoryRepository){}


    async execute(name: string){

        const category = await this.repository.getByName(name);

        if(!category) throw CustomError.notFound(`Category with name ${name} not exists`);

        return category;

    }

}