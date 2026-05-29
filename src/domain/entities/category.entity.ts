import { CustomError } from "../errors/custom.error";

export interface CategoryEntityOptions{

    id: string;
    name: string;
    available: boolean;
    createdAt?: Date;
    updatedAt?: Date;

}

export class CategoryEntity{

    private readonly id: string;
    private name: string;
    private available: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date;

    constructor(options: CategoryEntityOptions){

        const {id, name, available = false ,createdAt, updatedAt} = options;

        if(!id?.trim()){
            throw new Error('Id not valid');
        }


        this.id = id;
        this.name = name;
        this.available = available;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();


    }


    get idValue():string{
        return this.id;
    }

    get nameValue():string{
        return this.name;
    }

    get availableValue():boolean{
        return this.available;
    }

    get createdAtValue():Date{
        return this.createdAt;
    }

    get updatedAtValue():Date{
        return this.updatedAt;
    }

    set nameValue(name: string){
        if(!name?.trim()){
            throw new Error('Name not valid');
        }

        this.name = name;
        this.updatedAt = new Date();
    }

    set availableValue(available: boolean){
        this.available = available;
        this.updatedAt = new Date();
    }


    static fromObject(object: {[key: string]: any;}){
    
        const { id, _id, name, available ,createdAt, updatedAt } = object;
    
        if(!_id && !id){
            throw CustomError.badRequest('Missing id');
        }
    
        if(!name?.trim()) throw CustomError.badRequest('Missing name');
        if(available === undefined) throw CustomError.badRequest('Missing available');
        if(createdAt === undefined) throw CustomError.badRequest('Missing createdAt');
        if(updatedAt === undefined) throw CustomError.badRequest('Missing uodatedAt');
    
        return new CategoryEntity({id:_id || id, name,available, createdAt, updatedAt});
    }   

    


}