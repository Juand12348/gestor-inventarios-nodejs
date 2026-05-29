import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

export enum UserRoleModel {
    ADMIN = 'ADMIN',
    EMPLOYED = 'EMPLOYED'
}

@Entity('users')
export class UserModel {

    @PrimaryColumn('uuid')
    id!: string;

    @Column('text')
    name!: string;

    @Column('text', {
        unique: true
    })
    email!: string;

    @Column('boolean', {
        default: false
    })
    emailValidated!: boolean;

    @Column('text')
    password!: string;

    @Column({
        type: 'enum',
        enum: UserRoleModel,
        default: UserRoleModel.EMPLOYED
    })
    role!: UserRoleModel;

    @Column('boolean', {
        default: true
    })
    available!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}