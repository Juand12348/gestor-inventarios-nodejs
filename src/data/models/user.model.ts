import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../../domain";


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
        enum: UserRole,
        default: UserRole.EMPLOYED
    })
    role!: UserRole;

    @Column('boolean', {
        default: true
    })
    available!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}