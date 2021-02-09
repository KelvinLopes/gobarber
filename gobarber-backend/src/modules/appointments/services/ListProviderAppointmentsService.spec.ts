import FakeCacheProvider
from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeAppointmentsRepository
from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService
from './ListProviderAppointmentsService';

let fakeAppintementsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppintementsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppintementsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointmentOne = await fakeAppintementsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 0, 20, 14, 0, 0),
    });

    const appointmentTwo = await fakeAppintementsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 0, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
     return new Date(2021, 0, 20, 11).getTime();
    });


    const availability = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 1,
      day: 20,
    });

    expect(availability).toEqual(
      [
        appointmentOne,
        appointmentTwo,
      ],
    );
  });
});
