export interface Pagination {
  skip: number;
  limit: number;
  query?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sort?: { [key: string]: any };
}

export interface SimplePagination {
  page: number;
  limit: number;
}

export function paginationToQueryString(pagination: Pagination): string {
  let queryString = `skip=${pagination.skip}&limit=${pagination.limit}`;

  if (pagination.query) {
    queryString += `&query=${pagination.query}`;
  }

  if (pagination.filter) {
    const filterString = JSON.stringify(pagination.filter);
    queryString += `&filter=${filterString}`;
  }

  if (pagination.sort) {
    const sortString = JSON.stringify(pagination.sort);
    queryString += `&sort=${sortString}`;
  }

  return queryString;
}

export function simplePaginationToQueryString(
  page: number,
  limit: number
): string {
  const queryString = `page=${page}&limit=${limit}`;
  return queryString;
}
