export function getFormattedDate(stringOfDate: string) {
  const dateFormatter = new Intl.DateTimeFormat('ru');
  const date = new Date(stringOfDate);

  return `${dateFormatter.format(date)}`;
}

export function findIndexById<T extends { [Property in keyof T]: T[Property] }>(
  array: T[] | null | undefined,
  idKey: keyof T,
  entityId: string | undefined | null
): number | null {
  if (!array || !entityId) return null;

  const necessaryIndex = array.findIndex((item) => item[idKey] === entityId);

  return necessaryIndex !== -1 ? necessaryIndex : null;
}
