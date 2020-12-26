import FakeUsersRepository
from '../repositories/Fakes/FakeUserRepository';

import FakeHashProvider
from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticationUserService';

import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();


    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const AuthenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await AuthenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });
});
