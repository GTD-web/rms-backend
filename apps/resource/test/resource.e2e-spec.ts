import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateResourceRequestDto } from '../src/modules/resource/common/application/dtos/create-resource-request.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceModule } from '@resource/modules/resource/resource.module';
import { Resource } from '@resource/modules/resource/common/domain/models/resource';
import { ResourceGroup } from '@resource/modules/resource/common/domain/models/resource-group';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG, default as databaseConfig } from '@libs/configs/env.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceManager } from '@resource/modules/resource/common/domain/models/resource-manager';
import { Entities } from '@libs/entities';

describe('ResourceController (e2e)', () => {
  let app: INestApplication;
  let createdResourceGroupId: string;
  const testEmployeeId = '123e4567-e89b-12d3-a456-426614174001';  // UUID 형식

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [databaseConfig, JWT_CONFIG],
        }),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'tech7admin!',
            database: 'resource-server',
            entities: Entities,
            synchronize: true,
          }),
        }),
        ResourceModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    await app.init();

    // 테스트 전에 리소스 그룹 생성하고 ID 저장
    const response = await request(app.getHttpServer())
      .post('/resource-groups')
      .send({
        title: 'Test Group',
        description: 'Test Group Description',
        type: 'VEHICLE'
      });

    createdResourceGroupId = response.body.resourceGroupId;  // 생성된 ID 저장
  });

  afterAll(async () => {
    // 리소스를 먼저 삭제한 후 리소스 그룹 삭제
    const resources = await request(app.getHttpServer()).get('/resources');
    for (const resource of resources.body) {
      await request(app.getHttpServer())
        .delete(`/resources/${resource.resourceId}`);
    }
    
    await request(app.getHttpServer())
      .delete(`/resource-groups/${createdResourceGroupId}`);
    await app.close();
  });

  describe('/resources (POST)', () => {
    it('should create a new resource', () => {
      const createDto: CreateResourceRequestDto = {
        resource: {
          resourceGroupId: createdResourceGroupId,
          name: 'Test Resource',
          description: 'Test Description',
          notifyParticipantChange: true,
          notifyReservationChange: true,
        },
        typeInfo: {
          leftMileage: 1000,
          totalMileage: 5000,
        },
        managers: [
          { employeeId: testEmployeeId },  // UUID 형식 사용
        ],
      };

      return request(app.getHttpServer())
        .post('/resources')
        .send(createDto)
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty('resourceId');
          expect(res.body.name).toBe(createDto.resource.name);
        });
    });
  });

  describe('/resources (GET)', () => {
    it('should return an array of resources', () => {
      return request(app.getHttpServer())
        .get('/resources')
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });
}); 