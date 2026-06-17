import { envs } from "../../config";
import { AppDataSource } from "../../data/data-source";
import { UserModel } from "../../data/models/user.model";
import {  AbleUserUseCase, CustomError, DisableUserUseCase, GetUserEmailUseCase, GetUserIdUseCase, UpdateProductDto, UpdateUserDto, UpdateUserUseCase, validateEmailUseCase } from "../../domain";
import { ForgotPasswordDto } from "../../domain/dtos/auth/forgot-password.dto";
import { ResetPasswordDto } from "../../domain/dtos/auth/reset-password.dto";
import { ForgotPasswordUseCase } from "../../domain/use-cases/auth/forgot-password.use-case";
import { ResetPasswordUseCase } from "../../domain/use-cases/auth/reset-password.use-case";
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

        async resetPassword(token: string, dto: ResetPasswordDto){
            const payload = await new ValidateTokenUseCase().execute(token);
            if(!payload) throw CustomError.unauthorized('Invalida Token');

            const {email} = payload as {email: string};
            if(!email) throw CustomError.internalServer('Email not in token');
            
            const user = await new ResetPasswordUseCase(this.userRepository).execute(email, dto);

            return user;
        }

        async forgotPassword(dto: ForgotPasswordDto){
            const user = await new ForgotPasswordUseCase(this.userRepository).execute(dto);
            if(user){
                await this.sendEmialResetPassword(user.emailValue);
            }

            const objectUser = {
                id: user.idValue, 
                name: user.nameValue,
                email: user.emailValue,
                emailValidated: user.emailValidatedValue,
                role: user.roleValue,
                available: user.availableValue
            };

            return {
            user: objectUser,
            };

        }
    
        private async sendEmialValidation(email: string){
            const token = await new GenerateTokenUseCase().execute({email: email});
            if(!token) throw CustomError.internalServer('Error generating token');

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
            return true;
        }

        

        private async sendEmialResetPassword(email: string){
            const token = await new GenerateTokenUseCase().execute({email: email}, '15m');
            if(!token) throw CustomError.internalServer('Error generating token');

            const link = `${envs.WEBSERVICE_URL}users/reset-password/${token}`;
    
            const html = `
                <h1>reset your password</h1>
                <p>Click on the following link to reset your password</p>
                <a href="${link}">Validate your email</a>
            `;
    
            const options = {
                to: email, 
                subject: 'reset your password',
                htmlBody: html,
            };
    
            const isSent = await this.emailService.sendEmail(options);
            if(!isSent) throw CustomError.internalServer('Error sending email');
            return true;
        }



}