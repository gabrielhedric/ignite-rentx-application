import { Category } from '../../model/Category';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';


interface IRequest {
    name: string;
    description: string;
}

/**
 * [x] - Definir o tipo de retorno 
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositório
 */

class CreateCategoryUseCase {

    constructor(private categoriesRepository: CategoriesRepository){

    }

    execute({ name, description}: IRequest) : Category {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new Error("Category Already Exists!");
        }

        const category = this.categoriesRepository.create({name, description});

        return category;
    }   
}


export { CreateCategoryUseCase }