export function getFormattedDate(stringOfDate: string) {
  const dateFormatter = new Intl.DateTimeFormat('ru');
  const timeFormatter = new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric' });
  const date = new Date(stringOfDate);

  return `${dateFormatter.format(date)} в ${timeFormatter.format(date)}`;
}

export function getTodayDate() {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  return today;
}

export function getUsersRequestsDeadline(startedAt?: string) {
  if (!startedAt) {
    return null;
  }
  const startDate = new Date(startedAt);
  const requestDeadline = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  return requestDeadline;
}
