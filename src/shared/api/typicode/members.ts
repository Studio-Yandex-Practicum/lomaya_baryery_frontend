import { makeRequest } from './base';
import { Member, MemberById } from '../model';

export function getMembers() {
  return makeRequest<Member[]>('users/', {
    method: 'get',
    authorization: true,
  });
}

export function getMember(memberId: string) {
  return makeRequest<MemberById>(`users/${memberId}`, {
    method: 'get',
    authorization: true,
  });
}
