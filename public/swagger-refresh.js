(function () {
    const interval = 3000; // 3초 간격
    const ping = async () => {
        try {
            const res = await fetch('/api/version'); // 서버 헬스 체크 엔드포인트
            if (!res.ok) throw new Error();
        } catch (err) {
            if (confirm('서버와 연결이 끊어졌습니다. 새로고침하시겠습니까?')) {
                location.reload();
            }
        }
    };
    setInterval(ping, interval);
})();
