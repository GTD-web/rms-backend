export class CreateResourceDto {
    name: string;
    type: string;
    // ... 추가 필드
}

export class UpdateResourceDto {
    status?: string;
    // ... 추가 필드
}
