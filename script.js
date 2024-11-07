const perfumes = {
    Herb: { Main: ["라벤더", "로즈마리"], Sub: ["캐모마일", "티트리", "유칼립투스"] },
    Fruit: { Main: ["피치", "프레쉬 리얼 레몬"], Sub: ["블라썸투나잇", "블랙체리", "망고만다린"] },
    Cloud: { Main: ["코튼블라썸", "다우니 후레쉬"], Sub: ["초콜릿", "쁘띠마망", "화이트린넨"] },
    Floral: { Main: ["로즈", "화이트 자스민"], Sub: ["화이트가드니아", "체리블라썸", "일랑일랑"] }
};

const subPerfumeScores = {
    캐모마일: [3, 1, 3],
    티트리: [5, 5, 4],
    유칼립투스: [4, 3, 5],
    블라썸투나잇: [3, 3, 5],
    블랙체리: [5, 4, 3],
    망고만다린: [4, 5, 4],
    초콜릿: [4, 5, 3],
    쁘띠마망: [3, 4, 5],
    화이트린넨: [5, 3, 4],
    화이트가드니아: [3, 4, 3],
    체리블라썸: [5, 5, 4],
    일랑일랑: [4, 3, 5]
};

function calculateRecommendations() {
    const users = document.querySelectorAll("#user-table tbody tr");
    const resultsBody = document.getElementById("result-body");

    // 기존 결과 초기화
    resultsBody.innerHTML = "";  

    users.forEach(row => {
        const name = row.querySelector(".name").value.trim();
        const rank = row.querySelector(".rank").value.split(",").map(x => x.trim());
        const choice = row.querySelector(".choice").value;
        const responses = row.querySelectorAll(".response");

        // 이름이나 순위가 비어있는 경우 예외 처리
        if (!name || rank.length !== 4 || !perfumes[rank[0]]) {
            const resultRow = `<tr><td colspan="4">이름 또는 입력값이 잘못되었습니다. 확인해 주세요.</td></tr>`;
            resultsBody.innerHTML += resultRow;
            return;
        }

        // 응답을 통해 점수 계산
        let scoreLower = 0, scoreMedium = 0, scoreHigher = 0;
        responses.forEach(response => {
            const value = response.value;
            if (value === "전혀 아니다") scoreLower += 3;
            else if (value === "아니다") { scoreLower += 1; scoreMedium += 1; }
            else if (value === "보통이다") scoreMedium += 2;
            else if (value === "그렇다") { scoreMedium += 1; scoreHigher += 1; }
            else if (value === "매우 그렇다") scoreHigher += 3;
        });

        // 메인 향 결정
        const mainCategory = rank[0];
        const mainPerfume = perfumes[mainCategory].Main[choice - 1];

        // 서브 향 결정
        const subCategories = rank.slice(1, 3); // 서브 향 그룹 두 개 선택
        const selectedSubPerfumes = subCategories.map(category => {
            const subOptions = perfumes[category].Sub;
            const scoredSubOptions = subOptions.map(sub => ({
                name: sub,
                score: subPerfumeScores[sub][0] * scoreLower + subPerfumeScores[sub][1] * scoreMedium + subPerfumeScores[sub][2] * scoreHigher
            }));
            scoredSubOptions.sort((a, b) => b.score - a.score);
            return scoredSubOptions[0].name;
        });

        // 결과 행 생성 및 출력
        const resultRow = `
          <tr>
            <td>${name}</td>
            <td>${mainPerfume}</td>
            <td>${selectedSubPerfumes[0]}</td>
            <td>${selectedSubPerfumes[1]}</td>
          </tr>
        `;
        resultsBody.innerHTML += resultRow;
    });
}
