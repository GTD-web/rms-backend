import { PaginationFilter, DateRangeFilter, TypeFilter } from "./base-filter.interface";

export interface ReservationFilter extends PaginationFilter, DateRangeFilter, TypeFilter {
    status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  }