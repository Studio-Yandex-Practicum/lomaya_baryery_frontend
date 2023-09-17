export type UserRole = 'administrator' | 'expert';
export type UserStatus = 'active' | 'blocked';

export interface User<
  R extends UserRole = UserRole,
  S extends UserStatus = UserStatus
> {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: R;
  status: S;
  last_login_at: string;
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
}

export interface Invitation {
  id: string;
  name: string;
  surname: string;
  email: string;
  expired_datetime: string;
}
