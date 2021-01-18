import { v4 as uuidv4 } from 'uuid';

import { isEqual, getMonth, getYear } from "date-fns";

import IAppointmentsRepository
from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO
from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllMonthFromProviderDTO
from '@modules/appointments/dtos/IFindAllMonthProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository{

  private appointments: Appointment[] = [];

  public async findByDate(date: Date) : Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find( appointments =>
      isEqual(appointments.date, date),
    );

    return findAppointment;
  }

  public async findAllInMothFromProvider({
    provider_id,
    month,
    year
  }: IFindAllMonthFromProviderDTO) : Promise<Appointment[]> {
    const appointments = this.appointments.filter( appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
  });

    return appointments;
  }

  public async create({
    provider_id,
    date
  } : ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {id: uuidv4(), date, provider_id});

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
