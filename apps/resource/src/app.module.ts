import { Module } from '@nestjs/common';
import { AuthModule } from '@resource/modules/auth/auth.module';
import { ResourcesModule } from '@resource/modules/resources/resources.module';

@Module({
    imports: [AuthModule, ResourcesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
