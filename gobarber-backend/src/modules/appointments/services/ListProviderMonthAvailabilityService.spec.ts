// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository
from '../repositories/fakes/FakeAppointmentsRepository';

import ListProvidersMonthAvailabiltyService
from './ListProviderMonthAvailabilityService';

let fakeAppintementsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProvidersMonthAvailabiltyService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppintementsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProvidersMonthAvailabiltyService(
      fakeAppintementsRepository,
    );
  });

  it('should be able to list the month availabilty from provider', async () => {
    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 8, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 9, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 10, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 11, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 12, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 13, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 14, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 15, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 16, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 17, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 1,
    });

    expect(availability).toEqual
      (expect.arrayContaining([
        {day: 19, available: true},
        {day: 20, available: false},
        {day: 21, available: true},
        {day: 22, available: true},
    ]),
  );
  });
});
