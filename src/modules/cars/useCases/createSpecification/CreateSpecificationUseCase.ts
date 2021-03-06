import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Specification } from "../../entities/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


interface IRequest {
    name: string,
    description: string,
}
@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject(SpecificationsRepository)
        private specificationsRepository: ISpecificationsRepository){
    }

    async execute({name, description} : IRequest) : Promise<Specification>{
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists) {
            throw new AppError('Specification already exists!')
        }
        
        const specification = await this.specificationsRepository.create({
            name, 
            description, 
        });

        return specification;
    }
}

export { CreateSpecificationUseCase }