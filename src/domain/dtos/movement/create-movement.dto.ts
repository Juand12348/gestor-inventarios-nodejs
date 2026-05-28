import { MovementType } from "../../entities/movement.entity";



export class CreateMovementDto{

    private constructor(
        public readonly productId: string,
        public readonly type: MovementType,
        public readonly quantity: number,
    ){}

    static create(object:{[key:string]:any}):[string?, CreateMovementDto?]{

        const {productId, type, quantity} = object;
        let movementType;

        if(!(typeof productId === 'string') || !productId?.trim()){
            return ['productId invalid'];
        }

        if(typeof type === 'string'){
            if(type === 'PURCHASE'){
                movementType = MovementType.PURCHASE;
            }else if(type === 'RETURN'){
                movementType = MovementType.RETURN;
            }else if(type === 'SALE'){
                movementType = MovementType.SALE;
            }else if(type === 'LOSS'){
                movementType = MovementType.LOSS;
            }else{
                return ['Movement invalid'];
            }
        }else{
            return ['Movement invalid'];
        }

        if( !(typeof quantity === 'number') || quantity < 0) return ['Quantity invalid'];
        

        return [undefined, new CreateMovementDto(productId, movementType, quantity)];
        


    }


}