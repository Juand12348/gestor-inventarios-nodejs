import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories";



export class DisableCategoryUseCase{

    constructor(
        private readonly repository: CategoryRepository
    ){}


    async execute(id: string){

        const category = await this.repository.getById(id);
        if(!category) throw CustomError.notFound('Product not exists');

        if(!category.availableValue) throw CustomError.badRequest('Category already disable');

        category.availableValue = false;

        const disabled = await this.repository.update(id, category);

        return disabled;


    }


}