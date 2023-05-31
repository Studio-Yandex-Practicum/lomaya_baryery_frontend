import { ITask } from '../model';
import { makeRequest, makeBlobRequest } from './base';
import { URL } from 'shared/config';

interface CreateTaskParams {
  title: string;
  file: File;
}

interface EditTaskParams {
  id: string;
  title: string;
  file: File;
}

interface ChangeStatusParams {
  id: string;
}

const ROUTE = 'tasks/';

export function getTasks() {
  return makeRequest<ITask[]>(ROUTE, { authorization: true });
}

export async function getTask(id: string) {
  const url = `${ROUTE}${id}`;
  const task = await makeRequest<ITask>(url, { authorization: true });

  const file = await getImage(task.url);

  return { ...task, file };
}

export function createNewTask({ title, file }: CreateTaskParams) {
  const formData = new FormData();
  formData.append('image', file);

  const url = `${ROUTE}/?title=${title}`;
  const ret = makeRequest(url, {
    authorization: true,
    method: 'post',
    body: formData,
  });
  return ret;
}

export async function editTask({ id, title, file }: EditTaskParams) {
  const url = `${ROUTE}/${id}?title=${title}`;

  const formData = new FormData();
  formData.append('image', file);

  const ret = await makeRequest<ITask>(url, {
    method: 'patch',
    authorization: true,
    body: formData,
  });

  const img = await getImage(ret.url);

  return { ...ret, file: img };
}

export async function changeStatus({ id }: ChangeStatusParams) {
  const url = `${ROUTE}${id}/change_status`;

  const ret = await makeRequest<ITask>(url, {
    method: 'patch',
    authorization: true,
  });

  return ret;
}

async function getImage(path: string): Promise<File> {
  let url;
  if (path.charAt(0) === '/') {
    url = path.substring(1);
  } else {
    url = path;
  }

  const respBlob = await makeBlobRequest(url, {
    method: 'get',
    authorization: false,
    prefixUrl: URL,
  });

  const name = url.split('/').pop() || '';

  return new File([respBlob], name, { type: respBlob.type });
}
