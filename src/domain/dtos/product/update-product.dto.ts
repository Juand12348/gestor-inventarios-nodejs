
export class UpdateProductDto{

    private constructor(
        public readonly name?: string,
        public readonly description?: string,
        public readonly price?: number,
        public readonly stock?: number,
        public readonly available?: boolean,
        public readonly categoryId?: string,
        public readonly userId?: string
    ){}


    static create(object:{[key: string]: any}):[string?, UpdateProductDto?]{

        const { name, description, price, stock, available, categoryId , userId} = object;
        let availableBoolean;

        if(
            name === undefined &&
            description === undefined &&
            price === undefined &&
            stock === undefined &&
            available === undefined &&
            categoryId === undefined && 
            userId === undefined
        ){
            return ['No data provider']
        }

        if( name && !name?.trim()) return ['Name invalid'];
        if(description && !description?.trim()) return ['Description invalid'];
        if(price && price < 0) return ['Price invalid'];
        if(stock && stock < 0) return ['Price invalid'];
        
        if( available && typeof available !== 'boolean'){
            if(available === 'true'){
                availableBoolean = true;
            }else if(available === 'false'){
                availableBoolean === false;
            }else{
               return ['Available invalid'];
            }
        }

        if(categoryId &&!categoryId?.trim()){
            return ['Category invalid'];
        }

        if(userId && !userId?.trim()){
            return ['User inavlid'];
        }

        return [undefined, new UpdateProductDto(name, description, price, stock, available, categoryId, userId)];


    }



}