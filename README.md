원티드 프리온보딩 프론트엔드 코스 사전과제

### 프로젝트 실행
---

 1. npm install
 2. npm start

---
### 배포링크
---



---
## 사용한 라이브러리
---

1. React
2. React Router
3. Styled-components
4. Axios

---
## 페이지 설명
---

<img width="700" alt="login" src="https://user-images.githubusercontent.com/63627617/195497116-f78be585-0cb8-44c6-9767-77490326702a.png">

- 로그인 / 회원가입 페이지
- 유효성
 1. 이메일(@포함)
 2. 비밀번호(8자 이상)
- 유효성 조건을 성립하지 않으면 버튼 비활성화
- 로그인 성공 시 로컬 스토리지에 TOKEN 저장
- 최초 접속 시 로컬스토리지에 토큰이 존재하면 /todo 경로로 리다이렉트

---

<img width="700" alt="todolist" src="https://user-images.githubusercontent.com/63627617/195497559-4b6d298a-081b-45e3-b12d-b8f24b92823a.png">

- /todo 접속 페이지
- "Enter a todo" input에 리스트 항목을 작성하여 등록 버튼 클릭시 리스트에 추가
- 리스트의 첫번째 체크 아이콘 클릭시 할일이 수정됨
- 리스트의 두번째 수정하기 아이콘 클릭시 항목 내용 수정
- 리스트의 세번째 휴지통 아이콘 클릭시 항목 삭제
