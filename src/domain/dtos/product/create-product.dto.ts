

export class CreateProductDto{

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly stock: number,
        public readonly available: boolean,
        public readonly categoryId: string,
    ){}


    static create(object:{[key: string]: any}):[string?, CreateProductDto?]{

        const { name, description, price, stock, available, categoryId} = object;
        let availableBoolean = false;

        if(
            name === undefined ||
            description === undefined ||
            price === undefined ||
            stock === undefined ||
            available === undefined ||
            categoryId === undefined
        ){
            return ['No data provider']
        }

        if(!(typeof name === 'string') || !name?.trim()) return ['Name invalid'];
        if(!(typeof description === 'string') || !description?.trim()) return ['Description invalid'];
        if(!(typeof price === 'number') ||price < 0) return ['Price invalid'];
        if(!(typeof stock === 'number') ||stock < 0) return ['stock invalid'];
        
        if(typeof available !== 'boolean'){
            if(available === 'true'){
                availableBoolean = true;
            }else if(available === 'false'){
                availableBoolean = false;
            }else{
               return ['Available invalid'];
            }
        }

        if(!(typeof categoryId === 'string') || !categoryId?.trim()){
            return ['Category invalid'];
        }


        return [undefined, new CreateProductDto(name, description, price, stock, availableBoolean, categoryId)];


    }



}