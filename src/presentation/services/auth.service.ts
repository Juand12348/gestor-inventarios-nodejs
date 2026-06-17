import { envs } from "../../config";
import { AppDataSource } from "../../data/data-source";
import { UserModel } from "../../data/models/user.model";
import { CustomError, LoginUserDto, LoginUserUseCase, RegisterUserDto, RegisterUserUseCase, UserEntity, validateEmailUseCase } from "../../domain";
import { GenerateTokenUseCase } from "../../domain/use-cases/auth/token/generate-token.use-case";
import { ValidateTokenUseCase } from "../../domain/use-cases/auth/token/validate-token.use-case";
import { AuthUserDatasourceImpl, AuthUserRepositoryImpl, UserDatasourceImpl, UserRepositoryImpl, } from "../../infrastructure";
import { EmailService } from "./email.service";



export class AuthService{

    constructor(private readonly emailService: EmailService){}

    private readonly authDatasource = new AuthUserDatasourceImpl(
        AppDataSource.getRepository(UserModel)
    );
    private readonly authRepository = new AuthUserRepositoryImpl(this.authDatasource);

    private readonly userDatasource = new UserDatasourceImpl(
        AppDataSource.getRepository(UserModel)
    );
    private readonly userRepository = new UserRepositoryImpl(this.userDatasource);

    async registerUser(dto: RegisterUserDto) {
        const register = new RegisterUserUseCase(this.authRepository, this.userRepository);
        const user = await register.execute(dto);

        // Valida primero, después TypeScript ya sabe que user no es null
        if (!user) throw CustomError.internalServer('Error creating user');

        const token = await new GenerateTokenUseCase().execute({id: user.idValue});

        await this.sendEmialValidation(user.emailValue);

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
            token
        };
    }

    async loginUser(dto: LoginUserDto){

        const login = new LoginUserUseCase(this.userRepository);
        const user = await login.execute(dto);

        if(!user) throw CustomError.internalServer('Error login user');

        const token = await new GenerateTokenUseCase().execute({id: user.idValue});

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
            token
        };

        


    }

    async validateEmail(token: string){

        const payload = await new ValidateTokenUseCase().execute(token);
        if(!payload) throw CustomError.unauthorized('Invalid token');

        const {email} = payload as {email: string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await new validateEmailUseCase(this.userRepository).execute(email);
        if(!user) throw CustomError.notFound('User not exists');

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

    

}