import { regularExps } from "../../../config/plugins/regular-expresions";


export class LoginUserDto {

    constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static create(object: {[key: string]: any}):[string?, LoginUserDto?]{

        const {email, password} = object;

        if(!email?.trim()) return ['Email not valid'];
        if(!regularExps.email.test(password)) return ['Email not valid'];
        if(!password?.trim()) return ['Password not valid'];
    
        return [undefined, new LoginUserDto(email, password)];


    }


}