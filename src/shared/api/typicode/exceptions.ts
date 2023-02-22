type TApiErrorStatus = 400 | 401 | 403 | 404 | 409 | 500;

interface IApiError {
  status: TApiErrorStatus;
}

class ApiError extends Error implements IApiError {
  status: TApiErrorStatus;

  constructor(status: TApiErrorStatus, message: string) {
    super(message);
    this.status = status;
  }

  static BadRequest(message = 'Bad request') {
    return new ApiError(400, message);
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static NotFound(message = 'Not found') {
    return new ApiError(404, message);
  }

  static Conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }

  static ServerError(message = 'Internal server error') {
    return new ApiError(500, message);
  }
}

export default ApiError;
