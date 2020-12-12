import { Router } from 'express';

import UsersRepository
from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import AuthenticateUserService
from '@modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository
    );

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    return response.json( { userWithoutPassword, token } );

});

export default sessionsRouter;
