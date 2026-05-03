# PRD — Math Routine (가칭)

> 매일 10분, 미국 3-4학년을 위한 수학 루틴 웹앱.
> 이 문서 한 장이면 처음부터 다시 만들 수 있도록 작성.

**버전:** 1.0
**작성:** Diro (Product Director)
**참조 문서:** `BRAND-DNA.md` (디자인 헌법)

---

## 1. 한 줄 요약

> **"이미 Khan Academy/IXL을 쓰지만 아이가 자기 주도로 안 하는 미국 3-4학년 부모를 위한, 매일 10분 분수 루틴 웹앱. 회원가입 없음."**

차별화 한 단어: **루틴** (콘텐츠 X, 게임화 X, 진도 추적 X)

---

## 2. 문제

부모 시점:
- "Khan/IXL 콘텐츠는 충분한데 아이가 자기 주도로 안 한다."
- "스크린타임 죄책감 vs 학습 효과 사이에서 갈등."
- "또 다른 SaaS 결제는 부담."
- "매일 5분 이상 부모가 신경 쓰고 싶지 않다."

아이 시점:
- "진도, 보상 게임, 캐릭터에 질렸다 ('babyish')."
- "긴 학습 세션은 집중 안 된다 (8-12분이 한계)."
- "친구·반과 비교당하는 건 싫다."

우리가 푸는 것:
> **"오늘 했다"는 한 줄.** 콘텐츠가 아니라 *오늘 하게 만드는 것*이 진짜 일.

---

## 3. 타겟 사용자

### 일차 사용자 (1차 의사결정자): 부모
- 30대 후반 ~ 40대 초반
- 미국 거주
- 자녀: 3-4학년 (9-10세)
- "스크린타임 죄책감"과 "학습 격차 우려" 둘 다 있음
- 월 $5-10 결제 가능 (단, 첫 버전은 무료)

### 이차 사용자 (실 사용자): 자녀
- 9-10세 (3-4학년)
- 인지: "babyish" 거부 시작 시점
- 주의 지속: 8-12분 sweet spot
- 동기: 외적 보상보다 *능력감*이 더 강해짐

> 핵심 원칙: 두 사용자가 같은 화면을 다른 시간·다른 마음으로 본다.
> 부모는 "안심", 아이는 "존중"이 필요.

---

## 4. JTBD (Jobs To Be Done)

```
When 9-10세 자녀가 방과 후 자유시간이 있을 때,
I want to 자녀가 자기 주도로 매일 10분 수학을 (게임 영상 보는 대신) 하길 원하고,
So I can 학교 진도에서 뒤처지지 않고 부모로서 안심한다.
```

| 작용력 | 강도 | 메모 |
|---|---|---|
| Push (지금 불만) | 중 | "공부했는데 점수 안 오름" |
| Pull (끌림) | 강 | AI 24/7 + 개인화 |
| Anxiety (불안) | 중 | "이게 학교 커리큘럼과 맞나?" |
| Habit (관성) | 강 | Khan/IXL 락인 |

---

## 5. Anti-Brand — 무엇이 *아닌가*

| ❌ 우리는 ~이 아니다 | 왜 |
|---|---|
| Prodigy 같은 게임형 학습 | 보상 게임이 학습 자체를 묻어버림 |
| Duolingo 같은 vibe-loud 캐릭터 | 부엉이 알림 = 잔소리 |
| Khan Academy 같은 콘텐츠 라이브러리 | 우리는 콘텐츠가 아닌 *루틴* |
| IXL 같은 학교용 그리드 | 산업적·차가움 |
| Notion 같은 productivity 미학 | 너무 어른용 |
| 그라데이션·이모지 장식 | AI 슬롭 |
| "잘했어!" 무한 긍정 | 9-10세는 가짜 칭찬 감지 |

---

## 6. v1 기능 (3개만)

```
1. 매일 10분 = 개념 2분 + 연습 5문제 (8분)
2. 7일 스트릭 (LocalStorage)
3. 약점 추적 (LocalStorage, 같은 기기 한정)
```

### 의도적으로 *제외*된 것

| 항목 | 이유 |
|---|---|
| 회원가입 | v1은 진입장벽 0 |
| 부모 푸시 알림 | 회원가입 후 v2 |
| 부모 주간 요약 이메일 | 회원가입 후 v2 |
| Khan/IXL 외부 링크 | v2 |
| 다중 자녀 분리 | v2 |
| 기기 간 동기화 | v2 (LocalStorage 한계) |
| 게임화 (XP, 레벨, 캐릭터) | 영구 제외 (브랜드 위배) |
| 광고 | 영구 제외 |
| 다중 단원 | v1은 분수만 |

---

## 7. 화면 구조 (5개)

### 라우트 맵

```
/                       시작 화면
/day/[1-14]/concept     개념 화면
/day/[1-14]/q/[0-4]     문제 화면 (5개 문제)
/day/[1-14]/done        완료 화면
/parent                 부모 요약 화면
```

### 7.1 시작 화면 (`/`)

**목적:** 오늘 미션 1개를 인지·시작.

**구성:**
```
┌─────────────────────────────┐
│ Day 3 of 14 · Fractions     │ ← caption
│                              │
│ 오늘의 미션                   │ ← display (32px)
│ 약 8분. 개념 1개와 문제 5개.   │ ← body (subtle)
│                              │
│ ┌──────────────────────────┐│
│ │ 오늘 배울 것              ││ ← preview card
│ │ Equivalent fractions     ││
│ └──────────────────────────┘│
│                              │
│ [ 시작하기 ]                 │ ← primary CTA, w-full
│ 연속 12일째.                 │ ← streak (있을 때만)
│                              │
│        부모용 요약 →          │ ← footer link
└─────────────────────────────┘
```

**상태:**
- 오늘 이미 완료한 경우: "오늘은 완료했어. 내일 또 봐." + 비활성화 버튼.
- 첫 방문: 스트릭 텍스트 숨김.

**동작:** `시작하기` 클릭 → `/day/{currentDay}/concept`

### 7.2 개념 화면 (`/day/[day]/concept`)

**목적:** 오늘 개념 1개를 2분 안에 이해.

**구성:**
```
┌─────────────────────────────┐
│ Day 3 · Concept             │
│ Equivalent fractions        │ ← h1 (24px)
│                              │
│ ┌──────────────────────────┐│
│ │  [SVG visual]            ││ ← 시각화 (피자, 수직선 등)
│ │                          ││
│ │  Different fractions can ││
│ │  name the same amount.   ││ ← body (1-2문장)
│ │  1/2 and 2/4 are equal.  ││
│ └──────────────────────────┘│
│                              │
│ [ 이해했어요 ]               │ ← primary CTA, w-full
└─────────────────────────────┘
```

**시각화 종류** (concept.visual):
- `pie` — 파이 차트 (1/4 음영)
- `numberLine` — 수직선 (0~1, 분수 위치 표시)
- `compare` — 두 막대 비교
- `mixed` — 정수+분수
- `addition` / `subtraction` — 연산 시각화
- `group` — 점 그룹화 (1/2 of 10)
- `decimal` — 막대 절반
- `simplify` — 단계별 약분
- `done` — 체크마크

**동작:** `이해했어요` 클릭 → `/day/{day}/q/0`

### 7.3 문제 화면 (`/day/[day]/q/[idx]`)

**목적:** 한 문제씩 풀이. 즉각 피드백.

**구성:**
```
┌─────────────────────────────┐
│ Day 3 · Question 2 of 5     │
│ ● ● ○ ○ ○                   │ ← progress dots
│                              │
│ ┌──────────────────────────┐│
│ │ Which is equal to 1/2?   ││ ← 문제 (body)
│ └──────────────────────────┘│
│                              │
│ ┌──────────────────────────┐│
│ │ 2/3                      ││ ← 4지선다 (radio)
│ └──────────────────────────┘│
│ ┌──────────────────────────┐│
│ │ 2/4                      ││ ← 클릭 시 정/오답 색
│ └──────────────────────────┘│
│ ┌──────────────────────────┐│
│ │ 3/4                      ││
│ └──────────────────────────┘│
│ ┌──────────────────────────┐│
│ │ 1/4                      ││
│ └──────────────────────────┘│
│                              │
│ ┌──────────────────────────┐│
│ │ 힌트. Multiply top and   ││ ← 오답 시만 표시
│ │ bottom by 2.             ││
│ └──────────────────────────┘│
│                              │
│ [ 다시 ]      [ 다음 ]       │ ← 정답 시 다음, 오답 시 다시
└─────────────────────────────┘
```

**동작:**
- 정답 클릭: 보더 emerald + bg emerald/10 → "다음" 버튼 표시 (autofocus)
- 오답 클릭: 보더 red + bg red/5 → 힌트 표시 + "다시" 버튼
- "다음": 다음 문제 또는 (마지막이면) `/day/{day}/done`
- "다시": 선택 초기화, 같은 문제 재시도

**채점:** sessionStorage에 정답 여부 저장 (이번 세션만).

### 7.4 완료 화면 (`/day/[day]/done`)

**목적:** 오늘 끝났음을 인지. 자랑 X. "내일 또 봐."

**구성:**
```
┌─────────────────────────────┐
│ Day 3 · Done                │
│                              │
│ 오늘 끝.                     │ ← display
│ 내일 또 봐.                  │ ← body subtle
│                              │
│ ┌──────────────────────────┐│
│ │ 연속 13일째.              ││ ← 카드, 짧게만
│ └──────────────────────────┘│
│                              │
│ [ 홈으로 ]                   │
└─────────────────────────────┘
```

**Day 14 마지막인 경우:**
- 헤더: "다 했어." / "14일 분수 단원을 마쳤어."
- 광고·축하 폭죽 X. 잔잔하게.

**동작:**
- useEffect로 LocalStorage에 세션 기록 (정답 수 / 전체 / 날짜)
- 스트릭 자동 갱신 (어제 했으면 +1, 안 했으면 1로 리셋)
- sessionStorage 정리

### 7.5 부모 요약 화면 (`/parent`)

**목적:** 부모가 1분 안에 진도 확인.

**구성:**
```
┌─────────────────────────────┐
│ Parent summary              │
│ 최근 7일                     │ ← display
│                              │
│ ┌──────────────────────────┐│
│ │ 완료 일수    5/7         ││
│ │ 정답률       82%         ││
│ │ 현재 연속    13일         ││
│ │ 진도         Day 6 / 14  ││
│ └──────────────────────────┘│
│                              │
│ [ 홈으로 ]                   │
└─────────────────────────────┘
```

**기록 없을 때:** "기록 없음. 첫 미션을 끝내면 여기 표시돼."

---

## 8. 콘텐츠 구조 (분수 14일)

### JSON 스키마 (`content/fractions.json`)

```typescript
{
  unit: "fractions",
  title: "Fractions",
  grade: "3-4",
  totalDays: 14,
  days: [
    {
      day: 1,
      concept: {
        title: "What is a fraction?",
        body: "A fraction is one piece of something split into equal parts.",
        visual: "pie",       // 시각화 종류
        visualNote: "1/4 of a circle shaded"  // a11y용
      },
      problems: [
        {
          q: "If a pizza is cut into 4 equal slices and you eat 1, what fraction did you eat?",
          choices: ["1/2", "1/3", "1/4", "1/5"],
          answer: 2,         // 0-indexed
          hint: "Count the total pieces. That's the bottom number."
        },
        // ... 5문제
      ]
    }
    // ... 14일치
  ]
}
```

### 14일 단원 구성

| Day | 개념 | 학습 목표 |
|---|---|---|
| 1 | What is a fraction? | 분수 정의 |
| 2 | Numerator and denominator | 분자/분모 명명 |
| 3 | Fractions on a number line | 수직선 위치 |
| 4 | Equivalent fractions | 등가 분수 |
| 5 | Comparing same denominator | 같은 분모 비교 |
| 6 | Comparing same numerator | 같은 분자 비교 |
| 7 | Mixed numbers | 대분수 |
| 8 | Adding same denominator | 같은 분모 덧셈 |
| 9 | Subtracting same denominator | 같은 분모 뺄셈 |
| 10 | Fractions of a group | 분수의 양적 의미 |
| 11 | Decimals and fractions | 소수와 분수 |
| 12 | Word problems | 문장제 |
| 13 | Simplifying fractions | 약분 |
| 14 | Review | 복습 (이전 모든 개념) |

각 일자: 개념 1개 + 문제 5개 + 힌트 5개 = **70문제 총 콘텐츠**

---

## 9. 디자인 시스템 (요약 — 상세는 `BRAND-DNA.md`)

### 본질
- **루틴** — 잔잔함·존엄함·짧음
- 게임 X, 잔소리 X, 캐릭터 X
- shadcn/ui 미학 베이스 ("Notion-adjacent하지만 더 따뜻")

### 컬러 (라이트 default)

```css
--bg:          #FFFFFF
--bg-subtle:   #F8FAFC   /* card 배경 */
--border:      #E2E8F0
--text:        #0F172A   /* 주 텍스트 */
--text-subtle: #64748B   /* 부 텍스트 */
--accent:      #10B981   /* 정답·진행 (emerald-500) */
--warn:        #D97706   /* 힌트 (amber-600) */
--wrong:       #DC2626   /* 오답 (red-600, 절제) */
```

다크 모드는 옵션. 라이트가 기본.

### 타이포

```
폰트:   System UI (-apple-system, "SF Pro", "Apple SD Gothic Neo")
display: 32px / 1.2 / 600   (단원명, 메인 타이틀)
h1:     24px / 1.3 / 600    (개념 제목, primary CTA 텍스트)
body:   18px / 1.5 / 400    (문제, 답)
small:  14px / 1.4 / 400    (메타 정보)
caption: 12px / 1.4 / 500   (헤더 보조)
```

### 간격
- Base: 4px
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64
- 컨테이너 max-width: **480px** (모바일 우선)
- 모든 화면: `py-12 space-y-10` 기준

### 컴포넌트
- **버튼:** min-height 44px, lg는 56px (`h-14 px-8 text-h1`)
- **primary CTA:** `bg-text text-bg w-full` (다크 배경 + 흰 글씨)
- **outline:** `border bg-bg text-text`
- **카드:** `rounded-xl border bg-bg-subtle p-6`
- **progress dots:** 5개 점 (gap-2), 완료시 accent로 채워짐
- **터치 영역:** 최소 44×44pt

### 모션
- 150ms ease-out 기본
- 페이지 전환 fade only (slide 금지)
- `prefers-reduced-motion` 시 0ms

---

## 10. Voice & Tone

### 보이스 차트
| 변수 | 우리는 | 우리는 ~이 아니다 |
|---|---|---|
| 어휘 | 일상어 | 어른 단어 / 학원 vocabulary |
| 길이 | 짧음 (1-2문장) | 길게 칭찬, 길게 설명 |
| 구두점 | 마침표 | 느낌표 남발 |
| 톤 | 차분·존중 | 응원하는 척 / 평가적 |

### 화면별 톤 예시

| 표면 | 좋은 예 | 나쁜 예 |
|---|---|---|
| 시작 | "오늘의 미션. 시작할까?" | "와! 또 만났네! 🎉" |
| 정답 | "맞았어." | "정답이야! 너무 잘했어!! 💪" |
| 오답 | "거의. 한 번 더 봐볼래?" | "에이, 틀렸네 ㅠㅠ 다시 도전!" |
| 힌트 | "Multiply top and bottom by 2." | "이건 어려운 문제구나! 천천히 생각해 봐~" |
| 완료 | "오늘 끝. 내일 또 봐." | "🎊 미션 완료! 정말 대단해!! 🎊" |
| 부모 | "이번 주 5/7일. 약점: 분수 비교." | "어머니가 자랑스러우실 거예요! 😊" |

### 절대 금기어
- "잘했어!", "최고야!", "대단해!" → 가짜 칭찬
- "에이~", "오잉" → 캐릭터 톤
- "다시 도전!" → 게임 vocabulary
- 의미 없는 이모지 (🎉🎊🚀😊 등 장식)
- ALL CAPS

---

## 11. 기술 스택 & 제약

### 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui 패턴
- LocalStorage (백엔드 0)
- Vercel 배포 (무료 tier)

### 의존성 (최소화)
```
next, react, react-dom
class-variance-authority  ← 변형 관리
clsx + tailwind-merge     ← 클래스 합성
lucide-react              ← 아이콘 (필요시)
```

### 제약
- **백엔드 0** — DB·API·서버 아무것도 없음
- **회원가입 0** — LocalStorage만으로 모든 진도 관리
- **분석 도구 0** (v1) — 익명성 우선, 검증 후 옵트인 분석 추가
- **외부 의존성 최소** — CDN 폰트도 없음 (시스템 폰트만)

### 접근성 (협상 불가)
- WCAG 2.1 AA 모든 텍스트 4.5:1 / UI 3:1
- 키보드 전 영역 도달
- aria-label, 의미적 HTML
- focus-visible 가시
- prefers-reduced-motion 지원
- 색상만으로 정보 전달 X

### 성능 목표
- LCP < 2s (4G 모바일)
- 번들 크기 < 100KB (가능한 범위에서)
- 페이지당 First Load JS < 110KB

---

## 12. AI 슬롭 거부 목록 (디자인 헌법)

```
❌ 그라데이션 (보라색 / 퍼플-핑크 등)
❌ 떠 있는 카드 (floating card on gradient soup)
❌ 가짜 후기 / 가상 페르소나
❌ 의미 없는 이모지 장식
❌ Lorem ipsum
❌ 6+ CTA 경쟁
❌ 가운데 정렬된 긴 본문
❌ "🚀 Get Started Now! 🎉" 류
❌ 자석 글로우 / 별 광점 효과
❌ "당신을 위한 맞춤 ___" 마케팅 카피
```

---

## 13. 성공 지표 (v1 검증)

### 가설
> "Khan/IXL 콘텐츠는 충분히 좋다. 진짜 문제는 *오늘 하게 만들기*다."

### 지표 (LocalStorage 기반, 비익명 X)

| 지표 | 목표 | 측정 |
|---|---|---|
| Day 1 → Day 2 재방문율 | > 60% | 이튿날 시작 화면 진입 |
| Day 7 retention | > 30% | 7일 연속 사용 비율 |
| 14일 완주율 | > 15% | Day 14 완료 비율 |
| 세션 평균 시간 | 7-10분 | sessionStorage 타임스탬프 |
| 1문제당 평균 시도 | 1.3 이하 | 정답까지 시도 횟수 |

### 검증 방법
- 부모 5명 인터뷰 (1-2주 내)
- 수동 사용 (창작자 자녀 포함)
- LocalStorage 기록을 직접 확인

---

## 14. Reversal Conditions (이 결정을 뒤집을 신호)

```
- 5명 인터뷰 중 3명 이상 "10분이 너무 짧다" → 단위 재설계
- D7 retention < 25% → 진입점 가설 wrong, 재검토
- "이 콘텐츠가 내 학교 진도와 다르다" 다수 → Common Core 정렬 강화
- "별로 안 함" 다수 → 부모 푸시 알림 (회원가입) 우선순위 ↑
- 부모 결제 의향 0% (무료여도 안 씀) → KILL
```

---

## 15. v2 후보 (검증 후 우선순위)

| 후보 | 트리거 |
|---|---|
| 회원가입 + 기기 동기화 | retention > 30% 검증 후 |
| 부모 푸시 알림 | "잊어서 못 한다" 응답 다수 |
| 부모 주간 요약 이메일 | 부모 5분 미만 인지 비용 검증 후 |
| 다중 단원 (덧셈, 도형 등) | 분수 14일 완주율 > 15% 후 |
| 다중 자녀 분리 | "둘째도 쓰고 싶다" 응답 |
| Khan/IXL 외부 링크 | 약점 기반 추천 가설 검증 |
| 결제 모델 | 위 모든 검증 통과 후만 |

---

## 16. 프로젝트 구조 (재구현 시 참고)

```
math-routine/
├── PRD.md                    ← 이 문서
├── BRAND-DNA.md              ← 디자인 헌법 (상세)
├── package.json
├── tsconfig.json
├── tailwind.config.ts        ← BRAND-DNA 토큰 매핑
├── postcss.config.js
├── next.config.js
├── app/
│   ├── globals.css           ← CSS 변수 (라이트/다크)
│   ├── layout.tsx
│   ├── page.tsx              ← / 시작 화면
│   ├── parent/page.tsx       ← /parent 부모 요약
│   └── day/[day]/
│       ├── concept/page.tsx  ← /day/[day]/concept
│       ├── q/[idx]/page.tsx  ← /day/[day]/q/[idx]
│       └── done/page.tsx     ← /day/[day]/done
├── components/ui/
│   ├── button.tsx            ← shadcn 패턴, BRAND-DNA 토큰
│   └── card.tsx              ← Card + ProgressDots
├── lib/
│   ├── utils.ts              ← cn (extendTailwindMerge 필수!)
│   └── storage.ts            ← LocalStorage 진도/스트릭
└── content/
    └── fractions.json        ← 14일치 콘텐츠 (70문제)
```

### 재구현 시 주의 사항 (도그푸드 학습)

```
1. tailwind-merge 설정 필수
   - 커스텀 fontSize 토큰을 명시 등록
   - 안 하면 text-* 색이 text-* 크기와 충돌해 제거됨

2. Tailwind 컬러 이름 충돌 주의
   - bg, text 같은 이름 X (built-in prefix와 충돌)
   - surface, ink 같이 명확한 이름 사용

3. Next 14.2에서 params는 Promise 아님
   - useState/use() 쓰지 말고 params.day 직접 접근
   - Next 15부터는 use(params) 필요

4. min-h-screen + justify-between 주의
   - 콘텐츠 적을 때 거대한 빈공간 만듦
   - 자연 흐름(space-y-N)이 더 안전

5. 모든 primary CTA는 w-full 명시
   - inline-flex default라 콘텐츠 사이즈로 좁아짐
```

---

## 17. 한 줄 요약 (재구현용)

> **회원가입 없이, 라이트 모드 default, 1인 부모-자녀를 위한 14일 분수 루틴 웹앱.**
> 게임화 X · 캐릭터 X · 그라데이션 X · 잔소리 X.
> 다섯 화면, 한 화면 ≤ 2 액션, 18px 본문, 480px max-width, WCAG AA.
