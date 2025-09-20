import { cloneDeep } from 'lodash';

export function cleanObjectForGraphQL<T>(obj: T): T {
  const cleaned = cloneDeep(obj);
  removeTypename(cleaned);
  return cleaned;
}

function removeTypename(obj: any): void {
  if (obj && typeof obj === 'object') {
    delete obj.__typename;
    Object.values(obj).forEach(removeTypename);
  }
}
