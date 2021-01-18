// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository
from '../repositories/fakes/FakeAppointmentsRepository';

import ListProvidersMonthAvailabiltyService
from './ListProviderMothAvailabilityService';

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
      date: new Date(2021, 0, 20, 8, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 3, 20, 8, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 20, 10, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 1,
    });

    expect(availability).toEqual(expect.arrayContaining([
      {day: 19, availability: true},
      {day: 20, availability: false},
      {day: 21, availability: false},
      {day: 22, availability: true},
    ]))
  });
});
