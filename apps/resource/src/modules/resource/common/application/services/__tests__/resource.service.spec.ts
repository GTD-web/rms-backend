import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ResourceService } from '../resource.service';
import { ResourceGroupService } from '../resource-group.service';
import { ResourceManagerService } from '../resource-manager.service';
import { CreateResourceRequestDto } from '../../dtos/create-resource-request.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceGroup } from '@resource/modules/resource/common/domain/models/resource-group';

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let resourceGroupService: ResourceGroupService;
  let resourceManagerService: ResourceManagerService;
  let resourceRepository: any;
  let dataSource: DataSource;

  const mockResourceRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockResourceManagerRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByResourceId: jest.fn(),
    findByEmployeeId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteByResourceId: jest.fn(),
  };

  const mockTypeHandlers = new Map();
  mockTypeHandlers.set(ResourceType.VEHICLE, {
    createTypeInfo: jest.fn().mockResolvedValue({}),
    updateTypeInfo: jest.fn().mockResolvedValue({}),
    deleteTypeInfo: jest.fn().mockResolvedValue({}),
    getTypeInfo: jest.fn().mockResolvedValue({}),
  });

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: jest.fn(),
      findOne: jest.fn(),
    }
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: 'ResourceRepositoryPort',
          useValue: mockResourceRepository,
        },
        {
          provide: 'ResourceManagerRepositoryPort',
          useValue: mockResourceManagerRepository,
        },
        {
          provide: ResourceGroupService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ResourceManagerService,
          useValue: {
            updateManagers: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: 'ResourceTypeHandlers',
          useValue: mockTypeHandlers,
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
          },
        },
      ],
    }).compile();

    resourceService = moduleRef.get<ResourceService>(ResourceService);
    resourceGroupService = moduleRef.get<ResourceGroupService>(ResourceGroupService);
    resourceManagerService = moduleRef.get<ResourceManagerService>(ResourceManagerService);
    resourceRepository = moduleRef.get('ResourceRepositoryPort');
    dataSource = moduleRef.get<DataSource>(DataSource);
    
    // 각 테스트 전에 mock 함수들 초기화
    jest.clearAllMocks();
  });

  describe('createResourceWithDetails', () => {
    it('should create a resource with all details', async () => {
      // Given
      const createDto: CreateResourceRequestDto = {
        resource: {
          resourceGroupId: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Test Resource',
          description: 'Test Description',
          notifyParticipantChange: true,
          notifyReservationChange: true,
        },
        typeInfo: {
          leftMileage: 1000,
          totalMileage: 5000,
          insuranceName: 'Test Insurance',
          insuranceNumber: '123456',
        },
        managers: [
          { employeeId: 'emp-1' },
          { employeeId: 'emp-2' },
        ],
      };

      const mockGroup = new ResourceGroup({
        resourceGroupId: 'group-1',
        title: 'Test Group',
        type: ResourceType.VEHICLE
      });

      // Mock 설정
      jest.spyOn(resourceGroupService, 'findOne').mockResolvedValue(mockGroup);
      mockQueryRunner.manager.save.mockImplementation((entity) => Promise.resolve({
        resourceId: 'resource-1',
        ...createDto.resource,
        type: ResourceType.VEHICLE,
        resourceGroup: mockGroup,
        managers: createDto.managers.map(m => ({
          resourceManagerId: `rm-${m.employeeId}`,
          resourceId: 'resource-1',
          employeeId: m.employeeId
        }))
      }));
      jest.spyOn(resourceManagerService, 'updateManagers').mockResolvedValue(undefined);

      // When
      const result = await resourceService.createResourceWithDetails(createDto);

      // Then
      // 1. 리소스 그룹 조회 검증
      expect(resourceGroupService.findOne).toHaveBeenCalledWith('group-1');

      // 2. 트랜잭션 처리 검증
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();

      // 3. 자원 저장 검증
      expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createDto.resource,
          type: ResourceType.VEHICLE
        })
      );

      // 4. 타입별 정보 저장 검증
      expect(mockTypeHandlers.get(ResourceType.VEHICLE).createTypeInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceId: 'resource-1',
          type: ResourceType.VEHICLE
        }),
        createDto.typeInfo
      );

      // 5. 최종 결과 검증
      expect(result).toEqual(
        expect.objectContaining({
          resourceId: 'resource-1',
          name: createDto.resource.name,
          type: ResourceType.VEHICLE
        })
      );
    });

    it('should rollback transaction when error occurs', async () => {
      // Given
      const createDto: CreateResourceRequestDto = {
        resource: {
          resourceGroupId: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Test Resource',
          description: 'Test Description',
          notifyParticipantChange: true,
          notifyReservationChange: true,
        },
        typeInfo: {
          leftMileage: 1000,
          totalMileage: 5000,
        },
        managers: [{ employeeId: 'emp-1' }]
      };

      const mockGroup = new ResourceGroup({
        resourceGroupId: 'group-1',
        title: 'Test Group',
        type: ResourceType.VEHICLE
      });

      jest.spyOn(resourceGroupService, 'findOne').mockResolvedValue(mockGroup);
      mockQueryRunner.manager.save.mockRejectedValue(new Error('DB Error'));

      // When & Then
      await expect(resourceService.createResourceWithDetails(createDto))
        .rejects
        .toThrow('Failed to create resource');

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });
}); 