import { StringValue } from "ms";
import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../errors/custom.error";


export class GenerateTokenUseCase{

    constructor(){}

    async execute(id: object, duration: StringValue = '2h'){

        const token = await JwtAdapter.generateToken(id, duration);
        if(!token) throw CustomError.internalServer('Error generation token');

        return token;

    }


}