import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResourceService } from '../../application/services/resource.service';
import { CreateResourceDto, UpdateResourceDto } from '../dtos/resource.dto';

@Controller('resources')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    // API 엔드포인트 구현 예정
}
