
export interface CategoryIdEntityOptions{

    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;

}

export class CategoryIdEntity{

    private readonly id: string;
    private name: string;
    private readonly createdAt: Date;
    private updatedAt: Date;

    constructor(options: CategoryIdEntityOptions){

        const {id, name, createdAt, updatedAt} = options;

        if(!id?.trim()){
            throw new Error('Id not valid');
        }

        if(!name?.trim()){
            throw new Error('Name not valid');
        }


        if(createdAt && !(createdAt instanceof Date)){
            throw new Error('CreatedAt not valid');
        }

        if(updatedAt && !(updatedAt instanceof Date)){
            throw new Error('UpdatedAt not valid');
        }


        this.id = id;
        this.name = name;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();


    }


    get idValue():string{
        return this.id;
    }

    get nameValue():string{
        return this.name;
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
    }

    set updatededAtValue(updatedAt: Date){
        if(updatedAt && !(updatedAt instanceof Date)){
            throw new Error('CreatedAt not valid');
        }

        this.updatedAt = updatedAt;
    }


}