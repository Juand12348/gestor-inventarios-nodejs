import { CustomError } from "../errors/custom.error";

export enum MovementType {
    PURCHASE,
    SALE,
    LOSS,
    RETURN,
}

export interface MovementOptions {
    id: string;
    productId: string;
    type: MovementType;
    quantity: number;
    date?: Date;
}

export class MovementEntity {

    public readonly id: string;
    public readonly productId: string;
    public readonly type: MovementType;
    public readonly quantity: number;
    public readonly date: Date;

    constructor(options: MovementOptions) {

        const { id, productId, type, quantity, date} = options;

        if (!id?.trim()) {
            throw new Error('Id not valid');
        }

        this.id = id;
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.date = date ?? new Date();
    }

    get idValue(): string{
        return this.id;
    }

    get productIdValue():string{
        return this.productId;
    }

    get typeValue():MovementType{
        return this.type;
    }

    get quantityValue():number{
        return this.quantity;
    }

    get dateValue():Date{
        return this.date;
    }

    static execute(object: {[key: string]: any;}){
    
        const { id, _id, productId, type, quantity, date } = object;
    
        if(!_id && !id){
            throw CustomError.badRequest('Missing id');
        }
    
        if(!productId) throw CustomError.badRequest('Missing productId');
        if(type === undefined) throw CustomError.badRequest('Missing type');
        if(quantity === undefined) throw CustomError.badRequest('Missing quantity');
        if(date === undefined) throw CustomError.badRequest('Missing date');

    
        return new MovementEntity({id:_id || id, productId, type, quantity, date});
    }   


}