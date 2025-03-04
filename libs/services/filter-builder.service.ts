import { DateRangeFilter, PaginationFilter, TypeFilter } from "@libs/interfaces/filter/base-filter.interface";
import { Injectable } from "@nestjs/common";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class FilterBuilder<T extends PaginationFilter> {
  private queryBuilder: SelectQueryBuilder<any>;
  
  constructor(queryBuilder: SelectQueryBuilder<any>) {
    this.queryBuilder = queryBuilder;
  }

  applyPagination(filter: T): this {
    if (filter.page && filter.limit) {
      const skip = (filter.page - 1) * filter.limit;
      this.queryBuilder
        .skip(skip)
        .take(filter.limit);
    }
    return this;
  }

  applyDateRange(filter: DateRangeFilter): this {
    if (filter.startDate && filter.endDate) {
      this.queryBuilder.andWhere(
        'date BETWEEN :startDate AND :endDate',
        { startDate: filter.startDate, endDate: filter.endDate }
      );
    }
    return this;
  }

  applyTypeFilter(filter: TypeFilter): this {
    if (filter.resourceType) {
      this.queryBuilder.andWhere('type = :type', { type: filter.resourceType });
    }
    if (filter.groupId) {
      this.queryBuilder.andWhere('groupId = :groupId', { groupId: filter.groupId });
    }
    return this;
  }

  build(): SelectQueryBuilder<any> {
    return this.queryBuilder;
  }
}       