import { regularExps } from "../../../config/plugins/regular-expresions";


export class UpdateUserDto {

    private constructor(
        public readonly name?: string,
        public readonly email?: string,
        public readonly available?: boolean
    ){}

    static create(object: {name?: string, email?: string, available?: boolean}):[string?, UpdateUserDto?]{

        const { name, email, available} = object;
        if (
            name === undefined &&
            email === undefined &&
            available === undefined
        ) {
            return ['No data provided'];
        }
        console.log('passed name validation');

        if( name !== undefined &&!name?.trim()) return ['Name not valid'];
        
        if(email !== undefined){
            if(!email?.trim()) return ['Email not valid'];
            if(!regularExps.email.test(email)) return ['Email not valid'];
        }

        

        if(available !== undefined && typeof available !== 'boolean'){
            return ['Available invalid'];
        }

        
        return [undefined, new UpdateUserDto(name, email, available)];

    }


}