import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity('categories')
export class CategoryModel {

    @PrimaryColumn('uuid')
    id!: string;

    @Column('text')
    name!: string;

    @Column('boolean', {
        default: true,
    })
    available!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}