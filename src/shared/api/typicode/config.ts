interface IApiConfig {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAccessToken: (tokenValue: string) => void;
  setRefreshToken: (tokenValue: string) => void;
  clearToken: () => void;
}

class ApiConfig implements IApiConfig {
  public getAccessToken(): string | null {
    const accessToken = localStorage.getItem('accessToken');

    return accessToken;
  }

  public getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem('refreshToken');

    return refreshToken;
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
