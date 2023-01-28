export function getTodayDate() {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  return today;
}

export function getUsersRequestsDeadline(startedAt: string) {
  if (startedAt === '') {
    return new Date(0);
  }
  const startDate = new Date(startedAt);
  const requestDeadline = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  return requestDeadline;
}
