export type UserRole = 'administrator' | 'psychologist';
export type UserStatus = 'active' | 'inactive';

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
  last_login_at: Date;
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
}
