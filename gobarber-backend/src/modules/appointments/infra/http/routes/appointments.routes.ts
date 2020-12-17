import { Router } from 'express';

import ensureAuthenticated
from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsCrontroller from '../controllers/AppointmentsController';


const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsCrontroller();

appointmentsRouter.post('/',appointmentsController.create);

export default appointmentsRouter;
