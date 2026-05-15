# subject2_todoapps — 할 일(Todo) 웹 앱

바닐라 HTML/CSS/JavaScript로 만든 Todo 앱입니다. 아래는 과제·학습 보고용으로 정리한 **프롬프트 및 AI 협업 기록**입니다.

---

## 1. 사용한 프롬프트

대화에서 사용한 요청을 순서대로 요약합니다.

1. **화면 구조 1단계** — 자바스크립트로 Todo 앱을 만들 예정이며, 우선 **제목 영역**을 만들어 달라는 요청.
2. **입력창** — Todo **입력창** 추가 요청.
3. **목록 영역** — Todo **목록 영역** 추가 요청.
4. **상태 표시 영역** — **상태 표시 영역** 추가 요청.
5. **DOM 선택자·연결 확인** — `document.querySelector("#todoInput")` 등 예시와 같이 **HTML id와 JS 선택자 일치**, `#` 누락 여부, **`script.js` HTML 연결**을 맞춰 달라는 요청.
6. **3단계 코드** — `let todos = []`, `addTodo(text)`에서 `Date.now()`, `text`, `completed: false` 구조를 반영해 달라는 요청.
7. **4단계 코드** — `addButton.addEventListener("click", …)` 안에서 빈 문자열이면 `alert`, `addTodo`, 입력 비우기, **`renderTodos()`** 호출 흐름을 연결해 달라는 요청.
8. **5단계 코드** — `renderTodos`에서 `innerHTML` 초기화 후 `forEach`로 **`div`**를 만들어 `textContent`로 붙이는 형태로 렌더링해 달라는 요청.
9. **6단계 코드** — `toggleTodo(id)`, `deleteTodo(id)` 및 **`renderTodos()`**와 연동해 **완료·삭제** 기능을 연결해 달라는 요청.
10. **README** — 본 문서처럼 `README.md`에 **프롬프트 / 사용·수정·직접 변경·비AI 해결** 항목을 포함해 달라는 요청.
11. **GitHub 연동** — 프로젝트를 GitHub 저장소로 업로드하고 로컬과 연결해 달라는 요청.
12. **UI/UX 진단** — 20년 차 전문가 시선으로 현재 앱의 개선 사항을 진단해 달라는 요청.
13. **디자인 고도화** — 인디고 테마, 입체적인 레이아웃, 아이콘 도입 및 애니메이션을 포함한 디자인 고도화 요청.
14. **헤더 커스텀** — "할 일 목록" 텍스트를 유지하면서, 그라데이션과 동적 날짜를 포함한 감성적인 헤더 디자인 변경 요청.

---

## 2. AI가 제안한 코드 중 사용한 부분

- **전체 구조**: `index.html` + `css/style.css` + 루트 `script.js` 분리, `main` 안에 헤더·입력·목록·상태(푸터) 순 배치.
- **데이터 모델(3단계)**: `let todos`, `addTodo`에서 `{ id: Date.now(), text, completed: false }` 후 `push`.
- **4단계**: `addButton` 클릭 시 `trim()` → 빈 문자열이면 `alert("할 일을 입력해 주세요.")` → `addTodo(text)` → 입력값 초기화 → `renderTodos()`.
- **5단계 핵심**: `renderTodos`에서 `todoList.innerHTML = ""` 후 `todos.forEach`로 요소 생성·`appendChild`.
- **6단계 핵심**: `toggleTodo`에서 `find` 후 `completed` 반전, `deleteTodo`에서 `filter`로 제거, 둘 다 마지막에 `renderTodos()` 호출.

---

## 3. AI가 제안했지만 수정한 부분

- **목록 컨테이너**: 과제 예시는 `div` 항목을 그대로 쓰는 형태였으나, 초기에는 `ul`/`li`를 쓰다가 **`div#todoList`**로 바꿔 `div` 자식만 쓰는 HTML에 맞춤(유효한 마크업 유지).
- **추가 버튼 `type`**: `submit`이면 클릭과 폼 `submit`이 겹칠 수 있어 **`type="button"`**으로 바꾸고, Enter는 `keydown`에서 `addButton.click()`으로 같은 로직을 타게 함.
- **`toggleTodo` 안전장치**: 예시에는 없지만, `find` 결과가 없을 때 런타임 오류를 막기 위해 **`if (!todo) return;`** 한 줄 추가.
- **`renderTodos` 확장(5단계 이후)**: 예시의 “텍스트만 있는 `div`”에서 한 단계 나아가, 6단계에 맞게 **행(`todo-row`) + 체크박스 + 텍스트 + 삭제 버튼**을 그리도록 확장하고, **`#todoList`에 `change`/`click` 위임**으로 `toggleTodo`·`deleteTodo`와 연결.
- **전역 DOM 참조**: `renderTodos`·`updateStatus`·`toggleTodo`·`deleteTodo`가 `DOMContentLoaded` 이후에도 동작하도록 **`todoListEl` 등**을 파일 상단에서 잡아 두는 패턴으로 조정.

---

## 4. 직접 이해하고 바꾼 부분

*(저장소를 본인만 수정했다면, 아래를 본인 경험에 맞게 고치면 됩니다.)*

- **과제 스펙과 DOM 일치**: 교재·과제에 나온 `#todoInput`, `#addButton`, `#todoList`, `#todoCount` 이름과 **`script.js` 로드**를 기준으로 HTML id·`src`를 맞추는 과정을 이해하고 적용함.
- **이벤트 흐름**: 클릭만으로 추가할지, 폼 `submit`과 어떻게 나눌지 비교한 뒤, **`type="button"` + Enter 시 `click()`** 조합을 선택한 이유를 정리함.
- **완료 토글과 체크박스**: 브라우저가 체크박스 상태를 먼저 바꾼 뒤 `change`가 발생함을 전제로, **`toggleTodo`가 데이터를 뒤집고 `renderTodos`로 다시 그리면** 화면과 `todos`가 일치함을 확인함.

---

## 5. AI 도움 없이 직접 해결한 부분

*(실제로 스스로 디버깅·검증한 내용이 있으면 적어 주세요. 없다면 “해당 없음”으로 두고, 나중에 보충하면 됩니다.)*

- **예시**: 브라우저에서 `index.html`을 연 뒤 추가·체크·삭제·빈 입력 시 `alert` 동작을 직접 눌러 확인함.
- **예시**: 개발자 도구 콘솔에 오류가 없는지, `querySelector`가 `null`이 아닌지 확인함.

---

## 실행 방법

1. 저장소 루트의 `index.html`을 브라우저로 연다.  
2. 또는 로컬 정적 서버로 루트를 연다(경로 문제 방지).

## 파일 구성

| 경로 | 설명 |
|------|------|
| `index.html` | 마크업, `script.js` 연결 |
| `css/style.css` | 레이아웃·입력·목록·상태 영역 스타일 |
| `script.js` | Todo 데이터, 렌더링, 이벤트 |
