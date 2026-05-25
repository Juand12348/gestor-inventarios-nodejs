

export class CreateProductDto{

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly stock: number,
        public readonly available: boolean,
        public readonly categoryId: string,
        public readonly userId: string,
    ){}


    static create(object:{[key: string]: any}):[string?, CreateProductDto?]{

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

        if(!name?.trim()) return ['Name invalid'];
        if(!description?.trim()) return ['Description invalid'];
        if(price < 0) return ['Price invalid'];
        if(stock < 0) return ['Price invalid'];
        
        if(typeof available !== 'boolean'){
            if(available === 'true'){
                availableBoolean = true;
            }else if(available === 'false'){
                availableBoolean === false;
            }else{
               return ['Available invalid'];
            }
        }

        if(!categoryId?.trim()){
            return ['Category invalid'];
        }

        if(!userId?.trim()){
            return ['User inavlid'];
        }

        return [undefined, new CreateProductDto(name, description, price, stock, available, categoryId, userId)];


    }



}