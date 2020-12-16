import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService
from '@modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

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
