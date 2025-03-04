export interface FilterResult<T> {
    items: T[];
    total: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
  }