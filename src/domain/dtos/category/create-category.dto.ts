import { UserEntity } from "../../entities/user.entity";



export class CreateCategoryDto{


    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly userId: string,
    ){}

    static create(object:{[key:string]: any}): [string?, CreateCategoryDto? ]{

        const { name, available, userId } = object;
        let availableBoolean = available;

        if(name === undefined && available === undefined && userId === undefined){
            return ['No date provider'];
        }

        if(!(typeof name === 'string') && !name?.trim()) return ['Missing name'];
        if(!(typeof userId === 'string') || !userId.trim()) return ['Missing userId']
        if(typeof available !== 'boolean'){
            if (available === 'true') {
                availableBoolean = true;

            } else if (available === 'false') {
                availableBoolean = false;

            } else {
                return ['Available must be boolean'];
            }
        }


        return [undefined, new CreateCategoryDto(name, availableBoolean, userId)];



    }

}