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
    userId: string;
    date?: Date;
}

export class MovementEntity {

    private readonly id: string;
    private readonly productId: string;
    private readonly type: MovementType;
    private readonly quantity: number;
    private readonly userId: string; 
    private readonly date: Date;

    constructor(options: MovementOptions) {

        const { id, productId, type, quantity, userId,date} = options;

        if (!id?.trim()) {
            throw new Error('Id not valid');
        }

        this.id = id;
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.userId = userId;
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

    get userIdValue():string{
        return this.userId;
    }

    get dateValue():Date{
        return this.date;
    }

    static fromObject(object: {[key: string]: any;}){
    
        const { id, _id, productId, type, quantity, userId,date } = object;
    
        if(!_id && !id){
            throw CustomError.badRequest('Missing id');
        }
    
        if(!productId) throw CustomError.badRequest('Missing productId');
        if(type === undefined) throw CustomError.badRequest('Missing type');
        if(quantity === undefined) throw CustomError.badRequest('Missing quantity');
        if(!userId?.trim()) throw CustomError.badRequest('Missing userId')
        if(date === undefined) throw CustomError.badRequest('Missing date');

    
        return new MovementEntity({id:_id || id, productId, type, quantity, userId,date});
    }   


}