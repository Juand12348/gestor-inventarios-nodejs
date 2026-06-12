import { Repository } from "typeorm";
import { MovementModel } from "../../../data/models/movement.model";
import { CustomError, MovementDatasource, MovementEntity, MovementType } from "../../../domain";



export class MovementDatasourceImpl implements MovementDatasource{
    
    constructor(private readonly repository: Repository<MovementModel>){}

    async getById(id: string): Promise<MovementEntity | null> {
        const movement = await this.repository.findOne({
            where: {id},
            relations: {
                product: true,
                user: true
            }
        });

        if(!movement) return null;

        return MovementEntity.fromObject(movement);
    }

    async getAll(): Promise<MovementEntity[]> {
    const movements = await this.repository.find({
        relations: {
            product: true,
            user: true,
        }
    });

    return movements.map(movement => MovementEntity.fromObject(movement));
}

    async getByProductId(productId: string): Promise<MovementEntity[]> {

    const movements = await this.repository.find({
        where: {
            product: {
                id: productId
            }
        },
        order: {
            date: 'DESC'
        },
        relations:{
            product: true,
            user: true
        }
    });

    return movements.map(
        movement => MovementEntity.fromObject(movement)
    );
    }
    async getByType(type: MovementType): Promise<MovementEntity[]> {
        const movements = await this.repository.find({
            where: {
                type: type
            },
            relations: {
                product: true,
                user: true
            }
        });

        return movements.map(movement => MovementEntity.fromObject(movement));
    }

    
async create(movement: MovementEntity): Promise<MovementEntity> {

    const model = this.repository.create({
        id: movement.idValue,
        product: {
            id: movement.productIdValue
        } as any,
        user: {
            id: movement.userIdValue
        } as any,
        quantity: movement.quantityValue,
        type: movement.typeValue
    });

    const saved = await this.repository.save(model);

    const created = await this.getById(saved.id);
    if(!created) throw CustomError.internalServer('Error creating movement');

    return created;
}



}