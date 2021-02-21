import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';

describe('Auth hook', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
     });

     result.current.signIn({
       email: 'jonhdoe@example.com',
       password: '12345678',
     });

     expect(result.current.user.email).toEqual('jonhdoe@example.com');
  });
});
