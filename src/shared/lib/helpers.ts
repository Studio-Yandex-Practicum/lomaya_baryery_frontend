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

export function deserializeSearchParams<T extends Record<string, string>>(
  params: string
): Partial<T> {
  const paramsList = params.split('&');
  const paramsEntries = paramsList.map((value) => value.split('='));
  const deserializedObject = Object.fromEntries(paramsEntries) as Partial<T>;
  return deserializedObject;
}

export function getFromProp(state: unknown) {
  if (typeof state === 'object' && state !== null && 'from' in state) {
    if (typeof state.from === 'string') return state.from;
  }
  return null;
}

export function formElementForBlobFile(response: Blob, outputFilename: string) {
  const url = URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', outputFilename);
  document.body.appendChild(link);
  link.click();
}
