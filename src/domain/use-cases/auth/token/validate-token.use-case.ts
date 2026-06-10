import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../errors/custom.error";


export class ValidateTokenUseCase{


    constructor(){}

    async execute(token: string){
        const payload = await JwtAdapter.validatedToken(token);
        if(!payload) throw CustomError.unauthorized('Invalid token');

        return payload;
    }

}