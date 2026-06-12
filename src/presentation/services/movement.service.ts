import { AppDataSource } from "../../data/data-source";
import { MovementModel } from "../../data/models/movement.model";
import { ProductModel } from "../../data/models/product.model";
import { UserModel } from "../../data/models/user.model";
import { CreateMovementDto, CreateMovementUseCase,  GetAllMovementsUseCase, GetMovementIdUseCase, GetMovementProductIdUseCase, GetMovementsTypeUseCase,MovementType,  } from "../../domain";
import {  MovementDatasourceImpl, MovementRepositoryImpl, ProductDatasourceImpl, ProductRepositoryImpl, UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";



export class MovementService{
    private readonly productDatasource = new ProductDatasourceImpl(
            AppDataSource.getRepository(ProductModel)
    );
    private readonly productRepository = new ProductRepositoryImpl(this.productDatasource);
    

    private readonly movementDatasource = new MovementDatasourceImpl(
        AppDataSource.getRepository(MovementModel)
    );
    private readonly movementRepository = new MovementRepositoryImpl(this.movementDatasource);

    private readonly userDatasource = new UserDatasourceImpl(
        AppDataSource.getRepository(UserModel)
    );
    private readonly userRepository = new UserRepositoryImpl(this.userDatasource);

    constructor(){
        
    }

    async getAll(){
        const movements = new GetAllMovementsUseCase(this.movementRepository);
        return await movements.execute();
    }

    async getById(id: string){
        const movement = new GetMovementIdUseCase(this.movementRepository);
        return await movement.execute(id);
    }


    async create(userId: string,dto: CreateMovementDto){
        const create = new CreateMovementUseCase(this.movementRepository, this.productRepository, this.userRepository);
        return await create.execute(userId ,dto);
    }

    async getByProductId(id: string){
        const movements = new GetMovementProductIdUseCase(this.movementRepository, this.productRepository);
        return await  movements.execute(id);
    }

    async getByType(type: MovementType){
        const movements = new GetMovementsTypeUseCase(this.movementRepository);
        return await movements.execute(type);
    }



}