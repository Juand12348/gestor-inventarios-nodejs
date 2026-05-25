import { MovementType } from "../../entities/movement.entity";



export class CreateMovementDto{

    private constructor(
        public readonly productId: string,
        public readonly type: MovementType,
        public readonly quantity: number,
        public readonly userId: string,
    ){}

    static create(object:{[key:string]:any}):[string?, CreateMovementDto?]{

        const {productId, type, quantity, userId } = object;
        let movementType;

        if(!(typeof productId === 'string') || !productId?.trim()){
            return ['productId invalid'];
        }

        if(typeof type === 'string'){
            if(type === 'IN'){
                movementType = MovementType.IN;
            }else if(type === 'OUT'){
                movementType = MovementType.OUT;
            }else{
                return ['Movement invalid'];
            }
        }else{
            return ['Movement invalid'];
        }

        if( !(typeof quantity === 'number') || quantity < 0) return ['Quantity invalid'];
        if(!(typeof userId === 'string')  ||  !userId?.trim()) return ['UserId invalid'];

        return [undefined, new CreateMovementDto(productId, movementType, quantity, userId)];
        


    }


}