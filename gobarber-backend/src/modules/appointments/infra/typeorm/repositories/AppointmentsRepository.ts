import { getRepository, Repository, Raw} from 'typeorm';

import IAppointmentsRepository
from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO
from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

import IFindAllMonthFromProviderDTO
from '@modules/appointments/dtos/IFindAllMonthProviderDTO';

import IFindAllDayProviderDTO
from '@modules/appointments/dtos/IFindAllDayProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository{
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date) : Promise<Appointment | undefined> {
      const findAppointment = await this.ormRepository.findOne({
        where: { date },
      })

      return findAppointment;
  }

  public async findAllInMothFromProvider({
    provider_id,
    month,
    year
  }: IFindAllMonthFromProviderDTO) : Promise<Appointment[]> {
    const parseMoth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMoth}-${year}'`,
        ),
      },
  });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllDayProviderDTO) : Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, '0');
    const parseMoth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(
            ${dateFieldName}, 'DD-MM-YYYY'
          ) = '${parseDay}-${parseMoth}-${year}'`,
        ),
      },
  });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date
  } : ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, user_id,date });
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
