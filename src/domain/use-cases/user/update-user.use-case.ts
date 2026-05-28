import { UpdateUserDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class UpdateUserUseCase{

    constructor(
        private readonly repository: UserRepository
    ){}

    async execute(id: string,dto: UpdateUserDto){

        console.log('Todo: Update user not implemented')

    }

}