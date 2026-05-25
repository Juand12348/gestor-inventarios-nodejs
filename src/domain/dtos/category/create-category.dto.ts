import { UserEntity } from "../../entities/user.entity";



export class CreateCategoryDto{


    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly user: UserEntity,
    ){}

    static create(object:{[key:string]: any}): [string?, CreateCategoryDto? ]{

        const { name, available, user } = object;
        let availableBoolean = available;

        if(name === undefined && available === undefined && user === undefined){
            return ['No date provider'];
        }

        if(!name?.trim()) return ['Missing name'];
        if(!user) return ['Missing user']
        if(!(user instanceof UserEntity)) return ['User Invalid']
        if(typeof available !== 'boolean'){
            if (available === 'true') {
                availableBoolean = true;

            } else if (available === 'false') {
                availableBoolean = false;

            } else {
                return ['Available must be boolean'];
            }
        }


        return [undefined, new CreateCategoryDto(name, availableBoolean, user)];



    }

}