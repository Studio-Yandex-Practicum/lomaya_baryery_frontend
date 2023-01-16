export interface IAppLocation {
  state: { background: Location } | undefined;
  pathname: string;
  search: string;
}

export function deserializeQuery<T extends { [key: string]: string }>(query: string): T {
  const pairs = query.substring(1).split('&');

  const entries = pairs.map((str) => str.split('='));

  return Object.fromEntries(entries);
}
