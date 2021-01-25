import { Router } from 'express';

import ensureAuthenticated
from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsCrontroller from '../controllers/AppointmentsController';

import ProviderAppointmentsController
from '../controllers/ProviderAppointmentsController';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsCrontroller();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/',appointmentsController.create);
appointmentsRouter.get('/me',providerAppointmentsController.index);


export default appointmentsRouter;
