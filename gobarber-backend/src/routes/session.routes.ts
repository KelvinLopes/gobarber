import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
     const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

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
