import { ResourceGroup } from '@libs/entities';
import { Resource } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';

export const seedData = [
    {
        title: '법인차량 ',
        type: ResourceType.VEHICLE,
        resources: [
            {
                name: '싼타페(25어5677)',
                location: {
                    address: 'B3',
                    detailAddress: 'A01',
                },
                images: [],
                type: ResourceType.VEHICLE,
                order: 0,
            },
            {
                name: '셀토스(126서1152)',
                location: {
                    address: 'B3',
                    detailAddress: 'B01',
                },
                images: [],
                type: ResourceType.VEHICLE,
                order: 1,
            },
            {
                name: '카니발(116너 5351)',
                location: {
                    address: 'B3',
                    detailAddress: 'C01',
                },
                images: [],
                type: ResourceType.VEHICLE,
                order: 2,
            },
            {
                name: '카니발(161라 4762)',
                location: {
                    address: 'B3',
                    detailAddress: 'D01',
                },
                images: [],
                type: ResourceType.VEHICLE,
                order: 3,
            },
        ],
    },
    {
        title: '대전숙소',
        type: ResourceType.ACCOMMODATION,
        resources: [
            {
                name: '럭셔리모텔1',
                location: {
                    address: '대전광역시 유성구',
                    detailAddress: '온천서로 30-10',
                },
                images: [],
                type: ResourceType.ACCOMMODATION,
                order: 0,
            },
            {
                name: '럭셔리모텔2',
                location: {
                    address: '대전광역시 유성구',
                    detailAddress: '온천서로 30-10',
                },
                images: [],
                type: ResourceType.ACCOMMODATION,
                order: 1,
            },
            {
                name: '럭셔리모텔3',
                location: {
                    address: '대전광역시 유성구',
                    detailAddress: '온천서로 30-10',
                },
                images: [],
                type: ResourceType.ACCOMMODATION,
                order: 2,
            },
            {
                name: '럭셔리모텔4',
                location: {
                    address: '대전광역시 유성구',
                    detailAddress: '온천서로 30-10',
                },
                images: [],
                type: ResourceType.ACCOMMODATION,
                order: 3,
            },
            {
                name: '럭셔리모텔5',
                location: {
                    address: '대전광역시 유성구',
                    detailAddress: '온천서로 30-10',
                },
                images: [],
                type: ResourceType.ACCOMMODATION,
                order: 4,
            },
            {
                name: '럭셔리모텔6',
                location: {
                    address: '대전광역시 유성구',
                    detailAddress: '온천서로 30-10',
                },
                images: [],
                type: ResourceType.ACCOMMODATION,
                order: 5,
            },
        ],
    },
    {
        title: '11층 회의실',
        type: ResourceType.MEETING_ROOM,
        resources: [
            {
                name: '11층 대회의실',
                location: {
                    address: '11층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 0,
            },
            {
                name: '11층 중회의실',
                location: {
                    address: '11층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 1,
            },
            {
                name: '11층 소회의실',
                location: {
                    address: '11층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 2,
            },
            {
                name: '대표이사실',
                location: {
                    address: '11층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 3,
            },
        ],
    },
    {
        title: '5층 회의실',
        type: ResourceType.MEETING_ROOM,
        resources: [
            {
                name: '5층 회의실',
                location: {
                    address: '5층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 0,
            },
            {
                name: '5층 중회의실',
                location: {
                    address: '5층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 1,
            },
            {
                name: '5층 소회의실',
                location: {
                    address: '5층',
                    detailAddress: '',
                },
                images: [],
                type: ResourceType.MEETING_ROOM,
                order: 2,
            },
        ],
    },
];
