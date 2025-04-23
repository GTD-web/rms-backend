export enum ReservationStatus {
    PENDING = 'PENDING', // 예약대기
    CONFIRMED = 'CONFIRMED', // 예약완료
    CANCELED = 'CANCELED', // 예약취소
    REJECTED = 'REJECTED', // 예약반려
    CLOSED = 'CLOSED', // 예약종료
}

export enum ParticipantsType {
    RESERVER = 'RESERVER', // 예약자
    PARTICIPANT = 'PARTICIPANT', // 참여자
    CC_RECEIPIENT = 'CC_RECEIPIENT', // 수신참조자
}
