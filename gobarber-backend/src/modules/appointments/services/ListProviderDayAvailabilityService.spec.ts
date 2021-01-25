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
      user_id: 'user',
      date: new Date(2021, 0, 20, 14, 0, 0),
    });

    await fakeAppintementsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 0, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
     return new Date(2021, 0, 20, 11).getTime();
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
        {hour: 9, available: false},
        {hour: 10, available: false},
        {hour: 13, available: true},
        {hour: 14, available: false},
        {hour: 15, available: false},
        {hour: 16, available: true},
    ]),
  );
  });
});
