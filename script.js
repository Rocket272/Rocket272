function submitForm() {
    const form = document.forms['surveyForm'];
    const name = form['name'].value;
    const q1 = form['q1'].value;
    const q2 = form['q2'].value;
    const q3 = form['q3'].value;

    // 메인 향 결정
    const mainScent = determineMainScent(q1, q2);
    // 서브 향 결정 (간단한 로직으로 예시)
    const subScents = determineSubScents(q1, q3);

    document.getElementById('results').innerHTML = `
        <h3>추천 결과</h3>
        <p>이름: ${name}</p>
        <p>메인 향: ${mainScent}</p>
        <p>서브 향 1: ${subScents[0]}</p>
        <p>서브 향 2: ${subScents[1]}</p>
    `;
}

function determineMainScent(q1, q2) {
    const scents = {
        "Herb": ["라벤더", "로즈마리"],
        "Fruit": ["피치", "프레쉬 리얼 레몬"],
        "Cloud": ["코튼블라썸", "다우니 후레쉬"],
        "Floral": ["로즈", "화이트 자스민"]
    };
    return q2 === "first" ? scents[q1][0] : scents[q1][1];
}

function determineSubScents(q1, q3) {
    const subOptions = {
        "Herb": ["캐모마일", "티트리", "유칼립투스"],
        "Fruit": ["블러썸투나잇", "블랙체리", "망고만다린"],
        "Cloud": ["초콜릿", "쁘띠마망타입", "화이트린넨"],
        "Floral": ["화이트가드니아", "체리블라썸", "일랑일랑"]
    };
    // 간단히 상위 두 가지 서브 향을 선택하는 방식
    return subOptions[q1].slice(0, 2);
}
