import ky, { HTTPError, Options } from 'ky';
import config from './config';
import ApiError from './exceptions';

const fetcher = ky.create({ prefixUrl: 'https://lombaryery.tk' });

async function makeRequest<Result>(
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
    if (
      error instanceof HTTPError &&
      error.response.status === 401 &&
      options.authorization &&
      !options.isRetry
    ) {
      try {
        interface ITokenRes {
          accessToken: string;
          refreshToken: string;
        }

        const { accessToken, refreshToken } = await fetcher(
          'administrators/token',
          {
            method: 'post',
            json: { token: config.refreshToken },
          }
        ).json<ITokenRes>();

        config.setAccessToken(accessToken);
        config.setRefreshToken(refreshToken);

        options.isRetry = true;

        makeRequest(url, options);
      } catch (error) {
        throw ApiError.Unauthorized();
      }
    } else {
      if (error instanceof HTTPError) {
        const errorBody = await error.response.json();
        if (errorBody.detail) {
          throw new Error(errorBody.detail);
        }
      }
      throw error;
    }
  }
}

export default makeRequest;
