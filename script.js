// 향 데이터와 기준 설정
const perfumes = {
    Herb: { Main: ["라벤더", "로즈마리"], Sub: ["캐모마일", "티트리", "유칼립투스"] },
    Fruit: { Main: ["피치", "프레쉬 리얼 레몬"], Sub: ["블러썸 투나잇", "블랙 체리", "망고 만다린"] },
    Cloud: { Main: ["코튼 블라썸", "다우니 후레쉬"], Sub: ["초콜릿", "쁘띠마망", "화이트 린넨"] },
    Floral: { Main: ["로즈", "화이트 자스민"], Sub: ["화이트 가드니아", "체리블라썸", "일랑일랑"] }
};

// 서브 향 선정 알고리즘
function calculatePerfumes() {
    const resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = "<table><tr><th>이름</th><th>메인 향</th><th>서브 향 1</th><th>서브 향 2</th></tr>";

    for (let i = 1; i <= 12; i++) {
        const name = document.querySelector(`input[name="name${i}"]`).value;
        const q1 = document.querySelector(`input[name="q1_${i}"]`).value.split(',').map(x => x.trim());
        const q2_choice = document.querySelector(`input[name="q2_${i}_1"]`).value;
        const q3 = parseInt(document.querySelector(`select[name="q3_${i}"]`).value);
        const q4 = parseInt(document.querySelector(`select[name="q4_${i}"]`).value);
        const q5 = parseInt(document.querySelector(`select[name="q5_${i}"]`).value);

        // 메인 향 선정
        const mainCategory = q1[0];
        const mainPerfume = perfumes[mainCategory].Main[q2_choice - 1];

        // 서브 향 점수 계산
        const score = [q3, q4, q5].reduce((acc, val) => {
            if (val === 0) acc.low += 3;
            else if (val === 1) acc.low += 1, acc.mid += 1;
            else if (val === 2) acc.mid += 2;
            else if (val === 3) acc.mid += 1, acc.high += 1;
            else if (val === 4) acc.high += 3;
            return acc;
        }, { low: 0, mid: 0, high: 0 });

        // 서브 향 선정
        const subCategory = q1.slice(1, 3).map(c => perfumes[c]);
        const subPerfumes = subCategory.map((category) => {
            const sortedPerfumes = category.Sub.sort((a, b) => score[b] - score[a]);
            return sortedPerfumes[0];
        });

        resultTable.innerHTML += `<tr><td>${name}</td><td>${mainPerfume}</td><td>${subPerfumes[0]}</td><td>${subPerfumes[1]}</td></tr>`;
    }
    resultTable.innerHTML += "</table>";
}
