import { MovementDatasource, MovementEntity, MovementRepository, MovementType } from "../../../domain";


export class MovementRepositoryImpl implements MovementRepository{
    
    constructor(private readonly datasource: MovementDatasource){}
    
    getById(id: string): Promise<MovementEntity | null> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<MovementEntity[]> {
        return this.datasource.getAll();
    }
    getByProductId(productId: string): Promise<MovementEntity[]> {
        return this.datasource.getByProductId(productId);
    }
    getByType(type: MovementType): Promise<MovementEntity[]> {
        return this.datasource.getByType(type);
    }
    create(movement: MovementEntity): Promise<MovementEntity | null> {
        return this.datasource.create(movement);
    }

}