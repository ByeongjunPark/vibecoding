/**
 * LXP (Learning Experience Platform) 재사용 가능한 카드 컴포넌트 렌더러
 * CSS 클래스 기반 렌더링 — style.css의 디자인 시스템 활용
 */

window.Components = (function () {

  // HTML 이스케이프 유틸리티
  const esc = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  /* ──────────────────────────────
     토스트 알림
  ────────────────────────────── */
  const showToast = (message) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  /* ──────────────────────────────
     1. 세션 헤더
  ────────────────────────────── */
  const renderSessionHeader = (session) => {
    const { number, title, subtitle, duration, objectives = [] } = session;
    const objHTML = objectives.map(o => `<li>${esc(o)}</li>`).join('');
    return `
      <div class="session-header fade-in">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <span class="badge badge--primary">${number}차시</span>
          <span class="badge badge--time">⏱ ${esc(duration)}</span>
        </div>
        <p class="subtitle">${esc(subtitle)}</p>
        <h1>${esc(title)}</h1>
        <div class="learning-objectives">
          <h3>🎯 학습 목표</h3>
          <ul>${objHTML}</ul>
        </div>
      </div>`;
  };

  /* ──────────────────────────────
     2. 개념 카드
  ────────────────────────────── */
  const renderConceptCard = (data) => {
    const { icon = '💡', title, body, image } = data;
    const imgHTML = image
      ? `<img src="${esc(image)}" alt="${esc(title)}">`
      : '';
    return `
      <div class="concept-card fade-in">
        <h3 class="concept-card-title">
          <span>${icon}</span> ${esc(title)}
        </h3>
        <div style="line-height:1.7;color:var(--text);">${body}</div>
        ${imgHTML}
      </div>`;
  };

  /* ──────────────────────────────
     3. 단계별 카드
  ────────────────────────────── */
  const renderStepCard = (data) => {
    const { steps = [] } = data;
    const items = steps.map((s, i) => {
      const imgHTML = s.image ? `<img src="${esc(s.image)}" alt="${esc(s.title)}" style="max-width:100%;border-radius:var(--radius-sm);margin-top:12px;">` : '';
      return `
        <div class="step-card">
          <div class="step-number">${i + 1}</div>
          <div class="step-content">
            <h3>${esc(s.title)}</h3>
            <p style="margin:0;color:var(--text);line-height:1.6;">${esc(s.description)}</p>
            ${imgHTML}
          </div>
        </div>`;
    }).join('');

    return `<div class="step-container fade-in">${items}</div>`;
  };

  /* ──────────────────────────────
     4. 코드 블록
  ────────────────────────────── */
  const renderCodeBlock = (data) => {
    const { language = 'text', code, filename } = data;
    const fnHTML = filename
      ? `<span class="code-lang">📄 ${esc(filename)}</span>`
      : `<span class="code-lang">${esc(language)}</span>`;
    return `
      <div class="code-wrapper fade-in">
        <div class="code-header">
          ${fnHTML}
          <button class="copy-btn" data-code="${esc(code)}">📋 복사</button>
        </div>
        <pre class="code-block"><code>${esc(code)}</code></pre>
      </div>`;
  };

  /* ──────────────────────────────
     5. 외부 링크 카드
  ────────────────────────────── */
  const renderLinkCard = (data) => {
    const { title, description, url, icon = '🔗' } = data;
    return `
      <a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="link-card fade-in">
        <div class="link-icon"><span style="font-size:1.25rem;">${icon}</span></div>
        <div class="link-content">
          <div class="link-title">${esc(title)}</div>
          <div class="link-desc">${esc(description)}</div>
        </div>
        <div class="link-arrow">→</div>
      </a>`;
  };

  /* ──────────────────────────────
     5-2. 링크 그리드 컨테이너 (2*2, 3*1 등)
  ────────────────────────────── */
  const renderLinkGrid = (data) => {
    const { cols = 2, links = [] } = data; // cols: 2 (2x2) or 3 (3x1)
    const cards = links.map(item => `
      <div class="link-card" style="margin:0;height:100%;align-items:flex-start;">
        <div class="link-icon" style="margin-top:4px;"><span style="font-size:1.25rem;">${item.icon || '🔗'}</span></div>
        <div class="link-content">
          <div class="link-title" style="margin-bottom:8px;font-size:1.05rem;">${esc(item.title)}</div>
          <div class="link-desc" style="line-height:1.6;color:var(--text);">${item.description}</div>
        </div>
      </div>
    `).join('');

    const gridCols = cols === 3 ? 'repeat(auto-fit, minmax(260px, 1fr))' : 'repeat(auto-fit, minmax(340px, 1fr))';

    return `
      <div class="fade-in" style="display:grid;grid-template-columns:${gridCols};gap:16px;margin:16px 0 24px;">
        ${cards}
      </div>
    `;
  };

  /* ──────────────────────────────
     6. 팁 / 경고 카드
  ────────────────────────────── */
  const renderTipCard = (data) => {
    const variant = data.variant || data.type || 'tip';
    const isWarn = variant === 'warning';
    const cls = isWarn ? 'tip-card tip-card--warning' : 'tip-card tip-card--tip';
    const label = isWarn ? '⚠️ 주의' : '💡 꿀팁';
    return `
      <div class="${cls} fade-in">
        <div class="tip-icon"><strong>${label}</strong></div>
        <div class="tip-content">${data.content}</div>
      </div>`;
  };

  /* ──────────────────────────────
     7. 체크리스트 (인터랙티브)
  ────────────────────────────── */
  const renderChecklist = (data) => {
    const { sessionId, items = [] } = data;
    const rows = items.map(item => `
      <label class="checklist-item">
        <input type="checkbox" class="checklist-input"
               data-session="${esc(sessionId)}" data-id="${esc(item.id)}">
        <span class="checklist-box">
          <svg viewBox="0 0 12 10"><polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>
        </span>
        <span class="checklist-text">${esc(item.label)}</span>
      </label>`).join('');

    return `
      <div class="checklist fade-in" data-session-wrapper="${esc(sessionId)}">
        <h3 style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <span>✅ 진행률 체크리스트</span>
          <span class="checklist-progress badge badge--time">0 / ${items.length}</span>
        </h3>
        ${rows}
      </div>`;
  };

  /* ──────────────────────────────
     8. 퀴즈 카드
  ────────────────────────────── */
  const renderQuizCard = (data) => {
    const { question, options = [], explanation } = data;
    const opts = options.map((o, i) =>
      `<button class="quiz-option" data-correct="${o.correct}">${i + 1}. ${esc(o.text)}</button>`
    ).join('');
    return `
      <div class="quiz-card fade-in">
        <p class="quiz-question">❓ ${esc(question)}</p>
        <div class="quiz-options">${opts}</div>
        <div class="quiz-feedback"></div>
        <div class="quiz-explanation" style="display:none;margin-top:12px;padding:14px;background:var(--code-bg);border-radius:var(--radius-sm);line-height:1.6;">
          <strong>해설:</strong> ${esc(explanation || '')}
        </div>
      </div>`;
  };

  /* ──────────────────────────────
     9. 구분선
  ────────────────────────────── */
  const renderSectionDivider = () => `<hr class="section-divider">`;

  /* ──────────────────────────────
     10. 비디오 임베드
  ────────────────────────────── */
  const renderVideoEmbed = (data) => {
    const { url, title = '' } = data;
    let embedUrl = url;
    const m = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    if (m) embedUrl = `https://www.youtube.com/embed/${m[1]}`;
    return `
      <div class="fade-in" style="position:relative;padding-bottom:56.25%;height:0;border-radius:var(--radius);overflow:hidden;margin:20px 0;box-shadow:var(--shadow-sm);">
        <iframe src="${esc(embedUrl)}" title="${esc(title)}" frameborder="0"
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
      </div>`;
  };

  /* ──────────────────────────────
     11. 섹션 디스패처
  ────────────────────────────── */
  const renderSection = (section) => {
    switch (section.type) {
      case 'concept':   return renderConceptCard(section);
      case 'steps':     return renderStepCard(section);
      case 'code':      return renderCodeBlock(section);
      case 'link':      return renderLinkCard(section);
      case 'linkGrid':  return renderLinkGrid(section);
      case 'tip':       return renderTipCard(section);
      case 'warning':   return renderTipCard(section);
      case 'checklist': return renderChecklist(section);
      case 'quiz':      return renderQuizCard(section);
      case 'promptGenerator': return renderPromptGenerator(section);
      case 'divider':   return renderSectionDivider();
      case 'video':     return renderVideoEmbed(section);
      default:          return '';
    }
  };

  /* ──────────────────────────────
     12. 전체 세션 페이지
  ────────────────────────────── */
  const renderSessionPage = (session) => {
    const header = renderSessionHeader(session);
    const sections = (session.sections || []).map(renderSection).join('');
    return `<div class="session-page">${header}${sections}</div>`;
  };

  /* ──────────────────────────────
     인터랙션 초기화
  ────────────────────────────── */
  const storageKey = (sid) => `vibe-checklist-${sid}`;

  const initChecklist = (sessionId) => {
    const wrapper = document.querySelector(`[data-session-wrapper="${sessionId}"]`);
    if (!wrapper) return;

    const key = storageKey(sessionId);
    let state = {};
    try { state = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { /* ignore */ }

    const boxes = wrapper.querySelectorAll('.checklist-input');
    const update = () => {
      let n = 0;
      boxes.forEach(cb => {
        if (cb.checked) n++;
        const txt = cb.closest('.checklist-item').querySelector('.checklist-text');
        if (txt) {
          txt.style.color = cb.checked ? 'var(--text-muted)' : '';
          txt.style.textDecoration = cb.checked ? 'line-through' : '';
        }
      });
      const prog = wrapper.querySelector('.checklist-progress');
      if (prog) prog.textContent = `${n} / ${boxes.length}`;
      // 전역 진행률 업데이트 알림
      window.dispatchEvent(new CustomEvent('checklist-updated'));
    };

    boxes.forEach(cb => {
      const id = cb.dataset.id;
      if (state[id]) cb.checked = true;
      cb.addEventListener('change', () => {
        const s = {};
        boxes.forEach(c => { s[c.dataset.id] = c.checked; });
        localStorage.setItem(key, JSON.stringify(s));
        update();
      });
    });
    update();
  };

  const initQuiz = () => {
    document.querySelectorAll('.quiz-card').forEach(card => {
      if (card.dataset.init) return;
      card.dataset.init = 'true';
      const opts = card.querySelectorAll('.quiz-option');
      const fb = card.querySelector('.quiz-feedback');
      const expl = card.querySelector('.quiz-explanation');

      opts.forEach(btn => {
        btn.addEventListener('click', function () {
          if (card.classList.contains('answered')) return;
          const correct = this.dataset.correct === 'true';
          if (correct) {
            this.classList.add('correct');
            fb.className = 'quiz-feedback show correct';
            fb.innerHTML = '<strong>🎉 정답입니다!</strong> 잘 하셨어요.';
            if (expl) expl.style.display = 'block';
            card.classList.add('answered');
          } else {
            this.classList.add('incorrect');
            fb.className = 'quiz-feedback show';
            fb.style.background = '#FEF2F2';
            fb.style.color = '#991B1B';
            fb.innerHTML = '<strong>❌ 아쉽습니다.</strong> 다시 시도해보세요!';
            setTimeout(() => {
              if (!card.classList.contains('answered')) {
                this.classList.remove('incorrect');
                fb.className = 'quiz-feedback';
              }
            }, 1200);
          }
        });
      });
    });
  };

  const initCodeCopy = () => {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      if (btn.dataset.init) return;
      btn.dataset.init = 'true';
      btn.addEventListener('click', async () => {
        const code = btn.dataset.code;
        try {
          await navigator.clipboard.writeText(code);
          btn.textContent = '✅ 복사됨!';
          btn.classList.add('copied');
          showToast('클립보드에 복사되었습니다!');
          setTimeout(() => {
            btn.textContent = '📋 복사';
            btn.classList.remove('copied');
          }, 2000);
        } catch {
          showToast('복사에 실패했습니다. 직접 선택해서 복사해주세요.');
        }
      });
    });
  };

  /* ──────────────────────────────
     11. 교육용 프롬프트 제작소
  ────────────────────────────── */
  const renderPromptGenerator = (data = {}) => {
    const mode = data.mode || 'gemini'; // 'gemini' | 'canva'
    const isCanva = mode === 'canva';
    const title = data.title || (isCanva ? '🛠️ 캔바 AI 전용 데이터구조 프롬프트 제작소' : '🛠️ 교육용 웹앱 프롬프트 제작소');
    const desc = data.description || (isCanva ? '캔바 AI는 임시 데이터구조(백엔드 데이터)를 정의하여 폼 입력, 목록 저장, 단순 점수 합산 등을 구조화할 수 있습니다.' : '아래 항목을 입력하면 제미나이 캔버스에 바로 사용할 수 있는 완벽한 프롬프트가 생성됩니다!');
    const prefix = isCanva ? 'canva-' : 'pg-';

    const dataStructureField = isCanva ? `
      <div style="margin-bottom:20px;">
        <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🗄️ 백엔드 데이터 구조 설계 (저장할 데이터 항목)</label>
        <textarea id="${prefix}datastruct" class="pg-input" rows="3" placeholder="예: 
1. 상벌점 데이터: 학생이름, 구분(상점/벌점), 항목명, 점수, 입력일자
2. 할일(TO-DO) 데이터: 항목내용, 마감일, 완료여부(true/false), 우선순위" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;"></textarea>
        <span style="font-size:0.8rem;color:var(--primary);font-weight:500;">💡 캔바 AI는 1차시 제미나이 캔버스와 달리 단순 화면(프론트)을 넘어 폼 데이터를 받는 구조(백엔드 데이터)까지 프롬프트로 설계할 수 있습니다!</span>
      </div>
    ` : '';

    return `
      <div class="card prompt-generator-card fade-in" data-mode="${mode}" style="background:var(--surface);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);border:2px solid ${isCanva ? '#8B5CF6' : 'var(--primary-light)'};margin-bottom:24px;">
        <h3 style="display:flex;align-items:center;gap:8px;margin-bottom:8px;color:${isCanva ? '#6D28D9' : 'var(--primary)'};font-size:1.25rem;">
          ${esc(title)}
        </h3>
        <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:20px;">${esc(desc)}</p>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;margin-bottom:20px;">
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">👨‍🎓 교육 대상</label>
            <input type="text" id="${prefix}target" class="pg-input" placeholder="예: 초등학교 5학년, 중학생, 교사" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🎯 사용 목적 / 수업 주제</label>
            <input type="text" id="${prefix}purpose" class="pg-input" placeholder="예: 상벌점 관리, TO-DO 할일 목록 관리" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">💡 콘텐츠 / 앱 제목</label>
            <input type="text" id="${prefix}appname" class="pg-input" placeholder="예: 우리반 상벌점 게시판, 오늘 나의 할일" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">⚡ 화면 기능 및 UI 디자인 요구사항</label>
          <textarea id="${prefix}features" class="pg-input" rows="3" placeholder="예: 
1. 상단에 상점/벌점 통계 그래프 표시
2. 학생 이름 선택 후 점수 부여 폼 제시
3. 전체 내역 표 및 필터링 기능" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;"></textarea>
        </div>

        ${dataStructureField}

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">✨ 디자인 스타일 / 무드</label>
          <select id="${prefix}style" class="pg-input" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;background:white;">
            <option value="학생들이 좋아할 만한 밝고 귀여운 파스텔 톤 디자인">🎨 밝고 귀여운 파스텔 스타일 (초등/중등 추천)</option>
            <option value="깔끔하고 모던하며 신뢰감을 주는 블루/슬레이트 톤 디자인">💻 깔끔하고 모던한 스타일 (고등/선생님 추천)</option>
            <option value="레트로 8비트 게임 느낌의 알록달록하고 재미있는 스타일">🎮 레트로 게임 스타일</option>
            <option value="눈이 편안하고 따뜻한 크림/우드 파스텔 톤 디자인">🌿 따뜻하고 편안한 친환경 스타일</option>
          </select>
        </div>

        <div style="text-align:center;margin-bottom:20px;">
          <button id="${prefix}generate-btn" style="background:${isCanva ? '#7C3AED' : 'var(--primary)'};color:white;border:none;padding:12px 28px;font-size:1rem;font-weight:700;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.2s ease;box-shadow:0 4px 12px ${isCanva ? 'rgba(124,58,237,0.25)' : 'rgba(13,115,119,0.25)'};">
            ✨ ${isCanva ? '캔바 AI 전용 프롬프트 생성하기' : '맞춤형 프롬프트 생성하기'}
          </button>
        </div>

        <div id="${prefix}result-container" style="display:none;margin-top:20px;padding-top:20px;border-top:1px dashed var(--border);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <strong style="color:${isCanva ? '#6D28D9' : 'var(--primary)'};font-size:0.95rem;">🚀 생성된 프롬프트</strong>
            <button id="${prefix}copy-btn" style="background:${isCanva ? '#F3E8FF' : 'var(--primary-light)'};color:${isCanva ? '#6D28D9' : 'var(--primary-hover)'};border:1px solid ${isCanva ? '#7C3AED' : 'var(--primary)'};padding:6px 14px;border-radius:var(--radius-sm);font-weight:600;font-size:0.85rem;cursor:pointer;">
              📋 프롬프트 복사하기
            </button>
          </div>
          <pre id="${prefix}result-code" style="background:var(--code-bg);padding:16px;border-radius:var(--radius-sm);white-space:pre-wrap;word-break:break-word;font-family:'Fira Code', monospace;font-size:0.875rem;line-height:1.6;color:var(--text);border:1px solid var(--border);"></pre>
        </div>
      </div>`;
  };

  const initPromptGenerator = () => {
    // 1. Gemini 모드
    const genBtnGemini = document.getElementById('pg-generate-btn');
    if (genBtnGemini && !genBtnGemini.dataset.init) {
      genBtnGemini.dataset.init = 'true';
      const copyBtn = document.getElementById('pg-copy-btn');
      const resultBox = document.getElementById('pg-result-container');
      const resultCode = document.getElementById('pg-result-code');

      genBtnGemini.addEventListener('click', () => {
        const target = document.getElementById('pg-target')?.value.trim() || '학생';
        const purpose = document.getElementById('pg-purpose')?.value.trim() || '교수학습 활동';
        const appName = document.getElementById('pg-appname')?.value.trim() || '맞춤형 교육 웹앱';
        const features = document.getElementById('pg-features')?.value.trim() || '사용하기 편리하고 직관적인 기능';
        const style = document.getElementById('pg-style')?.value || '밝고 예쁜 스타일';

        const generatedPrompt = `다음 조건에 맞는 HTML/CSS/JavaScript 싱글 페이지 웹 애플리케이션을 제미나이 캔버스(Canvas)용으로 만들어줘.

[기본 정보]
- 교육 대상: ${target}
- 사용 목적: ${purpose}
- 웹앱 제목: ${appName}

[핵심 기능 및 구성]
${features}

[디자인 요구사항]
- 디자인 스타일: ${style}
- 사용자가 반응형 화면으로 PC와 모바일 모두에서 편리하게 사용할 수 있도록 해줘.
- 사용자 인터페이스(UI)가 매우 직관적이고 시각적으로 흥미롭도록 제작해줘.

지금 바로 전체 완성된 코드(HTML/CSS/JS 통합)로 웹앱을 제작해줘!`;

        resultCode.textContent = generatedPrompt;
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast('✨ 제미나이 캔버스 프롬프트가 성공적으로 생성되었습니다!');
      });

      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const text = resultCode.textContent;
          if (!text) return;
          try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = '✅ 복사 완료!';
            showToast('클립보드에 복사되었습니다! 제미나이 캔버스에 붙여넣으세요.');
            setTimeout(() => { copyBtn.textContent = '📋 프롬프트 복사하기'; }, 2000);
          } catch {
            showToast('복사에 실패했습니다.');
          }
        });
      }
    }

    // 2. Canva 모드
    const genBtnCanva = document.getElementById('canva-generate-btn');
    if (genBtnCanva && !genBtnCanva.dataset.init) {
      genBtnCanva.dataset.init = 'true';
      const copyBtn = document.getElementById('canva-copy-btn');
      const resultBox = document.getElementById('canva-result-container');
      const resultCode = document.getElementById('canva-result-code');

      genBtnCanva.addEventListener('click', () => {
        const target = document.getElementById('canva-target')?.value.trim() || '학생/교사';
        const purpose = document.getElementById('canva-purpose')?.value.trim() || '학급 관리 및 데이터 기록';
        const appName = document.getElementById('canva-appname')?.value.trim() || '캔바 인터랙티브 웹앱';
        const features = document.getElementById('canva-features')?.value.trim() || '목록 보기, 폼 입력 기능';
        const datastruct = document.getElementById('canva-datastruct')?.value.trim() || '항목명, 점수/상태, 작성일자';
        const style = document.getElementById('canva-style')?.value || '밝고 예쁜 파스텔 톤';

        const generatedPrompt = `캔바 AI(Canva AI) 웹사이트 생성용 프롬프트입니다.

[기본 정보]
- 대상: ${target}
- 주제/목적: ${purpose}
- 콘텐츠/앱 제목: ${appName}

[프론트엔드 UI/기능 요구사항]
${features}

[백엔드 데이터 구조 설계 (Data Structure)]
- 다음 항목을 수집하고 저장 및 처리할 수 있는 데이터 구조를 포함해줘:
${datastruct}

[디자인 & 스타일]
- ${style}
- 캔바의 시각적 디자인 요소와 결합하여 직관적인 인터랙션 웹페이지로 구성해줘.`;

        resultCode.textContent = generatedPrompt;
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast('✨ 캔바 AI 프롬프트가 성공적으로 생성되었습니다!');
      });

      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const text = resultCode.textContent;
          if (!text) return;
          try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = '✅ 복사 완료!';
            showToast('클립보드에 복사되었습니다! canva.com/ai 대화창에 붙여넣으세요.');
            setTimeout(() => { copyBtn.textContent = '📋 프롬프트 복사하기'; }, 2000);
          } catch {
            showToast('복사에 실패했습니다.');
          }
        });
      }
    }
  };

  const initAllInteractions = () => {
    document.querySelectorAll('.checklist[data-session-wrapper]').forEach(el => {
      initChecklist(el.dataset.sessionWrapper);
    });
    initQuiz();
    initCodeCopy();
    initPromptGenerator();
  };

  // Public API
  return {
    showToast,
    renderSessionHeader,
    renderConceptCard,
    renderStepCard,
    renderCodeBlock,
    renderLinkCard,
    renderTipCard,
    renderChecklist,
    renderQuizCard,
    renderSectionDivider,
    renderVideoEmbed,
    renderSection,
    renderSessionPage,
    initChecklist,
    initQuiz,
    initCodeCopy,
    initAllInteractions
  };
})();
