export class UpdateCategoryDto{


    private constructor(
        public readonly name?: string,
        public readonly available?: boolean,
    ){}

    static create(object:{[key:string]: any}): [string?, UpdateCategoryDto? ]{

        const { name, available } = object;
        let availableBoolean = available;


         if (
            name === undefined &&
            available === undefined 
        ) {
            return ['No data provided'];
        }

        if(name !== undefined){
            if(!(typeof name === 'string') && !name?.trim()) return ['Name invalid']; 
        }

        if(available !== undefined){
            if(typeof available !== 'boolean'){

                if(available === 'true'){
                    availableBoolean = true;
                }else if(available === 'false'){
                    availableBoolean = false;
                }else{
                    return ['Available invalid'];
                }


            }
        }



        return [undefined, new UpdateCategoryDto(name, availableBoolean)];



    }

}