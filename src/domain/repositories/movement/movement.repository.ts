import { CreateMovementDto } from "../../dtos";
import { MovementEntity } from "../../entities/movement.entity";


export abstract class MovementRepository{

    abstract getMovementById(id: string):Promise<MovementEntity | null>;
    abstract getAllMovement():Promise<MovementEntity[] | null>;
    abstract createMovement(createMovementDto: CreateMovementDto):Promise<MovementEntity | null>;

}