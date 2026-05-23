import { UserEntity } from "./user.entity";

export interface CategoryEntityOptions{

    id: string;
    name: string;
    available: boolean;
    user: UserEntity;
    createdAt?: Date;
    updatedAt?: Date;

}

export class CategoryEntity{

    private readonly id: string;
    private name: string;
    private available: boolean;
    private readonly user: UserEntity;
    private readonly createdAt: Date;
    private updatedAt: Date;

    constructor(options: CategoryEntityOptions){

        const {id, name, available = false ,  user,createdAt, updatedAt} = options;

        if(!id?.trim()){
            throw new Error('Id not valid');
        }


        this.id = id;
        this.name = name;
        this.available = available;
        this.user = user;
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

    get userValue():UserEntity{
        return this.user;
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

    


}