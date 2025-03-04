/** 예약 모듈 생성 후 이관 예정 */

// @Injectable()
// export class ReservationFilterService {
//   constructor(
//     @InjectRepository(Reservation)
//     private readonly reservationRepository: Repository<Reservation>
//   ) {}

//   async filter(filter: ReservationFilter): Promise<FilterResult<Reservation>> {
//     const queryBuilder = this.reservationRepository.createQueryBuilder('reservation');
    
//     const filterBuilder = new FilterBuilder(queryBuilder)
//       .applyTypeFilter(filter)
//       .applyDateRange(filter)
//       .applyPagination(filter);

//     if (filter.status) {
//       queryBuilder.andWhere('reservation.status = :status', { status: filter.status });
//     }

//     // 그룹핑 로직
//     if (filter.viewType === 'day') {
//       queryBuilder
//         .orderBy('reservation.date', 'ASC')
//         .addOrderBy('resource.type', 'ASC')
//         .addOrderBy('resource.groupId', 'ASC')
//         .addOrderBy('reservation.startTime', 'ASC');
//     }

//     const [items, total] = await queryBuilder.getManyAndCount();

//     return {
//       items,
//       total,
//       page: filter.page,
//       limit: filter.limit,
//       hasNext: filter.page * filter.limit < total
//     };
//   }
// }