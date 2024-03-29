import ky, { HTTPError, Options } from 'ky';
import { API_URL } from 'shared/config';
import ApiConfig from './config';

const fetcher = ky.create({ prefixUrl: API_URL });

const FETCH_ERROR = 'Failed to fetch';

export async function makeRequest<Result>(
  url: string,
  options: Options & { authorization?: boolean; isRetry?: boolean }
) {
  if (options.authorization) {
    const accessToken = ApiConfig.getAccessToken();

    if (!accessToken) {
      throw new Error('accessToken not exist');
    }

    options.headers = {
      authorization: `Bearer ${accessToken}`,
    };
  }

  try {
    const resData = await fetcher(url, options).json<Result>();
    return resData;
  } catch (error) {
    if (error instanceof Error && error.message === FETCH_ERROR) {
      throw new Error('Сервер не доступен');
    }

    if (error instanceof HTTPError) {
      const errorBody = (await error.response.json()) as {
        detail?: string | [{ msg: string }];
      };
      if (errorBody.detail) {
        if (typeof errorBody.detail === 'string') {
          if (
            errorBody.detail.includes(
              "Возникла ошибка (554, '5.7.1 Message rejected under suspicion of SPAM"
            )
          ) {
            throw new Error('Проверьте корректность введенных данных');
          }
          throw new Error(errorBody.detail);
        }

        if (Array.isArray(errorBody.detail)) {
          throw new Error(errorBody.detail[0].msg);
        }
      }
    }

    throw error;
  }
}

export async function makeBlobRequest(
  url: string,
  options: Options & { authorization?: boolean; isRetry?: boolean }
) {
  if (options.authorization) {
    const accessToken = ApiConfig.getAccessToken();

    if (!accessToken) {
      throw new Error('accessToken not exist');
    }

    options.headers = {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'text/plain',
    };
  }

  try {
    const resData = await fetcher(url, options).blob();
    return resData;
  } catch (error) {
    if (error instanceof Error && error.message === FETCH_ERROR) {
      throw new Error('Сервер не доступен');
    }

    if (error instanceof HTTPError) {
      const errorBody = (await error.response.json()) as {
        detail?: string | [{ msg: string }];
      };
      if (errorBody.detail) {
        if (typeof errorBody.detail === 'string') {
          throw new Error(errorBody.detail);
        }

        if (Array.isArray(errorBody.detail)) {
          throw new Error(errorBody.detail[0].msg);
        }
      }
    }

    throw error;
  }
}
