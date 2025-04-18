docker-compose -f docker-compose.yml up -d --build --force-recreate

docker compose push resource-server

개발 서버 API 문서 http://192.168.10.168:5001/api-docs

# 리소스 관리 시스템 성능 테스트

이 프로젝트는 리소스 관리 시스템의 성능 테스트를 위한 k6 스크립트를 포함하고 있습니다.

## 사전 요구 사항

- [k6](https://k6.io/docs/getting-started/installation/) 설치
- 테스트 대상 서버 실행 중 (기본값: http://localhost:3060)

## 테스트 스크립트 구성

각 시나리오별로 별도의 테스트 스크립트가 제공됩니다:

1. **사용자 인증 부하 테스트** (`scenario1-auth-test.js`)

    - 목적: 다수 사용자의 동시 로그인 처리 성능 측정
    - 테스트 패턴: 초당 50~100명의 사용자가 동시에 로그인 시도

2. **리소스 조회 부하 테스트** (`scenario2-resource-lookup.js`)

    - 목적: 다수 사용자의 리소스 목록 및 상세 조회 성능 측정
    - 테스트 패턴: 다양한 필터링 조건으로 리소스 목록 조회

3. **예약 생성 부하 테스트** (`scenario3-reservation-creation.js`)

    - 목적: 동시다발적 예약 생성 시 성능 및 데이터 무결성 검증
    - 테스트 패턴: 동일 리소스에 대한 비슷한 시간대 예약 요청 다수 발생

4. **알림 발송 부하 테스트** (`scenario4-notification-test.js`)

    - 목적: 다수의 알림이 동시에 발송될 때의 시스템 성능 측정
    - 테스트 패턴: 예약 시작 시간이 비슷한 다수의 예약에 대한 알림 발송

5. **복합 워크플로우 테스트** (`scenario5-complex-workflow.js`)
    - 목적: 실제 사용 패턴을 시뮬레이션하여 종합적인 시스템 성능 측정
    - 테스트 패턴: 로그인, 리소스 조회, 예약 생성, 예약 수정, 알림 확인 등의 연속 작업

## API URL 구성

모든 API URL은 `config.js` 파일에서 중앙 관리됩니다:

- 기본 URL은 `http://localhost:3060`으로 설정되어 있으나, 환경 변수로 재정의할 수 있습니다.
- 다른 서버를 테스트하려면 실행 시 환경 변수 `API_BASE_URL`을 설정하세요:

```bash
# 특정 서버로 API_BASE_URL 설정하여 실행
API_BASE_URL=http://192.168.10.168:3060 ./run-performance-tests.sh

# 또는 개별 테스트 실행 시
k6 run scenario1-auth-test.js --env API_BASE_URL=http://192.168.10.168:3060
```

## 테스트 실행 방법

### 개별 시나리오 실행

각 시나리오를 개별적으로 실행하려면:

```bash
k6 run scenario1-auth-test.js
```

### 모든 시나리오 실행

모든 시나리오를 순차적으로 실행하려면:

```bash
chmod +x run-performance-tests.sh
./run-performance-tests.sh
```

## 테스트 결과 확인

실행 결과는 콘솔에 출력되며, `--out json=<파일명>` 옵션을 사용하여 JSON 형식으로 저장할 수 있습니다:

```bash
k6 run scenario1-auth-test.js --out json=results/auth-test-result.json
```

스크립트를 사용하여 모든 테스트를 실행하면 결과는 `performance-results` 디렉토리에 자동으로 저장됩니다.

## 테스트 커스터마이징

각 스크립트 내의 다음 부분을 수정하여 테스트를 조정할 수 있습니다:

- `options` 객체: 가상 사용자 수, 단계별 지속 시간, 임계값 등
- `config.js`에서 API 엔드포인트 중앙 관리
- 테스트 데이터: 사용자 계정, 리소스 ID 등

## 주의 사항

- 성능 테스트는 실제 데이터베이스에 데이터를 생성하거나 수정할 수 있으므로, 가급적 테스트 환경에서만 실행하세요.
- 높은 부하 테스트는 서버의 성능에 영향을 줄 수 있으므로 운영 환경에서는 주의해서 실행하세요.
- 실제 환경에서 테스트하기 전에 테스트 계정과 리소스 ID를 실제 존재하는 값으로 업데이트하세요.
