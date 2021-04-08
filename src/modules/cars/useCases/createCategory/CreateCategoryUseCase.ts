import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { Category } from '../../entities/Category';
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
@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository){}

    async execute({ name, description}: IRequest) : Promise<Category> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new AppError("Category Already Exists!");
        }

        const category = this.categoriesRepository.create({name, description});

        return category;
    }   
}


export { CreateCategoryUseCase }