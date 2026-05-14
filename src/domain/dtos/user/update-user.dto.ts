import { regularExps } from "../../../config/plugins/regular-expresions";


export class UpdateUserDto {

    constructor(
        public readonly name?: string,
        public readonly email?: string,
        public readonly password?: string,
    ){}

    static create(object: {[key: string]: any}):[string?, UpdateUserDto?]{

        const { name, email, password } = object;

        if( name &&!name?.trim()) return ['Name not valid'];
        
        if(email){
            if(!email?.trim()) return ['Email not valid'];
            if(!regularExps.email.test(email)) return ['Email not valid'];
        }

        if(password){
            if(!password?.trim()) return ['Password not valid'];
            if(password.length < 6) return ['Password too short'];
        }
        
        return [undefined, new UpdateUserDto(name, email, password)];

    }


}