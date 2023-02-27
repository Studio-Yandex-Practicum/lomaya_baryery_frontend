export const emailPattern =
  /^[A-Z0-9._%+-]{3,}@[A-Z0-9-]+\.([A-Z0-9-]+\.)*[A-Z]{2,4}$/i;

export const passwordPattern =
  // eslint-disable-next-line no-useless-escape
  /^[\w\d~`!@#$%^&*()-+=\[\]\{\}\\\|;:'",<\.>\/\?]+$/i;

// eslint-disable-next-line no-useless-escape
export const namePattern = /^[а-яёА-ЯЁ\-\_–]{1,100}$/i;
