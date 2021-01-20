// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository
from '../repositories/fakes/FakeAppointmentsRepository';

import ListProvidersDayAvailabiltyService
from './ListProviderDayAvailabilityService';

let fakeAppintementsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProvidersDayAvailabiltyService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppintementsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProvidersDayAvailabiltyService(
      fakeAppintementsRepository,
    );
  });

  it('should be able to list the day availabilty from provider', async () => {
    await fakeAppintementsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 20, 8, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 1,
      day: 20,
    });

    expect(availability).toEqual
      (expect.arrayContaining([
        {hour: 8, available: false},
        {hour: 9, available: true},
        {hour: 10, available: false},
        {hour: 11, available: true},
    ]),
  );
  });
});
