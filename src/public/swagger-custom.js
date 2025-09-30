/**
 * Swagger UI 커스텀 스크립트
 * 이 파일은 Swagger UI가 로드된 후 실행됩니다.
 */

// Swagger UI가 완전히 로드될 때까지 기다림
window.addEventListener('load', function () {
    console.log('🎯 Swagger 커스텀 스크립트 로드됨');

    // Swagger UI 요소가 로드될 때까지 기다림
    function waitForSwaggerUI() {
        const swaggerContainer = document.querySelector('.swagger-ui');
        if (swaggerContainer) {
            initializeCustomFeatures();
        } else {
            setTimeout(waitForSwaggerUI, 100);
        }
    }

    waitForSwaggerUI();
});

async function initializeCustomFeatures() {
    console.log('🚀 Swagger 커스텀 기능 초기화');

    // 첫 번째 검사 즉시 실행
    await performApiCheck();

    // 10분마다 주기적으로 검사 실행
    setInterval(async () => {
        const result = await performApiCheck();
        console.log('🔍 result:', result);
        if (!result) {
            if (confirm('API 문서가 수정되었습니다. 새로고침 하시겠습니까?')) {
                window.location.reload();
            }
        }
    }, 10 * 1000);
}

async function performApiCheck() {
    try {
        console.log('🔍 API 일치성 검사 시작...');

        if (!window.ui) {
            console.warn('⚠️ window.ui가 아직 준비되지 않았습니다.');
            return false;
        }

        // SwaggerUI 객체에서 직접 스펙 확인
        const windowPaths = window.ui.getSystem().specSelectors.specJson().toJS().paths;

        const serverRoutes = await getServerRouteList();
        console.log('🔍 windowPaths:', windowPaths);
        console.log('🔍 serverRoutes:', serverRoutes);
        console.log(JSON.stringify(windowPaths) === JSON.stringify(serverRoutes));
        return JSON.stringify(windowPaths) === JSON.stringify(serverRoutes);
    } catch (error) {
        console.error('❌ API 검사 중 오류:', error);
        return false;
    }
}

// 서버의 실제 라우트 목록 가져오기
async function getServerRouteList() {
    try {
        // 현재 페이지의 호스트와 포트를 자동으로 감지
        const currentUrl = new URL(window.location.href);
        const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
        const debugUrl = `${baseUrl}/api-docs-json`;

        console.log(`🌐 서버 라우트 요청 URL: ${debugUrl}`);

        const response = await fetch(debugUrl);
        if (!response.ok) {
            throw new Error(`서버 라우트 조회 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('🔍 data:', data);

        return data.paths;
    } catch (error) {
        console.error('서버 라우트 목록 가져오기 실패:', error);
        throw error;
    }
}
