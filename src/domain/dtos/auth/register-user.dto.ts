import { regularExps } from "../../../config/plugins/regular-expresions";


export class RegisterUserDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create(object: {[key: string]: any}):[string?, RegisterUserDto?]{

        const { name, email, password } = object;

        if(!name?.trim()) return ['Name not valid'];
        if(!email?.trim()) return ['Email not valid'];
        if(!regularExps.email.test(email)) return ['Email not valid'];
        if(!password?.trim()) return ['Password not valid'];
        if(password.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDto(name, email, password)];

    }


}