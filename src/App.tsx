import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function SharedCheckLogo({ size = 44 }: { size?: number }) {
  const id = `logo-${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`og-${id}`} x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5841F"/>
          <stop offset="0.6" stopColor="#F5C01F"/>
          <stop offset="1" stopColor="#4ab8b8"/>
        </linearGradient>
        <linearGradient id={`bg-${id}`} x1="15" y1="75" x2="85" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ab8b8"/>
          <stop offset="1" stopColor="#00ADEF"/>
        </linearGradient>
      </defs>
      <path d="M88 26 A44 44 0 1 1 26 88" stroke={`url(#og-${id})`} strokeWidth="11" fill="none" strokeLinecap="round"/>
      <path d="M22 52 L40 70 L78 28" stroke={`url(#bg-${id})`} strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const FEATURES = [
  {
    icon: '🔑',
    title: '코드로 간편 공유',
    desc: '복잡한 초대 절차 없이 고유 코드 하나로 즉시 초대. 최대 3명까지 함께할 수 있어요.',
  },
  {
    icon: '⚡',
    title: '실시간 현황 업데이트',
    desc: '참여자 모두가 할 일 목록을 실시간으로 확인하고 업데이트. 누가 무엇을 완료했는지 즉시 파악.',
  },
  {
    icon: '📁',
    title: '폴더별 할 일 관리',
    desc: '프로젝트, 장보기, 여행 등 다양한 주제의 투두 리스트를 폴더로 나누어 깔끔하게 관리.',
  },
  {
    icon: '🤖',
    title: 'AI 투두 추천',
    desc: '상황에 맞는 할 일을 AI가 스마트하게 추천해 드립니다. 더 빠르고 편리하게 할 일을 추가하세요.',
  },
  {
    icon: '🌍',
    title: '다국어 지원',
    desc: '한국어, 영어 등 다양한 언어를 지원합니다. 전 세계 어디서나 편리하게 사용하세요.',
  },
  {
    icon: '🔐',
    title: '소셜 로그인',
    desc: '카카오, 네이버, 애플 간편 로그인 지원. 가입 없이 바로 시작할 수 있어요.',
  },
]

const SCENARIOS = [
  {
    label: '👨‍👩‍👧‍👦 가족',
    title: '가족 장보기 목록',
    items: ['우유 2개', '계란 한 판', '두부', '된장찌개 재료', '과일'],
    checked: [true, true, false, false, true],
    desc: '함께 장보기 목록을 작성하고 완료 여부를 실시간으로 확인해 중복 구매를 방지해요.',
    color: '#F5841F',
  },
  {
    label: '💼 팀',
    title: '프로젝트 마일스톤',
    items: ['요구사항 분석', 'UI 디자인', '백엔드 API 개발', '프론트엔드 연동', '테스트'],
    checked: [true, true, true, false, false],
    desc: '프로젝트 마일스톤과 세부 과제를 함께 관리하고 진행 상황을 공유하세요.',
    color: '#00ADEF',
  },
  {
    label: '💑 커플',
    title: '제주도 여행 계획',
    items: ['항공권 예약', '숙소 예약', '렌터카 예약', '맛집 리스트 정리', '여행 가방 싸기'],
    checked: [true, false, false, true, false],
    desc: '데이트 계획, 여행 일정 등을 함께 짜고 완료 항목을 체크하세요.',
    color: '#e83e8c',
  },
  {
    label: '🎉 친구',
    title: '파티 준비물',
    items: ['음료 준비', '간식 구매', '장소 예약', '게임 준비', '카메라 충전'],
    checked: [false, false, true, true, false],
    desc: '파티 준비물 목록을 함께 관리하고 역할을 분담하세요.',
    color: '#7c3aed',
  },
]

function HeroSection() {
  const [checkedItems, setCheckedItems] = useState([false, false, false, false])
  const items = ['결혼식 부케 준비', '신부 입장곡 선택', '하객 좌석 배치', '웨딩홀 컨펌']

  const toggle = (i: number) => setCheckedItems(prev => prev.map((v, idx) => idx === i ? !v : v))

  return (
    <section className="hero-section">
      <div className="hero-bg-orb orb1" />
      <div className="hero-bg-orb orb2" />
      <div className="hero-bg-orb orb3" />
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">함께하는 투두 리스트</div>
          <h1 className="hero-title">
            <span className="gradient-text">Shared Check</span>
          </h1>
          <p className="hero-sub">
            코드로 간편하게 공유하는 공동 투두 리스트.<br />
            친구, 가족과 할 일을 실시간으로 함께 관리하세요!
          </p>
          <div className="hero-cta">
            <a
              href="https://apps.apple.com/kr/app/shared-check/id6762721758"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-appstore"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href="https://github.com/yoo94"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-phone-wrap">
          <div className="phone-frame">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-header">
                <span className="phone-back">‹ 뒤로</span>
                <span className="phone-title-text">결혼식에 필요한것</span>
              </div>
              <div className="phone-input-row">
                <div className="phone-input-mock">새 할 일</div>
                <button className="phone-add-btn">추가</button>
              </div>
              <p className="phone-hint">할 일을 꾹 누르면 제목을 수정할 수 있어요</p>
              <ul className="phone-todo-list">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className={`phone-todo-item${checkedItems[i] ? ' checked' : ''}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="phone-checkbox">{checkedItems[i] ? '✓' : ''}</span>
                    <span className="phone-todo-text">{item}</span>
                    <span className="phone-delete">✕</span>
                  </li>
                ))}
              </ul>
              <div className="phone-progress">
                <div className="phone-progress-bar">
                  <div
                    className="phone-progress-fill"
                    style={{ width: `${(checkedItems.filter(Boolean).length / items.length) * 100}%` }}
                  />
                </div>
                <span className="phone-progress-text">
                  {checkedItems.filter(Boolean).length}/{items.length} 완료
                </span>
              </div>
            </div>
          </div>
          <p className="hero-interact-hint">👆 클릭해서 체크해보세요!</p>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>스크롤하여 더 알아보기</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { ref, inView } = useInView()
  return (
    <section className="features-section" ref={ref}>
      <div className="section-inner">
        <div className={`section-label fade-up${inView ? ' visible' : ''}`}>핵심 기능</div>
        <h2 className={`section-title fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          함께할 때 더 강력한 기능들
        </h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-card fade-up${inView ? ' visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ShareCodeSection() {
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)
  const code = '7A2F8452FF7C'

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <section className="share-section" ref={ref}>
      <div className="section-inner">
        <div className={`section-label fade-up${inView ? ' visible' : ''}`} style={{ color: '#00ADEF' }}>공유 방법</div>
        <h2 className={`section-title fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          코드 하나로 즉시 공유
        </h2>
        <p className={`section-sub fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          복잡한 회원가입, 친구 추가 없이 — 코드만 공유하면 바로 시작!
        </p>
        <div className={`share-demo fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="share-step">
            <div className="share-step-num">1</div>
            <div className="share-step-body">
              <h4>폴더 생성</h4>
              <p>투두 리스트 폴더를 만들고 할 일을 추가하세요</p>
              <div className="share-folder-mock">
                <span>📁</span> 오늘 장보기
              </div>
            </div>
          </div>
          <div className="share-arrow">→</div>
          <div className="share-step">
            <div className="share-step-num">2</div>
            <div className="share-step-body">
              <h4>고유 코드 발급</h4>
              <p>폴더 공유 시 고유 코드가 생성됩니다</p>
              <div className="share-code-box" onClick={handleCopy} title="클릭하여 복사">
                <span className="share-code-text">{code}</span>
                <span className="share-copy-btn">{copied ? '✓ 복사됨' : '복사'}</span>
              </div>
            </div>
          </div>
          <div className="share-arrow">→</div>
          <div className="share-step">
            <div className="share-step-num">3</div>
            <div className="share-step-body">
              <h4>즉시 참여</h4>
              <p>상대방이 코드를 입력하면 바로 함께 관리!</p>
              <div className="share-join-mock">
                <div className="share-join-folder">📁 오늘 장보기</div>
                <div className="share-join-info">방장: 유재석 · 현재 인원: 0/3</div>
                <button className="share-join-btn">공유받기 요청</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScenariosSection() {
  const { ref, inView } = useInView()
  const [activeTab, setActiveTab] = useState(0)
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean[]>>(
    Object.fromEntries(SCENARIOS.map((s, i) => [i, [...s.checked]]))
  )

  const toggle = (scenarioIdx: number, itemIdx: number) => {
    setCheckedMap(prev => ({
      ...prev,
      [scenarioIdx]: prev[scenarioIdx].map((v, i) => i === itemIdx ? !v : v),
    }))
  }

  const s = SCENARIOS[activeTab]
  const checks = checkedMap[activeTab]

  return (
    <section className="scenarios-section" ref={ref}>
      <div className="section-inner">
        <div className={`section-label fade-up${inView ? ' visible' : ''}`} style={{ color: '#F5841F' }}>사용 시나리오</div>
        <h2 className={`section-title fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          어떤 상황에서도 함께
        </h2>
        <div className={`scenario-tabs fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          {SCENARIOS.map((sc, i) => (
            <button
              key={i}
              className={`scenario-tab${activeTab === i ? ' active' : ''}`}
              style={activeTab === i ? { borderColor: sc.color, color: sc.color } : {}}
              onClick={() => setActiveTab(i)}
            >
              {sc.label}
            </button>
          ))}
        </div>
        <div className={`scenario-content fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.2s', borderColor: s.color + '44' }}>
          <div className="scenario-phone">
            <div className="scenario-phone-title" style={{ color: s.color }}>{s.title}</div>
            <ul className="scenario-todo-list">
              {s.items.map((item, i) => (
                <li
                  key={i}
                  className={`scenario-todo-item${checks[i] ? ' checked' : ''}`}
                  onClick={() => toggle(activeTab, i)}
                >
                  <span
                    className="scenario-checkbox"
                    style={checks[i] ? { background: s.color, borderColor: s.color } : {}}
                  >
                    {checks[i] && '✓'}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="scenario-progress-row">
              <div className="scenario-bar-bg">
                <div
                  className="scenario-bar-fill"
                  style={{
                    width: `${(checks.filter(Boolean).length / s.items.length) * 100}%`,
                    background: s.color,
                  }}
                />
              </div>
              <span style={{ color: s.color, fontWeight: 700 }}>
                {checks.filter(Boolean).length}/{s.items.length}
              </span>
            </div>
          </div>
          <div className="scenario-desc">
            <p>{s.desc}</p>
            <div className="scenario-badge" style={{ background: s.color + '18', color: s.color }}>
              {s.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DownloadSection() {
  const { ref, inView } = useInView()
  return (
    <section className="download-section" ref={ref}>
      <div className={`download-inner fade-up${inView ? ' visible' : ''}`}>
        <SharedCheckLogo size={72} />
        <h2 className="download-title">지금 바로 시작하세요</h2>
        <p className="download-sub">
          Shared Check와 함께 더욱 스마트하고 즐거운 협업을 경험해보세요!
        </p>
        <div className="download-btns">
          <a
            href="https://apps.apple.com/kr/app/shared-check/id6762721758"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn-main"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store 다운로드
          </a>
          <a
            href="https://github.com/yoo94"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn-ghost"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-logo">
          <SharedCheckLogo size={32} />
          <span className="header-logo-text">Shared Check</span>
        </div>
        <nav className="header-nav">
          <a href="https://apps.apple.com/kr/app/shared-check/id6762721758" target="_blank" rel="noopener noreferrer">App Store</a>
          <a href="https://github.com/yoo94" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <SharedCheckLogo size={28} />
          <span>Shared Check</span>
        </div>
        <p className="footer-sub">함께하는 투두 리스트 · 코드로 간편 공유</p>
        <div className="footer-links">
          <a href="https://apps.apple.com/kr/app/shared-check/id6762721758" target="_blank" rel="noopener noreferrer">App Store</a>
          <span>·</span>
          <a href="https://github.com/yoo94" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="footer-copy">© 2024 Shared Check. All rights reserved.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShareCodeSection />
        <ScenariosSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
