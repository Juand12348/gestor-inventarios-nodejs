
export enum UserRole{
    ADMIN, EMPLOYED
}

export interface UserOptions{

    id:string;
    name: string;
    email: string;
    password: string;
    role: UserRole;

}

export class UserEntity{

    private readonly id:string;
    private name: string;
    private email: string;
    private password: string;
    private role: UserRole;

    constructor(options: UserOptions) {

        const { id, name, email, password, role } = options;

        if (!id?.trim()) throw new Error('Id not valid');
        if (!name?.trim()) throw new Error('Name not valid');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error('Email not valid');

        if (!password?.trim()) throw new Error('Password not valid');

        if (role !== UserRole.ADMIN && role !== UserRole.EMPLOYED) {
            throw new Error('Role not valid');
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
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

        this.email = email;

    }

    set passwordValue(password: string){
        if(!password?.trim()){
            throw new Error('Password not valid');
        }

        this.password = password;
    }


    set roleValue(role : UserRole){
        if(role !== UserRole.ADMIN && role !== UserRole.EMPLOYED){
            throw new Error('Role not valid');
        }
        this.role = role;
    }
}
