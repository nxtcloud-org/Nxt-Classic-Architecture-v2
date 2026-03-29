import { useState } from 'react';
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Mail,
  BookOpen,
  Globe,
  Moon,
  Sun,
  Award,
  ThumbsUp,
  Users,
  ChevronDown,
  ChevronUp,
  Scale,
  Brain,
  FileText,
  Landmark
} from 'lucide-react';

const publicationData = [
  { year: 2022, papers: 1, citations: 3 },
  { year: 2023, papers: 3, citations: 12 },
  { year: 2024, papers: 5, citations: 28 },
  { year: 2025, papers: 4, citations: 45 },
  { year: 2026, papers: 2, citations: 31 },
];

const competencyData = [
  { subject: 'AI 기술 이해', score: 75 },
  { subject: '법/규제 분석', score: 90 },
  { subject: '정량 연구방법', score: 65 },
  { subject: '정책 설계', score: 85 },
  { subject: '국제 비교법', score: 80 },
  { subject: '이해관계자 분석', score: 70 },
];

const LAMBDA_URL = ''; // Lambda URL

export default function ResearcherProfile() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeChart, setActiveChart] = useState('publications');
  const [visitCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set());

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const handleLike = () => {
    if (LAMBDA_URL) {
      fetch(`${LAMBDA_URL}/like`, { method: 'POST' })
        .then(res => res.json())
        .then(data => setLikeCount(data.likes));
    } else {
      setLikeCount(prev => prev + 1);
    }
  };

  const baseTextColor = darkMode ? 'text-white' : 'text-gray-800';
  const baseBgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  const renderPublicationChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={publicationData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="papers" name="논문 수" fill="#6366f1" />
        <Bar yAxisId="right" dataKey="citations" name="인용 수" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderCompetencyChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={competencyData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="역량"
          dataKey="score"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.3}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );

  return (
    <div className={`min-h-screen ${baseBgColor} ${baseTextColor} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Bar */}
        <div className={`w-full ${cardBgColor} p-4 rounded-lg mb-8 flex justify-between items-center shadow-sm`}>
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>방문자 수: {visitCount}</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-5 h-5 mr-2" />
              <span>좋아요: {likeCount}</span>
            </div>
          </div>
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            좋아요
          </button>
        </div>

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">김정책</h1>
            <h2 className="text-2xl text-indigo-500">AI 정책 대학원 석사과정 연구원</h2>
            <p className={`mt-2 ${subTextColor}`}>
              AI 규제 프레임워크와 알고리즘 거버넌스를 연구합니다
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </header>

        {/* Contact */}
        <section className="mb-8 flex flex-wrap gap-4 text-sm">
          <a href="mailto:researcher@aipolicy.ac.kr" className="flex items-center hover:text-indigo-500 transition-colors">
            <Mail className="w-4 h-4 mr-2" />
            researcher@aipolicy.ac.kr
          </a>
          <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-500 transition-colors">
            <BookOpen className="w-4 h-4 mr-2" />
            Google Scholar
          </a>
          <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-500 transition-colors">
            <Globe className="w-4 h-4 mr-2" />
            ORCID
          </a>
        </section>

        {/* Research Interests & Competency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${cardBgColor} shadow-sm`}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" /> 연구 관심 분야
            </h3>
            <ul className="space-y-3">
              {[
                { area: 'EU AI Act와 한국 AI 기본법 비교 분석', desc: '규제 접근방식의 차이와 국내 적용 시사점' },
                { area: '알고리즘 영향평가 제도 설계', desc: '고위험 AI 시스템의 사전 평가 프레임워크' },
                { area: '생성형 AI 저작권 쟁점', desc: '학습 데이터 공정 이용과 생성물 권리 귀속' },
                { area: 'AI 안전과 국제 거버넌스', desc: 'AI Safety Summit 이후 다자간 규범 형성 동향' },
              ].map((item, i) => (
                <li key={i}>
                  <span className="font-medium">- {item.area}</span>
                  <p className={`ml-3 text-sm ${subTextColor}`}>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-6 rounded-lg ${cardBgColor} shadow-sm`}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" /> 연구 역량
            </h3>
            {renderCompetencyChart()}
          </div>
        </div>

        {/* Charts */}
        <div className={`p-6 rounded-lg ${cardBgColor} mb-8 shadow-sm`}>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveChart('publications')}
              className={`px-4 py-2 rounded ${activeChart === 'publications' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              논문/인용 추이
            </button>
            <button
              onClick={() => setActiveChart('competency')}
              className={`px-4 py-2 rounded ${activeChart === 'competency' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              역량 레이더
            </button>
          </div>
          {activeChart === 'publications' && renderPublicationChart()}
          {activeChart === 'competency' && renderCompetencyChart()}
        </div>

        {/* Publications */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-2" /> 주요 논문
          </h3>
          <div className="space-y-4">
            {[
              {
                title: 'EU AI Act 고위험 분류체계의 한국 적용 가능성 연구',
                venue: '한국정보법학회지, 2025',
                details: [
                  'EU AI Act Annex III 고위험 분류 기준을 한국 산업 구조에 맞게 재해석',
                  '국내 AI 활용 사례 47건에 대한 위험 등급 시뮬레이션 수행',
                  '한국형 AI 위험 분류 프레임워크 초안 제시',
                ],
              },
              {
                title: '알고리즘 영향평가의 실효성 분석: 캐나다-뉴질랜드 사례를 중심으로',
                venue: '행정논총, 2024',
                details: [
                  '캐나다 DAIA와 뉴질랜드 AIA 제도의 운영 성과 비교 분석',
                  '영향평가 결과가 실제 정책 수정으로 이어진 비율 정량 측정',
                  '한국 공공부문 AI 도입 시 영향평가 의무화 방안 제안',
                ],
              },
              {
                title: 'AI 생성 콘텐츠의 저작권법적 쟁점과 입법 방향',
                venue: '법학연구, 2024',
                details: [
                  'Stable Diffusion, ChatGPT 등 생성형 AI 관련 해외 판례 분석',
                  '학습 데이터의 공정 이용 해당 여부에 대한 법리 검토',
                  'AI 생성물의 저작물성 인정 기준에 대한 입법론적 제안',
                ],
              },
              {
                title: '국가 AI 전략 비교 연구: 미-중-EU-한 4개국을 중심으로',
                venue: 'AI 정책연구, 2023',
                details: [
                  '4개국의 AI 국가 전략 문서 체계적 비교 분석',
                  '혁신 촉진과 위험 관리 사이의 정책 균형점 도출',
                  '한국 AI 전략의 차별성과 보완점 제시',
                ],
              },
            ].map((pub, index) => (
              <div key={index} className={`p-4 rounded-lg ${cardBgColor} shadow-sm transition-all duration-300`}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(`pub-${index}`)}
                >
                  <div>
                    <h4 className="text-lg font-semibold">{pub.title}</h4>
                    <p className={`text-sm ${subTextColor}`}>{pub.venue}</p>
                  </div>
                  {expandedSections.has(`pub-${index}`) ? (
                    <ChevronUp className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 flex-shrink-0" />
                  )}
                </div>
                {expandedSections.has(`pub-${index}`) && (
                  <ul className={`list-disc list-inside mt-4 ${subTextColor}`}>
                    {pub.details.map((detail, i) => (
                      <li key={i} className="mt-2">{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Policy Timeline */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Landmark className="w-6 h-6 mr-2" /> AI 정책 타임라인
          </h3>
          <div className={`p-6 rounded-lg ${cardBgColor} shadow-sm`}>
            <div className="relative border-l-2 border-indigo-300 ml-4">
              {[
                { date: '2023.11', event: 'UK AI Safety Summit (블레츨리 선언)', tag: '국제' },
                { date: '2024.05', event: 'AI Seoul Summit (AI 서울 정상회의)', tag: '국제' },
                { date: '2024.08', event: 'EU AI Act 발효', tag: 'EU' },
                { date: '2025.01', event: '한국 AI 기본법 국회 통과', tag: '한국' },
                { date: '2025.02', event: 'EU AI Act 전면 시행', tag: 'EU' },
                { date: '2025.05', event: 'AI Action Summit (파리)', tag: '국제' },
                { date: '2026.01', event: '한국 AI 기본법 시행', tag: '한국' },
              ].map((item, i) => (
                <div key={i} className="mb-6 ml-6">
                  <div className="absolute -left-2 w-4 h-4 bg-indigo-500 rounded-full" style={{ marginTop: '4px' }} />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-500">{item.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      item.tag === '한국' ? 'bg-blue-100 text-blue-800' :
                      item.tag === 'EU' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className={`${subTextColor}`}>{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Experience */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">학력 및 경력</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'AI 정책 대학원 석사과정',
                description: '서울대학교 AI 정책 이니셔티브 | 2024 - 현재',
                achievements: [
                  'AI 규제 비교법 세미나 수료',
                  '알고리즘 영향평가 연구 프로젝트 참여',
                  'AI 정책 브리핑 뉴스레터 발행',
                ],
              },
              {
                title: '법학과 학부',
                description: '서울대학교 법과대학 | 2020 - 2024',
                achievements: [
                  '정보법/기술법 세미나 우수 논문상',
                  '법학전문대학원 학부 연구 조교',
                  '모의재판대회 AI 관련 사건 발표',
                ],
              },
              {
                title: '국회 AI 정책 TF 인턴',
                description: '국회 과학기술정보방송통신위원회 | 2024',
                achievements: [
                  'AI 기본법 입법 과정 현장 참관 및 자료 조사',
                  '해외 AI 규제 동향 보고서 작성',
                  '국회 토론회 발제 자료 준비',
                ],
              },
              {
                title: 'AI 윤리 워크숍 참여',
                description: 'UNESCO AI 윤리 권고안 국내 이행 검토 | 2025',
                achievements: [
                  'UNESCO AI 윤리 권고안과 국내 법제 정합성 분석',
                  '시민사회-산업계 이해관계자 인터뷰 수행',
                  '정책 브리프 공동 집필',
                ],
              },
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg ${cardBgColor} shadow-sm transition-all duration-300`}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(`edu-${index}`)}
                >
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className={subTextColor}>{item.description}</p>
                  </div>
                  {expandedSections.has(`edu-${index}`) ? (
                    <ChevronUp className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 flex-shrink-0" />
                  )}
                </div>
                {expandedSections.has(`edu-${index}`) && (
                  <ul className={`list-disc list-inside mt-4 ${subTextColor}`}>
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="mt-2">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Scale className="w-6 h-6 mr-2" /> 전문 역량
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { skill: 'AI 규제 분석', color: 'bg-indigo-200 text-indigo-800' },
              { skill: '비교법 연구', color: 'bg-blue-200 text-blue-800' },
              { skill: '정책 영향평가', color: 'bg-green-200 text-green-800' },
              { skill: '이해관계자 분석', color: 'bg-yellow-200 text-yellow-800' },
              { skill: 'Python/데이터 분석', color: 'bg-red-200 text-red-800' },
              { skill: '법률 문서 작성', color: 'bg-purple-200 text-purple-800' },
              { skill: 'NLP/텍스트 마이닝', color: 'bg-teal-200 text-teal-800' },
              { skill: '영어/불어', color: 'bg-orange-200 text-orange-800' },
            ].map(({ skill, color }) => (
              <span
                key={skill}
                className={`px-3 py-1 rounded-full text-sm ${color} transition-colors duration-300 hover:bg-opacity-80 cursor-default`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center py-6 ${subTextColor} text-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p>React + Tailwind CSS + Recharts로 제작</p>
          <p className="mt-1">AWS 배포 실습: S3 정적 호스팅 + CloudFront + Lambda(방문자/좋아요) + DynamoDB</p>
        </footer>
      </div>
    </div>
  );
}
