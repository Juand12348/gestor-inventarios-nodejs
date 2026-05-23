export enum MovementType {
    IN,
    OUT
}

export interface MovementOptions {
    id: string;
    productId: string;
    type: MovementType;
    quantity: number;
    date?: Date;
    userId: string;
}

export class MovementEntity {

    public readonly id: string;
    public readonly productId: string;
    public readonly type: MovementType;
    public readonly quantity: number;
    public readonly date: Date;
    public readonly userId: string;

    constructor(options: MovementOptions) {

        const { id, productId, type, quantity, date, userId } = options;

        if (!id?.trim()) {
            throw new Error('Id not valid');
        }

        this.id = id;
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.date = date ?? new Date();
        this.userId = userId;
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

    get userIdValue():string{
        return this.userId;
    }
}