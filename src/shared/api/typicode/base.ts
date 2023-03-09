import ky, { HTTPError, Options } from 'ky';
import { API_URL } from 'shared/config';
import config from './config';
import ApiError from './exceptions';

const fetcher = ky.create({ prefixUrl: API_URL });

const FETCH_ERROR = 'Failed to fetch';

export async function makeRequest<Result>(
  url: string,
  options: Options & { authorization?: boolean; isRetry?: boolean }
) {
  if (options.authorization) {
    try {
      const { accessToken } = config;

      options.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw ApiError.Forbidden(error.message);
      }
    }
  }

  try {
    const resData = await fetcher(url, options).json<Result>();
    return resData;
  } catch (error) {
    if (error instanceof Error && error.message === FETCH_ERROR) {
      throw ApiError.ServerError('Сервер не доступен');
    }

    if (error instanceof HTTPError) {
      const errorBody = (await error.response.json()) as { detail?: string };
      if (errorBody.detail) {
        throw new Error(errorBody.detail);
      }
    }

    throw error;
  }
}
