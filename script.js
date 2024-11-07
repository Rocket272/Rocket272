function calculateRecommendations() {
  const users = document.querySelectorAll("#user-table tbody tr");
  const resultsBody = document.getElementById("result-body");

  resultsBody.innerHTML = "";  // 결과 테이블 초기화

  users.forEach((row, index) => {
    const name = row.querySelector(".name").value;
    const rank = row.querySelector(".rank").value.split(",");  // 'A,B,C,D' 형식으로 입력
    const choices = row.querySelector(".choices").value.split(",");
    const responses = row.querySelectorAll(".response");

    // 각 응답의 점수 계산
    let scoreLower = 0, scoreMedium = 0, scoreHigher = 0;
    responses.forEach(response => {
      const value = response.value;
      if (value === "전혀 아니다") scoreLower += 3;
      else if (value === "아니다") { scoreLower += 1; scoreMedium += 1; }
      else if (value === "보통이다") scoreMedium += 2;
      else if (value === "그렇다") { scoreMedium += 1; scoreHigher += 1; }
      else if (value === "매우 그렇다") scoreHigher += 3;
    });

    // 메인 향과 서브 향 결정 (예시 - 사용자 지정 필요)
    const mainFragrance = rank[0] || "기본 향";
    const subFragrance1 = choices[0] || "기본 서브향 1";
    const subFragrance2 = choices[1] || "기본 서브향 2";

    // 결과 테이블에 추가
    const resultRow = `
      <tr>
        <td>${name}</td>
        <td>${mainFragrance}</td>
        <td>${subFragrance1}</td>
        <td>${subFragrance2}</td>
      </tr>
    `;
    resultsBody.innerHTML += resultRow;
  });
}

