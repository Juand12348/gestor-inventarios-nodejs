import { UpdateUserDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class UpdateUserUseCase{

    constructor(
        private readonly repository: UserRepository
    ){}

    async execute(id: string,dto: UpdateUserDto){

        const { name, email, available  } = dto;

        const user = await this.repository.getById(id);
        if(!user) throw CustomError.notFound('User not exists');

        if(name) user.nameValue = name;
        if(email) {
            user.emailValue = email;
            user.emailValidatedValue = false;
            user.availableValue = false;
        }
        if(available !== undefined) user.availableValue = available;

        const updated = await this.repository.update(id,user);
        if(!updated) throw CustomError.internalServer('User not updated, internal server');

        return updated;
    }

}