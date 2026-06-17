import { regularExps } from "../../../config/plugins/regular-expresions";






export class ForgotPasswordDto{

    private constructor(
        public readonly email: string,
    ){}

    static create(object:{[key: string]:any}):[string?,ForgotPasswordDto?]{

        const {email} = object;

        if (
            email === undefined
        ) {
            return ['No data provided'];
        }

        if(!email?.trim()) return ['Email not valid'];
        if(!regularExps.email.test(email)) return ['Email not valid'];


        return [undefined, new ForgotPasswordDto(email)];

    }

}