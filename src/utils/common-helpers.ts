export function getFormattedDate(stringOfDate: string) {
  const dateFormatter = new Intl.DateTimeFormat('ru');
  // const timeFormatter = new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric' });
  const date = new Date(stringOfDate);

  // return `${dateFormatter.format(date)} в ${timeFormatter.format(date)}`;
  return `${dateFormatter.format(date)}`;
}

export function findIndexById<T extends { [Property in keyof T]: T[Property] }>(
  array: T[] | null | undefined,
  idKey: keyof T,
  entityId: string,
): number | null {
  if (!array) return null;

  const necessaryIndex = array.findIndex((item) => item[idKey] === entityId);

  return necessaryIndex !== -1 ? necessaryIndex : null;
}
