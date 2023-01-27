export function getFormattedDate(stringOfDate: string) {
  const dateFormatter = new Intl.DateTimeFormat('ru');
  const timeFormatter = new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric' });
  const date = new Date(stringOfDate);

  return `${dateFormatter.format(date)} в ${timeFormatter.format(date)}`;
}
