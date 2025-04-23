const ValidationErrorMessage = {
    REQUIRED: (field: string) => `${field}은(는) 필수 값입니다.`,
    IS_INT: (field: string) => `${field}은(는) 정수여야 합니다.`,
    IS_ARRAY: (field: string) => `${field}은(는) 배열이어야 합니다.`,
    IS_STRING: (field: string) => `${field}은(는) 문자열이어야 합니다.`,
    IS_NUMBER: (field: string) => `${field}은(는) 숫자여야 합니다.`,
    IS_BOOLEAN: (field: string) => `${field}은(는) 불리언이어야 합니다.`,
    IS_DATE: (field: string) => `${field}은(는) 날짜여야 합니다.`,
    IS_EMAIL: (field: string) => `${field}은(는) 이메일 형식이어야 합니다.`,
    IS_URL: (field: string) => `${field}은(는) URL 형식이어야 합니다.`,
    IS_PHONE: (field: string) => `${field}은(는) 전화번호 형식이어야 합니다.`,
    IS_MIN: (field: string, min: number) => `${field}은(는) ${min} 이상이어야 합니다.`,
    IS_MAX: (field: string, max: number) => `${field}은(는) ${max} 이하이어야 합니다.`,
    IS_MIN_LENGTH: (field: string, minLength: number) => `${field}은(는) ${minLength} 글자 이상이어야 합니다.`,
    IS_MAX_LENGTH: (field: string, maxLength: number) => `${field}은(는) ${maxLength} 글자 이하이어야 합니다.`,
    IS_LENGTH: (field: string, minLength: number, maxLength: number) =>
        `${field}은(는) ${minLength} 글자 이상 ${maxLength} 글자 이하이어야 합니다.`,
    IS_REGEX: (field: string, regex: string) => `${field}은(는) ${regex} 형식이어야 합니다.`,
    IS_ENUM: (field: string, enumValues: string[]) => `${field}은(는) ${enumValues.join(', ')} 중 하나여야 합니다.`,
    IS_IN: (field: string, values: string[]) => `${field}은(는) ${values.join(', ')} 중 하나여야 합니다.`,
    IS_NOT_IN: (field: string, values: string[]) => `${field}은(는) ${values.join(', ')} 중 하나여야 합니다.`,
    IS_NOT_NULL: (field: string) => `${field}은(는) NULL이 아니어야 합니다.`,
    IS_NULL: (field: string) => `${field}은(는) NULL이어야 합니다.`,
    IS_POSITIVE: (field: string) => `${field}은(는) 양수여야 합니다.`,
    IS_NEGATIVE: (field: string) => `${field}은(는) 음수여야 합니다.`,
    IS_ZERO: (field: string) => `${field}은(는) 0이어야 합니다.`,
    IS_NOT_ZERO: (field: string) => `${field}은(는) 0이 아니어야 합니다.`,
};

const BusinessErrorMessage = {
    COMMON: {
        NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
        DUPLICATE_USER: '이미 존재하는 사용자입니다.',
        UNAUTHORIZED: '권한이 없습니다.',
    },
    RESOURCE: {
        NOT_FOUND: '요청한 자원을 찾을 수 없습니다.',
    },
    RESOURCE_GROUP: {
        NOT_FOUND: '요청한 자원 그룹을 찾을 수 없습니다.',
    },
    RESOURCE_MANAGER: {
        NOT_FOUND: '요청한 자원 관리자를 찾을 수 없습니다.',
    },
    VEHICLE_INFO: {
        NOT_FOUND: '요청한 차량 정보를 찾을 수 없습니다.',
    },
    CONSUMABLE: {
        NOT_FOUND: '요청한 소모품 정보를 찾을 수 없습니다.',
    },
    MAINTENANCE: {
        NOT_FOUND: '요청한 정비 정보를 찾을 수 없습니다.',
    },
    MAINTENANCE_RECORD: {
        NOT_FOUND: '요청한 정비 기록을 찾을 수 없습니다.',
    },
    MAINTENANCE_RECORD_DETAIL: {
        NOT_FOUND: '요청한 정비 기록 상세 정보를 찾을 수 없습니다.',
    },
    MAINTENANCE_RECORD_DETAIL_DETAIL: {
        NOT_FOUND: '요청한 정비 기록 상세 정보를 찾을 수 없습니다.',
    },
    RESERVATION: {
        NOT_FOUND: '요청한 예약 정보를 찾을 수 없습니다.',
    },
    RESERVATION_RECORD: {
        NOT_FOUND: '요청한 예약 기록을 찾을 수 없습니다.',
    },
    RESERVATION_RECORD_DETAIL: {
        NOT_FOUND: '요청한 예약 기록 상세 정보를 찾을 수 없습니다.',
    },
    RESERVATION_RECORD_DETAIL_DETAIL: {
        NOT_FOUND: '요청한 예약 기록 상세 정보를 찾을 수 없습니다.',
    },
    RESOURCE_RESERVATION: {
        NOT_FOUND: '요청한 자원 예약 정보를 찾을 수 없습니다.',
    },
    RESOURCE_RESERVATION_RECORD: {
        NOT_FOUND: '요청한 자원 예약 기록을 찾을 수 없습니다.',
    },
    RESOURCE_RESERVATION_RECORD_DETAIL: {
        NOT_FOUND: '요청한 자원 예약 기록 상세 정보를 찾을 수 없습니다.',
    },
};

export const ERROR_MESSAGE = {
    VALIDATION: ValidationErrorMessage,
    BUSINESS: BusinessErrorMessage,
};
