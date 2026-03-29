import { useState } from 'react';

/* ───── 타임라인 도트 컴포넌트 ───── */
function TimelineDot({ active }) {
  return (
    <div className={`
      w-3 h-3 rounded-full border-2 flex-shrink-0
      ${active
        ? 'bg-accent border-accent'
        : 'bg-white border-gray-300'}
    `} />
  );
}

/* ───── 데이터 ───── */
const researchAreas = [
  {
    title: 'AI 규제 비교법',
    desc: 'EU AI Act, 한국 AI 기본법, 미국 행정명령 등 주요국 규제 프레임워크의 구조적 차이를 분석하고 국내 적용 시사점을 도출합니다.',
  },
  {
    title: '알고리즘 영향평가',
    desc: '공공부문 AI 시스템 도입 시 사전 영향평가 의무화 방안을 연구합니다. 캐나다 DAIA, 뉴질랜드 AIA 등 해외 사례를 벤치마킹합니다.',
  },
  {
    title: '생성형 AI와 저작권',
    desc: '학습 데이터의 공정 이용 해당 여부, AI 생성물의 저작물성 인정 기준 등 법리적 쟁점을 검토합니다.',
  },
  {
    title: 'AI 안전 국제 거버넌스',
    desc: 'AI Safety Summit 이후 형성 중인 다자간 규범과 국제 협력 체계를 추적하고 한국의 전략적 참여 방안을 모색합니다.',
  },
];

const publications = [
  {
    title: 'EU AI Act 고위험 분류체계의 한국 적용 가능성 연구',
    venue: '한국정보법학회지',
    year: 2025,
    type: 'journal',
  },
  {
    title: '알고리즘 영향평가의 실효성 분석: 캐나다-뉴질랜드 사례를 중심으로',
    venue: '행정논총',
    year: 2024,
    type: 'journal',
  },
  {
    title: 'AI 생성 콘텐츠의 저작권법적 쟁점과 입법 방향',
    venue: '법학연구',
    year: 2024,
    type: 'journal',
  },
  {
    title: '국가 AI 전략 비교 연구: 미-중-EU-한 4개국을 중심으로',
    venue: 'AI 정책연구',
    year: 2023,
    type: 'conference',
  },
  {
    title: 'AI 규제 샌드박스의 국제 동향과 시사점',
    venue: '과학기술법연구',
    year: 2023,
    type: 'journal',
  },
];

const timeline = [
  { date: '2026.01', event: '한국 AI 기본법 시행', region: 'KR', active: true },
  { date: '2025.05', event: 'AI Action Summit (파리)', region: 'INTL', active: false },
  { date: '2025.02', event: 'EU AI Act 전면 시행', region: 'EU', active: false },
  { date: '2025.01', event: '한국 AI 기본법 국회 통과', region: 'KR', active: false },
  { date: '2024.08', event: 'EU AI Act 발효', region: 'EU', active: false },
  { date: '2024.05', event: 'AI Seoul Summit', region: 'INTL', active: false },
  { date: '2023.11', event: 'UK AI Safety Summit (블레츨리 선언)', region: 'INTL', active: false },
];

const ongoingResearch = [
  {
    title: 'EU AI Act 이행 모니터링 프레임워크 설계',
    status: '진행 중',
    period: '2025.03 -',
    desc: 'EU AI Act 시행 이후 회원국별 이행 현황을 체계���으로 추적하는 비교 분석 프레임워크를 설계하고, 한국 AI 기본법 시행 대비 시사점을 도출합니다.',
  },
  {
    title: '공공부문 알고리즘 영향평가 시범 적용',
    status: '데이터 ��집',
    period: '2024.09 -',
    desc: '서울시 AI 기반 복지 서비스 3건을 대상으로 알고리즘 영향평가 시범 적용을 수���하고, 평가 도구의 실효성을 검증합니다.',
  },
  {
    title: 'AI 생성물 저작권 판례 데이터베이스 구축',
    status: '분석 단계',
    period: '2024.06 -',
    desc: '미국, EU, 중국, 일본, 한국의 AI 저작권 관련 판례 및 행정결정을 수집하여 비교법적 분석 데이터베이스를 구축합니다.',
  },
];

const presentations = [
  {
    title: 'AI 규제의 역외 적용과 무역법적 쟁점',
    venue: '한국국제경제법학회 춘계학술대회',
    date: '2025.05',
    type: '학회 발표',
  },
  {
    title: 'EU AI Act 고위험 분류와 한국 산업에의 함의',
    venue: 'AI 정책 대학원 콜로키움',
    date: '2025.03',
    type: '세미나',
  },
  {
    title: '생성형 AI 시대의 공정 이용 법리 재검토',
    venue: '정보법학회 동계 워크숍',
    date: '2024.12',
    type: '학회 발표',
  },
  {
    title: '알고리즘 영향평가 해외 사례와 국내 도입 방안',
    venue: '국회 AI 포럼 발제',
    date: '2024.09',
    type: '정책 발제',
  },
  {
    title: '국가 AI 전략 비교: 혁신 촉진 vs 위험 관리',
    venue: 'SNU AI Policy Workshop',
    date: '2024.06',
    type: '세미나',
  },
];

const career = [
  {
    period: '2024 - 현재',
    role: '석사과정 연구원',
    org: '서울대학교 AI 정책 대학원',
    details: 'AI 규제 비교법 세미나 수료 / 알고리즘 영향평가 연구 프로젝트 / AI 정책 브리핑 뉴스레터 발행',
  },
  {
    period: '2024',
    role: '정책 인턴',
    org: '국회 과학기술정보방송통신위원회 AI 정책 TF',
    details: 'AI 기본법 입법 과정 참관 / 해외 AI 규제 동향 보고서 작성 / 국회 토론회 발제 자료 준비',
  },
  {
    period: '2020 - 2024',
    role: '법학 학사',
    org: '서울대학교 법과대학',
    details: '정보법/기술법 세미나 우수 논문상 / 법학전문대학원 연구 조교 / 모의재판대회 AI 사건 발표',
  },
];

const regionStyle = {
  KR: 'bg-blue-100 text-blue-700',
  EU: 'bg-emerald-100 text-emerald-700',
  INTL: 'bg-violet-100 text-violet-700',
};

const regionLabel = { KR: '한국', EU: 'EU', INTL: '국제' };

/* ───── 메인 컴포넌트 ───── */
export default function App() {
  const [filter, setFilter] = useState('all');

  const filteredPubs = filter === 'all'
    ? publications
    : publications.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-surface">
      {/* ── 네비게이션 ── */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-heading text-lg font-semibold tracking-tight">김정책</span>
          <div className="flex gap-6 text-sm font-body text-muted">
            <a href="#research" className="hover:text-ink transition-colors cursor-pointer">연구</a>
            <a href="#publications" className="hover:text-ink transition-colors cursor-pointer">논문</a>
            <a href="#timeline" className="hover:text-ink transition-colors cursor-pointer">정책</a>
            <a href="#career" className="hover:text-ink transition-colors cursor-pointer">경력</a>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6">
        {/* ── 히어로 ── */}
        <header className="pt-20 pb-16 border-b border-gray-200">
          <p className="text-sm font-body text-accent tracking-widest uppercase mb-4">
            AI Policy Researcher
          </p>
          <h1 className="font-heading text-5xl font-bold tracking-tight leading-tight mb-6">
            AI가 사회에 미치는 영향을<br />
            법과 정책으로 연구합니다
          </h1>
          <p className="font-body text-lg text-muted leading-relaxed max-w-xl">
            서울대학교 AI 정책 대학원 석사과정.
            AI 규제 프레임워크의 국제 비교와 알고리즘 거버넌스를 연구합니다.
          </p>
          <div className="flex gap-4 mt-8 text-sm font-body">
            <a
              href="mailto:researcher@aipolicy.ac.kr"
              className="px-4 py-2 bg-ink text-white rounded hover:bg-muted transition-colors cursor-pointer"
            >
              Contact
            </a>
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded hover:border-ink transition-colors cursor-pointer"
            >
              Google Scholar
            </a>
          </div>
        </header>

        {/* ── 연구 분야 ── */}
        <section id="research" className="py-16 border-b border-gray-200">
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-10">
            연구 분야
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {researchAreas.map((area) => (
              <article
                key={area.title}
                className="group p-6 border border-gray-200 rounded-lg hover:border-ink transition-colors cursor-default"
              >
                <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {area.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {area.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── 진행 중인 연구 ── */}
        <section className="py-16 border-b border-gray-200">
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-10">
            진행 중인 연구
          </h2>
          <div className="space-y-6">
            {ongoingResearch.map((project) => (
              <div key={project.title} className="border-l-2 border-accent pl-5">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
                  <span className="px-2 py-0.5 bg-blue-50 text-accent text-xs font-body rounded">
                    {project.status}
                  </span>
                </div>
                <p className="font-body text-xs text-muted mb-2">{project.period}</p>
                <p className="font-body text-sm text-muted leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 발표 및 세미나 ── */}
        <section className="py-16 border-b border-gray-200">
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-10">
            발표 및 세미나
          </h2>
          <div className="space-y-4">
            {presentations.map((item, i) => (
              <div key={i} className="flex gap-4 items-baseline">
                <span className="font-body text-sm text-muted w-20 flex-shrink-0">{item.date}</span>
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold leading-snug">{item.title}</h3>
                  <p className="font-body text-sm text-muted">
                    {item.venue}
                    <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-xs rounded">{item.type}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 논문 ── */}
        <section id="publications" className="py-16 border-b border-gray-200">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              논문
            </h2>
            <div className="flex gap-2 text-sm font-body">
              {[
                { key: 'all', label: '전체' },
                { key: 'journal', label: '학술지' },
                { key: 'conference', label: '학회' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                    filter === key
                      ? 'bg-ink text-white'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <ol className="space-y-6">
            {filteredPubs.map((pub, i) => (
              <li key={i} className="group">
                <div className="flex gap-4">
                  <span className="font-heading text-3xl font-bold text-gray-200 group-hover:text-accent transition-colors leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold leading-snug mb-1">
                      {pub.title}
                    </h3>
                    <p className="font-body text-sm text-muted">
                      {pub.venue}, {pub.year}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 정책 타임라인 ── */}
        <section id="timeline" className="py-16 border-b border-gray-200">
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-10">
            AI 정책 타임라인
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="flex flex-col items-center">
                  <TimelineDot active={item.active} />
                  {i < timeline.length - 1 && (
                    <div className="w-px h-12 bg-gray-200" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-body text-sm font-bold text-ink">{item.date}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-body ${regionStyle[item.region]}`}>
                      {regionLabel[item.region]}
                    </span>
                  </div>
                  <p className={`font-body text-sm ${item.active ? 'text-ink font-bold' : 'text-muted'}`}>
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 경력 ── */}
        <section id="career" className="py-16 border-b border-gray-200">
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-10">
            학력 및 경력
          </h2>
          <div className="space-y-8">
            {career.map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="font-body text-sm text-muted w-28 flex-shrink-0 pt-1">
                  {item.period}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{item.role}</h3>
                  <p className="font-body text-sm text-accent mb-2">{item.org}</p>
                  <p className="font-body text-sm text-muted leading-relaxed">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 전문 역량 태그 ── */}
        <section className="py-16 border-b border-gray-200">
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-10">
            전문 분야
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'AI 규제 분석',
              '비교법 연구',
              '정책 영향평가',
              '이해관계자 분석',
              'Python / 데이터 분석',
              '법률 문서 작성',
              'NLP / 텍스트 마이닝',
              '영어 / 불어',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 border border-gray-300 rounded-full text-sm font-body text-muted hover:border-ink hover:text-ink transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ── 푸터 ── */}
        <footer className="py-12 text-center font-body text-sm text-muted">
          <p>React + Tailwind CSS로 제작</p>
          <p className="mt-1">
            AWS 배포: S3 + CloudFront + Lambda + DynamoDB
          </p>
        </footer>
      </main>
    </div>
  );
}
