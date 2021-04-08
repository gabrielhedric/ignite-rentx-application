import { Router } from 'express';
import { ensuereAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensuereAuthenticated)
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes }