import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository
from '../../notifications/repositories/fakes/FakeNotificationRepository';

import FakeAppointmentsRepository
from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentServices';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 0, 10, 13),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointment on the same time',
    async () => {
    const appointmentDate = new Date(2021, 12, 21, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    await expect(
        createAppointment.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it( 'Should not be able to create an appointments on a past date',
    async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2021, 0, 10, 12).getTime();
      });

      await expect(
        createAppointment.execute({
        date: new Date(2021, 0, 10, 11),
        user_id: 'user_id',
        provider_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it( 'Should not be able to create an appointment with same user as provider',
    async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2021, 0, 10, 12).getTime();
      });

      await expect(
        createAppointment.execute({
        date: new Date(2021, 0, 10, 13),
        user_id: 'user_id',
        provider_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it( 'Should not be able to create an appointment before 8am and after 5pm',
    async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2021, 0, 25, 12).getTime();
      });

      await expect(
        createAppointment.execute({
        date: new Date(2021, 0, 26, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
      date: new Date(2021, 0, 26, 18),
      user_id: 'user_id',
      provider_id: 'provider_id',
    })
  ).rejects.toBeInstanceOf(AppError);
  });
});
