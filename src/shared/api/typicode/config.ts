interface IApiConfig {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (tokenValue: string) => void;
  setRefreshToken: (tokenValue: string) => void;
}

class ApiConfig implements IApiConfig {
  public get accessToken(): string {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('accessToken not exist');
    }

    return token;
  }

  public get refreshToken(): string {
    const token = localStorage.getItem('refreshToken');

    if (!token) {
      throw new Error('refreshToken not exist');
    }

    return token;
  }

  public setAccessToken(tokenValue: string) {
    localStorage.setItem('accessToken', tokenValue);
  }

  public setRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  public clearToken() {
    localStorage.clear();
  }
}

export default new ApiConfig();
