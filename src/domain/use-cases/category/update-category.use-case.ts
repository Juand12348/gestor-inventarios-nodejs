import { UpdateCategoryDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories";


export class UpdateCategoryUseCase{

    constructor(
        private readonly repository: CategoryRepository
    ){}

    async execute(id: string ,dto: UpdateCategoryDto){

        const {  name, available } = dto;

        const category = await this.repository.getById(id);
        if(!category) throw CustomError.notFound('Category not found');

        if(name) category.nameValue = name;
        if(available !== undefined) category.availableValue = available;

        const updated = await this.repository.update(id, category);

        return updated;

    }


}