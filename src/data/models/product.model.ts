import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

@Entity('products')
export class ProductModel {

    @PrimaryColumn('uuid')
    id!: string;

    @Column('text')
    name!: string;

    @Column('text')
    description!: string;

    @Column('decimal')
    price!: number;

    @Column('integer')
    stock!: number;

    @Column('boolean', {
        default: true,
    })
    available!: boolean;

    @ManyToOne(() => CategoryModel)
    @JoinColumn({ name: 'category_id' })
    category!: CategoryModel;

    @ManyToOne(() => UserModel)
    @JoinColumn({ name: 'user_id' })
    user!: UserModel;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}