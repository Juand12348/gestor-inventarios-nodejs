import { CustomError } from "../errors/custom.error";

export enum UserRole{
    ADMIN, EMPLOYED
}


export interface UserOptions{

    id:string;
    name: string;
    email: string;
    emailValidated: boolean;
    password: string;
    role: UserRole;
    available: boolean;

}

export class UserEntity{

    private readonly id:string;
    private name!: string;
    private email!: string;
    private emailValidated!: boolean;
    private password!: string;
    private role!: UserRole;
    private available: boolean;

    private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    constructor(options: UserOptions) {

        const { id, name, email, emailValidated, password, role, available } = options;

        if(!id?.trim()){
        throw new Error('Id not valid');
        }

        this.id = id;

        this.nameValue = name;
        this.emailValue = email;
        this.emailValidatedValue = emailValidated;
        this.passwordValue = password;
        this.roleValue = role;
        this.available = available;
    }

    get idValue():string{
        return this.id;
    }

    get nameValue():string{
        return this.name;
    }

    get emailValue():string{
        return this.email;
    }

    get emailValidatedValue():boolean{
        return this.emailValidated;
    }

    get passwordValue():string{
        return this.password;
    }

    get roleValue():UserRole{
        return this.role;
    }

    get availableValue():boolean{
        return this.available;
    }

    set nameValue(name: string){
        if(!name?.trim()){
             throw new Error('Name not valid');
        }

        this.name = name;
    }

    set emailValue(email: string){
        if(!email?.trim()){
             throw new Error('Email not valid');
        }

        if(!UserEntity.EMAIL_REGEX.test(email)){
             throw new Error('Email not valid');
        }

        this.email = email;

    }

    set emailValidatedValue(emailValidated: boolean){
        this.emailValidated = emailValidated;
    }

    set passwordValue(password: string){
        if(!password?.trim()){
             throw new Error('Password not valid');
        }

        if(password.length < 6 ){
             throw new Error('Password too short');
        }

        this.password = password;
    }


    set roleValue(role : UserRole){
        if(role !== UserRole.ADMIN && role !== UserRole.EMPLOYED){
             throw new Error('Role invalid');
        }
        this.role = role;
    }

    set availableValue(available: boolean){
        if(typeof available !== 'boolean'){
            throw new Error('Available invalid');
        }

        this.available = available;

    }

    static fromObject(object: {[key: string]: any;}){
    
            const { id, _id, name, email, emailValidated, password, role, available } = object;
    
            if(!_id && !id){
                throw CustomError.badRequest('Missing id');
            }
    
            if(!name?.trim()) throw CustomError.badRequest('Missing name');
            if(!email) throw CustomError.badRequest('Missing email');
            if(emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');
            if(!password) throw CustomError.badRequest('Missing password');
            if(role === undefined) throw CustomError.badRequest('Missing role');
            if(available === undefined) throw CustomError.badRequest('Missing available')
    
            return new UserEntity({id:_id || id, name, email, emailValidated, password, role ,available});
    }

}
