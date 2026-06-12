import { envs } from "../../config";
import { AppDataSource } from "../../data/data-source";
import { UserModel } from "../../data/models/user.model";
import {  AbleUserUseCase, CustomError, DisableUserUseCase, GetUserEmailUseCase, GetUserIdUseCase, UpdateProductDto, UpdateUserDto, UpdateUserUseCase, validateEmailUseCase } from "../../domain";
import { GenerateTokenUseCase } from "../../domain/use-cases/auth/token/generate-token.use-case";
import { ValidateTokenUseCase } from "../../domain/use-cases/auth/token/validate-token.use-case";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { EmailService } from "./email.service";



export class UserService{

    constructor(private readonly emailService:EmailService){}

    private readonly userDatasource = new UserDatasourceImpl(
            AppDataSource.getRepository(UserModel)
    );
    private readonly userRepository = new UserRepositoryImpl(this.userDatasource);
    

    


    async getById(id: string){
        const user = new GetUserIdUseCase(this.userRepository);
        return await user.execute(id);
    }

    async getByEmail(name: string){
        const user = new GetUserEmailUseCase(this.userRepository);
        return await user.execute(name);
    }

    

    async update(id: string, dto: UpdateUserDto){

        const {email} = dto;

        if(email){
            await this.sendEmialValidation(email);
        }

        const update = new UpdateUserUseCase(this.userRepository);
        return await update.execute(id,dto)
    }

    async able(id: string){
        const enable = new AbleUserUseCase(this.userRepository);
        return await enable.execute(id);
    }
    
    async disable(id: string){
        const disable = new DisableUserUseCase(this.userRepository);
        return await disable.execute(id);
    }


    async validateEmail(token: string){
    
            const payload = await new ValidateTokenUseCase().execute(token);
            if(!payload) throw CustomError.unauthorized('Invalid token');
    
            const {email} = payload as {email: string};
            if(!email) throw CustomError.internalServer('Email not in token');
    
            const user = await new validateEmailUseCase(this.userRepository).execute(email);
    
            return user;
    
        }
    
        private async sendEmialValidation(email: string){
            console.log('Sending email to: ' + email);
            const token = await new GenerateTokenUseCase().execute({email: email});
            if(!token) throw CustomError.internalServer('Error generating token');
            console.log('Token generated: ' + token);

            const link = `${envs.WEBSERVICE_URL}auth/validate-email/${token}`;
    
            const html = `
                <h1>Validate your email</h1>
                <p>Click on the following link to validate your email</p>
                <a href="${link}">Validate your email</a>
            `;
    
            const options = {
                to: email, 
                subject: 'Validate your email',
                htmlBody: html,
            };
    
            const isSent = await this.emailService.sendEmail(options);
            if(!isSent) throw CustomError.internalServer('Error sending email');
            console.log('isSent: ', isSent);
            return true;
        }



}