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

function calculatePerfumes() {
    const resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = "<table><tr><th>이름</th><th>메인 향</th><th>서브 향 1</th><th>서브 향 2</th></tr>";

    for (let i = 1; i <= 12; i++) {
        const name = document.querySelector(`input[name="name${i}"]`).value;
        const q1 = document.querySelector(`input[name="q1_${i}"]`).value.split(',').map(x => x.trim());
        const q2_choice = parseInt(document.querySelector(`select[name="q2_${i}"]`).value);
        const q3 = parseInt(document.querySelector(`select[name="q3_${i}"]`).value);
        const q4 = parseInt(document.querySelector(`select[name="q4_${i}"]`).value);
        const q5 = parseInt(document.querySelector(`select[name="q5_${i}"]`).value);

        const mainCategory = q1[0];
        const mainPerfume = perfumes[mainCategory].Main[q2_choice - 1];

        const subCategoryGroups = q1.slice(1, 3);
        const scores = [q3, q4, q5];
        const subScores = { low: 0, mid: 0, high: 0 };

        scores.forEach(score => {
            if (score === 0) subScores.low += 3;
            else if (score === 1) { subScores.low += 1; subScores.mid += 1; }
            else if (score === 2) subScores.mid += 2;
            else if (score === 3) { subScores.mid += 1; subScores.high += 1; }
            else if (score === 4) subScores.high += 3;
        });

        const selectedSubPerfumes = subCategoryGroups.map(category => {
            const subOptions = perfumes[category].Sub;
            const scoredSubOptions = subOptions.map(sub => ({
                name: sub,
                score: subPerfumeScores[sub][0] * subScores.low + subPerfumeScores[sub][1] * subScores.mid + subPerfumeScores[sub][2] * subScores.high
            }));
            scoredSubOptions.sort((a, b) => b.score - a.score);
            return scoredSubOptions[0].name;
        });

        resultTable.innerHTML += `<tr><td>${name}</td><td>${mainPerfume}</td><td>${selectedSubPerfumes[0]}</td><td>${selectedSubPerfumes[1]}</td></tr>`;
    }
    resultTable.innerHTML += "</table>";
}
