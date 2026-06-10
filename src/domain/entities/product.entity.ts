import { CustomError } from "../errors/custom.error";

export interface ProductOptions{

    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    available: boolean;
    categoryId: string;
    createdAt?: Date;
    updatedAt?: Date;

}


export class ProductEntity {

    private readonly id: string;
    private name: string;
    private description: string;
    private price: number;
    private stock: number;
    private available: boolean;
    private categoryId: string;
    private readonly createdAt: Date;
    private updatedAt: Date;

    constructor(options : ProductOptions ){

        const {id, name, description, price, stock, available,categoryId, createdAt, updatedAt} = options;
        
        if (!id?.trim()) {
            throw new Error('Id not valid');
        }

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.available = available;
        this.categoryId = categoryId;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();

    }


    get idValue(): string{
        return this.id;
    }

    get nameValue():string{
        return this.name;
    }

    get descriptionValue(): string{
        return this.description;
    }

    get priceValue(): number{
        return this.price;
    }

    get stockValue(): number{
        return this.stock;
    }

    get availableValue():boolean{
        return this.available;
    }

    get categoryIdValue():string{
        return this.categoryId;
    }


    get createdAtValue():Date{
        return this.createdAt;
    }

    get updatedAtValue():Date{
        return this.updatedAt;
    }

    set nameValue(name: string){
        if (!name?.trim()) {
            throw new Error('Name not valid');
        }

        this.name = name;
        this.updatedAt = new Date();
    }

    set descriptionValue(description: string){
        if (!description?.trim()) {
            throw new Error('Description not valid');
        }

        this.description = description;
        this.updatedAt = new Date();
    }
    
    set priceValue(price: number){
        if (price === null || price === undefined || price < 0) {
            throw new Error('Price not valid');
        }

        this.price = price;
        this.updatedAt = new Date();
    }

    set stockValue(stock: number){
        if (stock === null || stock === undefined || stock < 0) {
            throw new Error('Stock not valid');
        }

        this.stock = stock;
        this.updatedAt = new Date();
    }

    set availableValue(available: boolean){
        this.available = available;

        this.updatedAt = new Date();

    }

    set categoryIdValue(categoryId: string){
        this.categoryId = categoryId;

        this.updatedAt = new Date();

    }

    static fromObject(object: {[key: string]: any;}){
    
        const { id, _id,  name, description, price, stock, available,createdAt, updatedAt } = object;
        const categoryId = object.categoryId ?? object.category?.id;
    
        if(!_id && !id){
            throw CustomError.badRequest('Missing id');
        }
    
        if(!name?.trim()) throw CustomError.badRequest('Missing name');
        if(!description?.trim()) throw CustomError.badRequest('Missing description');
        if(price === undefined) throw CustomError.badRequest('Missing price');
        if(stock === undefined) throw CustomError.badRequest('Missing stock');
        if(available === undefined) throw CustomError.badRequest('Missing available');
        if(categoryId === undefined) throw CustomError.badRequest('Missing categoryId');
        if(createdAt === undefined) throw CustomError.badRequest('Missing createdAt');
        if(updatedAt === undefined) throw CustomError.badRequest('Missing updatedAt');

    
        return new ProductEntity({id:_id || id, name, description, price, stock, available, categoryId, createdAt, updatedAt});
    }   

    
    

    

    
    
}