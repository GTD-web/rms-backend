export interface PaginationFilter {
    page?: number;
    limit?: number;
  }
  
  export interface DateRangeFilter {
    startDate?: Date;
    endDate?: Date;
    viewType?: 'month' | 'week' | 'day';
  }
  
  export interface TypeFilter {
    resourceType?: string;
    groupId?: string;
  }