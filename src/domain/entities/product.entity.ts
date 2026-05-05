import { CategoryIdEntity } from "./categoryId.entity";


export interface ProductOptions{

    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: CategoryIdEntity;
    createdAt?: Date;
    updatedAt?: Date;

}


export class ProductEntity {

    private readonly id: string;
    private name: string;
    private description: string;
    private price: number;
    private stock: number;
    private categoryId: CategoryIdEntity;
    private readonly createdAt: Date;
    private updatedAt: Date;

    constructor(options : ProductOptions ){

        const {id, name, description, price, stock, categoryId, createdAt, updatedAt} = options;
        
        if (!id?.trim()) {
            throw new Error('Id not valid');
        }

        if (!name?.trim()) {
            throw new Error('Name not valid');
        }

        if (!description?.trim()) {
            throw new Error('Description not valid');
        }

        if (price === null || price === undefined || price < 0) {
            throw new Error('Price not valid');
        }

        if (stock === null || stock === undefined || stock < 0) {
            throw new Error('Stock not valid');
        }

        if(!(categoryId instanceof CategoryIdEntity)){
            throw new Error('CategoryId not valid');
        }

        if (createdAt && !(createdAt instanceof Date)) {
            throw new Error('createdAt must be a Date');
        }

        if (updatedAt && !(updatedAt instanceof Date)) {
            throw new Error('updatedAt must be a Date');
        }
        
        
        

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
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

    get categoryIdValue():CategoryIdEntity{
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
    }

    set descriptionValue(description: string){
        if (!description?.trim()) {
            throw new Error('Description not valid');
        }

        this.description = description;
    }
    
    set priceValue(price: number){
        if (price === null || price === undefined || price < 0) {
            throw new Error('Price not valid');
        }

        this.price = price;
    }

    set stockValue(stock: number){
        if (stock === null || stock === undefined || stock < 0) {
            throw new Error('Stock not valid');
        }

        this.stock = stock;
    }

    set updatedAtValue(updatedAt: Date){
        if (updatedAt && !(updatedAt instanceof Date)) {
            throw new Error('updatedAt must be a Date');
        }
        this.updatedAt = updatedAt;
    }

    

    
}