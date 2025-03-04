import { PaginationFilter, TypeFilter } from "./base-filter.interface";

export interface ResourceFilter extends PaginationFilter, TypeFilter {
    isAvailable?: boolean;
    timeSlot?: {
      date: Date;
      startTime: string;
      endTime: string;
    };
  }