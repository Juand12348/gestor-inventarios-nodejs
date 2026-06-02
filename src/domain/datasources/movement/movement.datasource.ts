import { MovementEntity, MovementType } from "../../entities/movement.entity";


export abstract class MovementDatasource{

    abstract getById(id: string):Promise<MovementEntity | null>;
    abstract getAll():Promise<MovementEntity[]>;
    abstract getByProductId(productId: string): Promise<MovementEntity[]>;
    abstract getByType(type: MovementType):Promise<MovementEntity[]>;
    abstract create(movement: MovementEntity):Promise<MovementEntity | null>;

}