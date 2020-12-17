import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService
from '@modules/users/services/AuthenticationUserService';


export default class SessionController {
  public async create(request: Request, response: Response):
    Promise<Response> {

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
  }
}
