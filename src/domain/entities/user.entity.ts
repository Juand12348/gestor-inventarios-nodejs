
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

}

export class UserEntity{

    private readonly id:string;
    private name!: string;
    private email!: string;
    private emailValidated!: boolean;
    private password!: string;
    private role!: UserRole;

    private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    constructor(options: UserOptions) {

        const { id, name, email, emailValidated, password, role } = options;

        if(!id?.trim()){
        throw new Error('Id not valid');
        }

        this.id = id;

        this.nameValue = name;
        this.emailValue = email;
        this.emailValidatedValue = emailValidated;
        this.passwordValue = password;
        this.roleValue = role;
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
}
