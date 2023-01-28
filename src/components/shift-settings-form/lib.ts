export function getInterval(finish: Date, start: Date): number {
  return (finish.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
}

export function getAPIDateFormat(date: Date): string {
  const APIDate = new Intl.DateTimeFormat('sv-SE');
  return APIDate.format(date);
}
