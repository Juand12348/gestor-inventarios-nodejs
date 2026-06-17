

export class ResetPasswordDto{

    private constructor(public readonly password: string){}

    static create(object:{[key: string]: any}):[string?, ResetPasswordDto?]{

        const { password } = object;

         if (
            password === undefined
        ) {
            return ['No data provided'];
        }

        if(!password?.trim()) return ['Password not valid'];
        if(password.length < 6) return ['Password too short'];

        return [undefined, new ResetPasswordDto(password)];
    }

}