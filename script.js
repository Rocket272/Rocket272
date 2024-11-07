// 향 정보와 특성 정의
const scents = [
    { name: "캐모마일", levels: { high: 0, medium: 1, low: 2 }},
    { name: "티트리", levels: { high: 2, medium: 2, low: 1 }},
    { name: "유칼립투스", levels: { high: 2, medium: 1, low: 2 }},
    { name: "블라썸투나잇", levels: { high: 0, medium: 0, low: 3 }},
    { name: "블랙체리", levels: { high: 2, medium: 1, low: 1 }},
    { name: "망고만다린", levels: { high: 1, medium: 2, low: 1 }},
    { name: "초콜릿", levels: { high: 1, medium: 2, low: 1 }},
    { name: "쁘띠마망", levels: { high: 1, medium: 1, low: 2 }},
    { name: "화이트린넨", levels: { high: 2, medium: 1, low: 1 }},
    { name: "화이트가드니아", levels: { high: 1, medium: 1, low: 2 }},
    { name: "체리블라썸", levels: { high: 2, medium: 2, low: 1 }},
    { name: "일랑일랑", levels: { high: 2, medium: 1, low: 2 }}
];

// 질문 점수를 계산하는 함수
function calculateScores(responses) {
    let scores = { high: 0, medium: 0, low: 0 };
    responses.forEach(response => {
        if (response === "전혀 아니다") {
            scores.low += 3;
        } else if (response === "아니다") {
            scores.low += 1;
            scores.medium += 1;
        } else if (response === "보통이다") {
            scores.medium += 2;
        } else if (response === "그렇다") {
            scores.medium += 1;
            scores.high += 1;
        } else if (response === "매우 그렇다") {
            scores.high += 3;
        }
    });
    return scores;
}

// 서브 향 결정 함수
function determineSubScents(selectedGroup, responses) {
    const scoreTotals = calculateScores(responses);

    // 선택한 그룹에서 각 향의 점수 비교
    let subScents = [];
    scents.forEach(scent => {
        let scentScore = scent.levels.high * scoreTotals.high +
                         scent.levels.medium * scoreTotals.medium +
                         scent.levels.low * scoreTotals.low;
        subScents.push({ name: scent.name, score: scentScore });
    });

    // 점수 순으로 정렬하고 상위 2개의 서브 향을 선택
    subScents.sort((a, b) => b.score - a.score);

    // 동점일 경우 무작위 선택
    if (subScents[0].score === subScents[1].score) {
        return [subScents[0].name, subScents[1].name];
    } else {
        return [subScents[0].name, subScents[1].name];
    }
}

// 사용자 입력으로부터 응답을 수집하고 결과를 표시하는 함수
function calculateAndDisplayResults() {
    // 1번 질문: 향 그룹을 사용자가 선택했다고 가정
    const selectedGroup = document.getElementById("groupSelect").value;

    // 3,4,5번 질문 응답 가져오기
    const response3 = document.getElementById("response3").value;
    const response4 = document.getElementById("response4").value;
    const response5 = document.getElementById("response5").value;

    const responses = [response3, response4, response5];

    // 서브 향 계산
    const subScents = determineSubScents(selectedGroup, responses);

    // 결과를 화면에 표시
    document.getElementById("result").innerText = 
        `추천 서브 향: ${subScents[0]}와 ${subScents[1]}`;
}

// 버튼 클릭 시 계산 함수 실행
document.getElementById("calculateButton").addEventListener("click", calculateAndDisplayResults);


