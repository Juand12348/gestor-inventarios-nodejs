import { AppDataSource } from "../../../data/data-source";
import { CategoryModel } from "../../../data/models/category.model";
import { CategoryDatasource, CategoryEntity} from "../../../domain";


export class CategoryDatasourceImpl implements CategoryDatasource{
    private readonly repository = AppDataSource.getRepository(CategoryModel);
    
    async getById(id: string): Promise<CategoryEntity | null> {
        const category = await this.repository.findOne({
            where: {id}
        });

        if(!category) return null;

        return CategoryEntity.fromObject(category);
    }

    async getAll(): Promise<CategoryEntity[]> {
        const categories = await this.repository.find();

        return categories.map(category => CategoryEntity.fromObject(category));
    }

    async getByName(name: string): Promise<CategoryEntity | null> {
        const category = await this.repository.findOne({
            where: {name}
        });

        if(!category) return null;

        return CategoryEntity.fromObject(category);
    }
    
    async create(category: CategoryEntity): Promise<CategoryEntity> {
        const model = await this.repository.create({
            id: category.idValue,
            name: category.nameValue,
            available: category.availableValue
        });

        const created = await this.repository.save(model);

        return CategoryEntity.fromObject(created);
    }

    async update(id: string, category: CategoryEntity): Promise<CategoryEntity | null> {
        const model = await this.repository.findOne({
            where: {id}
        });

        if(!model) return null;

        model.name = category.nameValue;
        model.available = category.availableValue;

        const updated = await this.repository.save(model);

        return CategoryEntity.fromObject(updated);
    }

}