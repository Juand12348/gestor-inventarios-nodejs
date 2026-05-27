import { MovementEntity } from "../../entities/movement.entity";


export abstract class MovementRepository{

    abstract getById(id: string):Promise<MovementEntity | null>;
    abstract getAll():Promise<MovementEntity[]>;
    abstract create(movement: MovementEntity):Promise<MovementEntity | null>;

}