interface PaginationQuery {
  limit?: number;
  page?: number;
}

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

export function getPagination({
  limit = DEFAULT_PAGE_LIMIT,
  page = DEFAULT_PAGE_NUMBER,
}: PaginationQuery) {
  const safePage = Math.abs(page) || 1;
  const safeLimit = Math.abs(limit) || DEFAULT_PAGE_LIMIT;
  const skip = (safePage - 1) * safeLimit;

  return {
    skip,
    limit: safeLimit,
  };
}
