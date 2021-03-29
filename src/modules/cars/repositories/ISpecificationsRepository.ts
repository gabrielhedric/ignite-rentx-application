import { Specification } from "../model/Specification";


interface ICreateSpecificationDTO {
    name: string;
    description: string;
}


interface ISpecificationsRepository {
    create({description, name} : ICreateSpecificationDTO) : Specification;
    findByName(name: string) : Specification 
}

export { ICreateSpecificationDTO, ISpecificationsRepository}