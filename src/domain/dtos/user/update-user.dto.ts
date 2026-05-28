import { regularExps } from "../../../config/plugins/regular-expresions";


export class UpdateUserDto {

    private constructor(
        public readonly name?: string,
        public readonly email?: string,
        public readonly password?: string,
        public readonly available?: boolean
    ){}

    static create(object: {name?: string, email?: string, password?: string, available?: boolean}):[string?, UpdateUserDto?]{

        const { name, email, password, available} = object;

        if (
            name === undefined &&
            email === undefined &&
            password === undefined &&
            available === undefined
        ) {
            return ['No data provided'];
        }

        if( name !== undefined &&!name?.trim()) return ['Name not valid'];
        
        if(email !== undefined){
            if(!email?.trim()) return ['Email not valid'];
            if(!regularExps.email.test(email)) return ['Email not valid'];
        }

        if(password !== undefined){
            if(!password?.trim()) return ['Password not valid'];
            if(password.length < 6) return ['Password too short'];
        }

        if(available !== undefined && typeof available !== 'boolean'){
            return ['Available invalid'];
        }
        
        return [undefined, new UpdateUserDto(name, email, password, available)];

    }


}