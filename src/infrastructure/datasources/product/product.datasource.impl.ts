import { ProductModel } from "../../../data/models/product.model";
import {
    ProductDatasource,
    ProductEntity,
} from "../../../domain";

import {Repository } from 'typeorm';

export class ProductDatasourceImpl implements ProductDatasource {

    // private readonly repository =
    //     AppDataSource.getRepository(ProductModel);

    constructor(private readonly repository: Repository<ProductModel>){}

    async getById(id: string): Promise<ProductEntity | null> {

        const product = await this.repository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });

        if (!product) {
            return null;
        }

        return ProductEntity.fromObject(product);
    }

    async getAll(): Promise<ProductEntity[]> {

        const products = await this.repository.find({
            relations: {
                category: true,
            },
        });

        return products.map(product =>
            ProductEntity.fromObject(product)
        );
    }

    async getName(name: string): Promise<ProductEntity | null> {

        const product = await this.repository.findOne({
            where: { name },
            relations: {
                category: true,
            },
        });

        if (!product) {
            return null
        }

        return ProductEntity.fromObject(product);
    }

    async create(product: ProductEntity): Promise<ProductEntity> {

        const model = this.repository.create({
            id: product.idValue,
            name: product.nameValue,
            description: product.descriptionValue,
            price: product.priceValue,
            stock: product.stockValue,
            available: product.availableValue,
            category: {
                id: product.categoryIdValue,
            } as any,
        });

        const saved = await this.repository.save(model);

        return ProductEntity.fromObject(saved);
    }

    async update(
        id: string,
        product: ProductEntity
    ): Promise<ProductEntity | null> {

        const model = await this.repository.findOne({
            where: { id },
        });

        if (!model) {
            return null;
        }

        model.name = product.nameValue;
        model.description = product.descriptionValue;
        model.price = product.priceValue;
        model.stock = product.stockValue;
        model.available = product.availableValue;

        model.category = {
            id: product.categoryIdValue,
        } as any;

        const updated = await this.repository.save(model);

        return ProductEntity.fromObject(updated);
    }
}