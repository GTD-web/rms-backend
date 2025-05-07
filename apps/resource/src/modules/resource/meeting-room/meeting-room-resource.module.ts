import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingRoomInfo } from '@libs/entities';
import { MeetingRoomResourceHandler } from './application/handlers/meeting-room-resource.handler';
import { MeetingRoomInfoService } from './application/services/meeting-room-info.service';
import { MeetingRoomInfoRepository } from './infrastructure/adapters/out/persistence/meeting-room-info.repository';
import { MeetingRoomInfoController } from './infrastructure/adapters/in/web/controllers/meeting-room-info.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MeetingRoomInfo])],
    providers: [
        MeetingRoomResourceHandler,
        MeetingRoomInfoService,
        MeetingRoomInfoRepository,
        {
            provide: 'MeetingRoomInfoRepositoryPort',
            useExisting: MeetingRoomInfoRepository,
        },
    ],
    controllers: [],
    exports: [MeetingRoomResourceHandler, MeetingRoomInfoService],
})
export class MeetingRoomResourceModule {}
