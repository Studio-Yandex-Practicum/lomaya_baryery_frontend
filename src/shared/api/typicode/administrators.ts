import ApiConfig from './config';
import { Invitation, User, UserToken } from '../model';
import { makeRequest } from './base';

const ROUTE = 'administrators';

export function getAppUser() {
  return makeRequest<User<'administrator' | 'expert', 'active'>>(
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

interface EditParams {
  adminId: string;
  name: string;
  surname: string;
}

interface RoleParams {
  adminId: string;
  role: string;
}

interface StatusParams {
  adminId: string;
  status: string;
}

export async function signIn({ email, password }: SignInParams) {
  const token = await makeRequest<UserToken>(`${ROUTE}/login`, {
    method: 'post',
    authorization: false,
    json: { email, password },
  });

  ApiConfig.setAccessToken(token.access_token);
  ApiConfig.setRefreshToken(token.refresh_token);
}

export function getAdministratorsList() {
  return makeRequest<User[]>(`${ROUTE}/`, {
    method: 'get',
    authorization: true,
  });
}

export function getAdministratorById(adminId: string) {
  return makeRequest<User>(`${ROUTE}/${adminId}/`, {
    method: 'get',
    authorization: true,
  });
}

export function changeRoleById({ adminId, role }: RoleParams) {
  return makeRequest<User>(`${ROUTE}/${adminId}/role/`, {
    method: 'patch',
    authorization: true,
    json: { role },
  });
}

export function blockAdminById({ adminId, status }: StatusParams) {
  return makeRequest<User>(`${ROUTE}/${adminId}/status/`, {
    method: 'patch',
    authorization: true,
    json: { status },
  });
}

export function resetPassword(email: string) {
  return makeRequest<User>(`${ROUTE}/reset_password`, {
    method: 'patch',
    authorization: true,
    json: { email },
  });
}

export function editAdminDataById({ adminId, name, surname }: EditParams) {
  return makeRequest<User>(`${ROUTE}/${adminId}/`, {
    method: 'patch',
    authorization: true,
    json: { name, surname },
  });
}

export function getInvitationsList() {
  return makeRequest<Invitation[]>(`${ROUTE}/invitations`, {
    method: 'get',
    authorization: true,
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
    authorization: true,
    json: { email, name, surname },
  });
}

export function getInvitation(token: string) {
  return makeRequest<Invitation>(`${ROUTE}/register/${token}`, {
    method: 'get',
    authorization: false,
  });
}

interface SignUpParams {
  name: string;
  surname: string;
  password: string;
  token: string;
}

export function signUp({ name, surname, password, token }: SignUpParams) {
  return makeRequest<User<'expert', 'active'>>(`${ROUTE}/register/${token}`, {
    method: 'post',
    authorization: false,
    json: { name, surname, password },
  });
}
