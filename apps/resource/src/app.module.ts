import { Module } from '@nestjs/common';
import { AuthModule } from '@resource/modules/auth/auth.module';
import { ResourcesModule } from '@resource/modules/resources/resources.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [EventEmitterModule.forRoot(), AuthModule, ResourcesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
