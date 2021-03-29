import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (request, response) => {
    createSpecificationController.handle(request, response);
});


export { specificationsRoutes }