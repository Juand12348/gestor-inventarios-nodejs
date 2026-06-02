import { AppDataSource } from "../../../data/data-source";
import { MovementModel } from "../../../data/models/movement.model";
import { MovementDatasource, MovementEntity, MovementType } from "../../../domain";



export class MovementDatasourceImpl implements MovementDatasource{
    
    private readonly repository = AppDataSource.getRepository(MovementModel); 

    async getById(id: string): Promise<MovementEntity | null> {
        const movement = await this.repository.findOne({
            where: {id}
        });

        if(!movement) return null;

        return MovementEntity.fromObject(movement);
    }

    async getAll(): Promise<MovementEntity[]> {
        const movements = await this.repository.find();

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
        quantity: movement.quantityValue,
        type: movement.typeValue
    });

    const saved = await this.repository.save(model);

    return MovementEntity.fromObject(saved);
}



}