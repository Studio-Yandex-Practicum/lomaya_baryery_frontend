import { ITask } from '../model';
import { makeRequest } from './base';

const ROUTE = 'tasks/';

export function getTasks() {
  return makeRequest<ITask[]>(ROUTE, { authorization: true });
}
