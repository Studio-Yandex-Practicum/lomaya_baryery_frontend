export function getInterval(finish: Date, start: Date): number {
  return (finish.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
}

export function getApiDateFormat(date: Date): string {
  const ApiDate = new Intl.DateTimeFormat('sv-SE');
  return ApiDate.format(date);
}
