import { ResourceType } from '@libs/enums/resource-type.enum';
import { Role } from '@libs/enums/role-type.enum';

export const employeesSeedData = [
    {
        name: '김종식',
        employeeNumber: '23027',
        position: '선임연구원',
        department: 'Web파트',
        email: 'kim.jongsik@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '우창욱',
        employeeNumber: '23047',
        position: '연구원',
        department: 'Web파트',
        email: 'woo.changuk@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '김민수',
        employeeNumber: '24008',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.minsu@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '김규현',
        employeeNumber: '24016',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.kyuhyun@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '김성훈',
        employeeNumber: '24017',
        position: '연구원',
        department: 'Web파트',
        email: 'kim.seonghun@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '조민경',
        employeeNumber: '24019',
        position: '연구원',
        department: 'Web파트',
        email: 'jo.minkyeong@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '이화영',
        employeeNumber: '24024',
        position: '연구원',
        department: 'Web파트',
        email: 'lee.hwayoung@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '황성빈',
        employeeNumber: '24048',
        position: '연구원',
        department: 'Web파트',
        email: 'hwang.sungbin@lumir.space',
        password: '1234',
        roles: [Role.USER],
    },
    {
        name: '박태연',
        employeeNumber: '22008',
        position: '책임매니저',
        department: '경영지원실',
        email: 'park.taeyeon@lumir.space',
        password: '1234',
        roles: [Role.USER, Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN],
    },
];

export const resourceGroupsSeedData = [
    {
        title: '회의실',
        description: '회의 공간',
        type: ResourceType.MEETING_ROOM,
    },
    {
        title: '차량',
        description: '업무용 차량',
        type: ResourceType.VEHICLE,
    },
    {
        title: '숙소',
        description: '숙소',
        type: ResourceType.ACCOMMODATION,
    },
];

export const subResourceGroupsSeedData = [
    {
        title: '법인 차량',
        description: '법인 차량',
        type: ResourceType.VEHICLE,
        order: 0,
    },
];

export const resourcesSeedData = [
    {
        name: '카니발 (12도 3456)',
        description: '법인 차량',
        type: ResourceType.VEHICLE,
        images: ['https://lumir-notification.storage.googleapis.com/rms/resource/1234567890.jpg'],
    },
];
