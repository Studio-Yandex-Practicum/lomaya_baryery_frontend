import { Config } from '.';
import { User, UserToken } from '../model';
import { makeRequest } from './base';

const ROUTE = 'administrators';

export function getAppUser() {
  return makeRequest<User<'administrator' | 'psychologist', 'active'>>(
    `${ROUTE}/me`,
    {
      method: 'get',
      authorization: true,
    }
  );
}

interface SignInParams {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInParams) {
  const token = await makeRequest<UserToken>(`${ROUTE}/login`, {
    method: 'post',
    authorization: false,
    json: { email, password },
  });

  Config.setAccessToken(token.access_token);
  Config.setRefreshToken(token.refresh_token);
}
