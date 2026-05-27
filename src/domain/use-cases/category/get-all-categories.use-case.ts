import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories";



export class GetAllCategoriesUseCase{

    constructor(private readonly repository: CategoryRepository){}


    async execute(){

        const categories = await this.repository.getAll();

        return categories;

    }

}