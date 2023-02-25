import { Config } from '.';
import { Invitation, User, UserToken } from '../model';
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

export function getAdministratorsList() {
  return makeRequest<User[]>(ROUTE, { method: 'get', authorization: false });
}

export function getInvitationsList() {
  return makeRequest<Invitation[]>(`${ROUTE}/invitations`, {
    method: 'get',
    authorization: false,
  });
}

interface SendInvitationParams {
  name: string;
  surname: string;
  email: string;
}

export function sendInvitation({ email, name, surname }: SendInvitationParams) {
  return makeRequest<unknown>(`${ROUTE}/invitations`, {
    method: 'post',
    authorization: false,
    json: { email, name, surname },
  });
}
