
export class UpdateProductDto{

    private constructor(
        public readonly name?: string,
        public readonly description?: string,
        public readonly price?: number,
        public readonly stock?: number,
        public readonly available?: boolean,
        public readonly categoryId?: string,
    ){}


    static create(object:{[key: string]: any}):[string?, UpdateProductDto?]{

        const { name, description, price, stock, available, categoryId } = object;
        let availableBoolean;

        if(
            name === undefined &&
            description === undefined &&
            price === undefined &&
            stock === undefined &&
            available === undefined &&
            categoryId === undefined
        ){
            return ['No data provider']
        }

        if( name && !(typeof name === 'string') &&!name?.trim()) return ['Name invalid'];
        if(description && !(typeof description === 'string') &&!description?.trim()) return ['Description invalid'];
        if( price && !(typeof price === 'number') && price < 0) return ['Price invalid'];
        if(stock && stock < 0) return ['Price invalid'];
        
        if( available && typeof available !== 'boolean'){
            if(available === 'true'){
                availableBoolean = true;
            }else if(available === 'false'){
                availableBoolean = false;
            }else{
               return ['Available invalid'];
            }
        }

        if(price  && !(typeof categoryId === 'string') && categoryId &&!categoryId?.trim()){
            return ['Category invalid'];
        }


        return [undefined, new UpdateProductDto(name, description, price, stock, availableBoolean, categoryId)];


    }



}