import { getUUID } from "../../../config";
import { CreateCategoryDto } from "../../dtos";
import { CategoryEntity } from "../../entities/category.entity";
import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories";


export class CreateCategoryUseCase{

    constructor(
        private readonly repository: CategoryRepository
    ){
    }

    async execute(dto: CreateCategoryDto){

        const { name, available  } = dto;

        const categoryExists = await this.repository.getByName(name);
        if(categoryExists) throw CustomError.badRequest('Category already exists');

        const id = getUUID();
        const category = new CategoryEntity({id, name, available});

        const created = await this.repository.create(category);

        return created;


    }


}