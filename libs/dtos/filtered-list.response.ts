import { FilterResult } from "@libs/interfaces/filter/filter-result.interface";

export class FilteredListResponse<T> {
    items: T[];
    metadata: {
      total: number;
      page?: number;
      limit?: number;
      hasNext?: boolean;
    };
  
    static from<T>(result: FilterResult<T>): FilteredListResponse<T> {
      return {
        items: result.items,
        metadata: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          hasNext: result.hasNext
        }
      };
    }
  }