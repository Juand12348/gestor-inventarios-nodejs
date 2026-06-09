import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../errors/custom.error";


export class GenerateTokenUseCase{

    constructor(){}

    async execute(id: string){

        const token = await JwtAdapter.generateToken(id);
        if(!token) throw CustomError.internalServer('Error generation token');

        return token;

    }


}