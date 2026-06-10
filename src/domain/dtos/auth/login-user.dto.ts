import { regularExps } from "../../../config/plugins/regular-expresions";


export class LoginUserDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static create(object: {[key: string]: any}):[string?, LoginUserDto?]{

        const {email, password} = object;

        if (
            email === undefined &&
            password === undefined
        ) {
            return ['No data provided'];
        }

        if(!email?.trim()) return ['Email not valid'];
        if(!regularExps.email.test(email)) return ['Email not valid'];
        if(!password?.trim()) return ['Password not valid'];
    
        return [undefined, new LoginUserDto(email, password)];


    }


}