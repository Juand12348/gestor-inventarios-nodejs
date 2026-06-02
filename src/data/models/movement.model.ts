import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { ProductModel } from "./product.model";
import { MovementType } from "../../domain";


@Entity('movements')
export class MovementModel {

    @PrimaryColumn('uuid')
    id!: string;

    @ManyToOne(() => ProductModel)
    @JoinColumn({ name: 'product_id' })
    product!: ProductModel;

    @Column({
        type: 'enum',
        enum: MovementType
    })
    type!: MovementType;

    @Column('integer')
    quantity!: number;

    @CreateDateColumn()
    date!: Date;

}