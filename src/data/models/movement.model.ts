import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { ProductModel } from "./product.model";


export enum MovementTypeModel{

    PURCHASE = 'PURCHASE',
    SALE = 'SALE',
    LOSS = 'LOSS',
    RETURN = 'RETURN',

}

@Entity('movements')
export class MovementModel {

    @PrimaryColumn('uuid')
    id!: string;

    @ManyToOne(() => ProductModel)
    @JoinColumn({ name: 'product_id' })
    product!: ProductModel;

    @Column({
        type: 'enum',
        enum: MovementTypeModel
    })
    type!: MovementTypeModel;

    @Column('integer')
    quantity!: number;

    @CreateDateColumn()
    date!: Date;

}