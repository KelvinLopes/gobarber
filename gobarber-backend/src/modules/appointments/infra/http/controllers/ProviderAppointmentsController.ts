import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService
from '@modules/appointments/services/ListProviderAppointmentsService';

import { classToClass } from 'class-transformer';


export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;


    const listProvidersAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProvidersAppointments.execute( {
      provider_id,
      day: Number(day),
      year: Number(year),
      month: Number(month),
    });

   return response.json(classToClass(appointments));
  }
}
