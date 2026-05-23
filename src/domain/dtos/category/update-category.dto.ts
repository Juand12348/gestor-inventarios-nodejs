import { UserEntity } from "../../entities/user.entity";



export class UpdateCategoryDto{


    private constructor(
        public readonly name?: string,
        public readonly available?: boolean,
        public readonly user?: UserEntity,
    ){}

    static create(object:{[key:string]: any}): [string?, UpdateCategoryDto? ]{

        const { name, available, user } = object;
        let availableBoolean = available;


         if (
            name === undefined &&
            available === undefined &&
            user === undefined
        ) {
            return ['No data provided'];
        }

        if(name !== undefined){
            if(!name?.trim()) return ['Name invalid']; 
        }

        if(available !== undefined){
            if(typeof available !== 'boolean'){

                if(available === 'true'){
                    availableBoolean = true;
                }else if(available === 'false'){
                    availableBoolean = false;
                }else{
                    return ['Available invalid'];
                }


            }
        }

        if(user !== undefined){
            if(!(user instanceof UserEntity)){
                return ['User invalid'];
            }
        }


        return [undefined, new UpdateCategoryDto(name, availableBoolean, user)];



    }

}