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
            <p style="margin:0;color:var(--text);line-height:1.6;">${s.description}</p>
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
    const cards = links.map(item => {
      let actionButtons = '';
      if (item.copyUrl || item.demoUrl) {
        const copyBtn = item.copyUrl
          ? `<a href="${esc(item.copyUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:4px;padding:8px 14px;background:var(--primary-light);color:var(--primary-hover);border:1px solid var(--primary);border-radius:var(--radius-sm);font-weight:700;font-size:0.85rem;text-decoration:none;transition:all 0.2s ease;">📄 [구글시트 사본 복사하기]</a>`
          : '';
        const demoBtn = item.demoUrl
          ? `<a href="${esc(item.demoUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:4px;padding:8px 14px;background:#EFF6FF;color:#2563EB;border:1px solid #3B82F6;border-radius:var(--radius-sm);font-weight:700;font-size:0.85rem;text-decoration:none;transition:all 0.2s ease;">🚀 [웹앱 실행화면 체험하기]</a>`
          : '';
        actionButtons = `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">${copyBtn}${demoBtn}</div>`;
      }

      if (item.copyUrl || item.demoUrl) {
        return `
          <div class="link-card" style="margin:0;height:100%;align-items:flex-start;flex-direction:row;padding:20px;">
            <div class="link-icon" style="margin-top:2px;flex-shrink:0;"><span style="font-size:1.25rem;">${item.icon || '🔗'}</span></div>
            <div class="link-content" style="flex:1;">
              <div class="link-title" style="margin-bottom:8px;font-size:1.05rem;font-weight:700;">${esc(item.title)}</div>
              <div class="link-desc" style="line-height:1.65;color:var(--text);font-size:0.9rem;">${item.description}</div>
              ${actionButtons}
            </div>
          </div>
        `;
      }

      // 일반 URL 카드
      return `
        <a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" class="link-card" style="margin:0;height:100%;">
          <div class="link-icon"><span style="font-size:1.25rem;">${item.icon || '🔗'}</span></div>
          <div class="link-content">
            <div class="link-title">${esc(item.title)}</div>
            <div class="link-desc">${item.description}</div>
          </div>
          <div class="link-arrow">→</div>
        </a>
      `;
    }).join('');

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
    const mode = data.mode || 'gemini'; // 'gemini' | 'canva' | 'feedback' | 'chatbot'
    const isCanva = mode === 'canva';
    const isFeedback = mode === 'feedback';
    const isChatbot = mode === 'chatbot';
    
    let prefix = 'pg-';
    let borderColor = 'var(--primary-light)';
    let titleColor = 'var(--primary)';
    let btnColor = 'var(--primary)';
    let btnText = '✨ 맞춤형 프롬프트 생성하기';

    if (isCanva) {
      prefix = 'canva-';
      borderColor = '#8B5CF6';
      titleColor = '#6D28D9';
      btnColor = '#7C3AED';
      btnText = '✨ 캔바 AI 전용 프롬프트 생성하기';
    } else if (isFeedback) {
      prefix = 'fb-';
      borderColor = '#059669';
      titleColor = '#047857';
      btnColor = '#059669';
      btnText = '✨ AI 글쓰기 피드백 도구 프롬프트 생성하기';
    } else if (isChatbot) {
      prefix = 'cb-';
      borderColor = '#3B82F6';
      titleColor = '#1D4ED8';
      btnColor = '#2563EB';
      btnText = '✨ AI 대화형 챗봇 프롬프트 생성하기';
    }

    const title = data.title || (
      isCanva ? '🛠️ 캔바 AI 전용 데이터구조 프롬프트 제작소' :
      isFeedback ? '🛠️ 5차시 실습: AI 글쓰기 피드백 도구 프롬프트 제작소' :
      isChatbot ? '🛠️ 6차시 실습: 페르소나/어포던스 설정 AI 챗봇 프롬프트 제작소' :
      '🛠️ 교육용 웹앱 프롬프트 제작소'
    );
    const desc = data.description || '아래 항목을 직접 입력/수정하여 나만의 맞춤형 AI 바이브코딩 프롬프트를 만드세요!';

    // Mode-specific fields
    let fieldsHTML = '';

    if (isFeedback) {
      fieldsHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;margin-bottom:20px;">
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">👨‍🎓 교육 대상 / 사용 대상</label>
            <input type="text" id="${prefix}target" class="pg-input" value="초등학교 5학년" placeholder="예: 초등학교 5학년, 중학생" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">💡 웹앱 제목</label>
            <input type="text" id="${prefix}appname" class="pg-input" value="다정한 AI 글쓰기 피드백 도구" placeholder="예: 우리반 글쓰기 피드백 도구" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🎯 피드백 역할 및 원칙 (수정 가능)</label>
          <textarea id="${prefix}rules" class="pg-input" rows="3" placeholder="예: 
1. 잘한 점 칭찬 2가지 작성하기
2. 문장을 더 생생하게 만드는 구체적 개선 제안 1가지 제시하기" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;">1. 잘한 점 칭찬 2가지 작성하기
2. 문장을 더 생생하게 만드는 구체적 개선 제안 1가지 제시하기</textarea>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🗣️ 피드백 어조 및 스타일 (수정 가능)</label>
          <input type="text" id="${prefix}tone" class="pg-input" value="초등학생 눈높이에 맞춘 다정하고 친절한 선생님 어조" placeholder="예: 다정한 선생님 어조, 엄격하고 정확한 편집자 어조" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">📊 피드백 구성 단계 (수정 가능)</label>
          <input type="text" id="${prefix}steps" class="pg-input" value="1단계: 칭찬하기 ➔ 2단계: 문장 다듬기 팁 ➔ 3단계: 응원 메시지" placeholder="예: 칭찬 ➔ 개선 팁 ➔ 응원" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
        </div>

        <div style="margin-bottom:20px;background:var(--surface-muted);padding:14px;border-radius:var(--radius-sm);border:1px dashed #059669;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:#047857;">⚡ (선택) 업스테이지 API 키로 프롬프트 실시간 정제하기</label>
          <input type="text" id="${prefix}upstage-key" class="pg-input" value="" placeholder="up_... (발급받은 API 키를 입력하면 업스테이지 Solar AI가 바이브코딩 프롬프트를 한층 정교하게 다듬어줍니다)" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.875rem;outline:none;background:white;">
          <span style="font-size:0.8rem;color:var(--text-muted);display:block;margin-top:4px;">💡 API 키를 입력하지 않아도 맞춤형 프롬프트가 즉시 생성되며, 키를 입력하면 Solar AI가 실시간 정제합니다.</span>
        </div>
      `;
    } else if (isChatbot) {
      fieldsHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;margin-bottom:20px;">
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🤖 챗봇 이름 / 제목</label>
            <input type="text" id="${prefix}botname" class="pg-input" value="세종대왕과의 역사 대화" placeholder="예: 세종대왕 챗봇, 과학자 장영실" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
          <div>
            <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">👨‍🎓 대화 대상</label>
            <input type="text" id="${prefix}target" class="pg-input" value="초등학생" placeholder="예: 초등학생, 중학생" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;">
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🎭 챗봇 페르소나 (역할 및 캐릭터) (수정 가능)</label>
          <textarea id="${prefix}persona" class="pg-input" rows="2" placeholder="예: 훈민정음을 창제하신 조선 4대 국왕 세종대왕" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;">훈민정음을 창제하신 조선시대 4대 국왕 세종대왕</textarea>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🔄 대화 순서 및 단계 (Conversation Flow) (수정 가능)</label>
          <textarea id="${prefix}flow" class="pg-input" rows="3" placeholder="예: 
1단계: 반갑게 인사하고 학생 이름과 관심사 묻기
2단계: 훈민정음 창제 이야기 나누기
3단계: 학생 질문에 답변하고 덕담하기" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;">1단계: 반갑게 인사하고 학생 이름과 관심사 묻기
2단계: 훈민정음 창제 목적 및 과학 발명품 이야기 나누기
3단계: 학생 질문 답변 및 격려의 덕담으로 마무리하기</textarea>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">⚙️ 대화 조건 및 어포던스 (말투 / 규칙) (수정 가능)</label>
          <textarea id="${prefix}rules" class="pg-input" rows="3" placeholder="예: 
1. 조선 시대 왕의 말투(~하오, ~하노라) 사용하기
2. 150자 이내로 답변하기
3. 정답을 바로 말하지 않고 힌트 주기" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;">1. 고풍스럽고 다정한 조선 시대 왕의 말투(~하오, ~하노라)를 사용할 것
2. 한 번에 150자 이내로 답변할 것
3. 정답을 바로 말하지 않고 학생들이 스스로 생각할 수 있는 힌트를 줄 것</textarea>
        </div>

        <div style="margin-bottom:20px;background:var(--surface-muted);padding:14px;border-radius:var(--radius-sm);border:1px dashed #2563EB;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:#1D4ED8;">⚡ (선택) 업스테이지 API 키로 프롬프트 실시간 정제하기</label>
          <input type="text" id="${prefix}upstage-key" class="pg-input" value="" placeholder="up_... (발급받은 API 키를 입력하면 업스테이지 Solar AI가 바이브코딩 프롬프트를 한층 정교하게 다듬어줍니다)" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.875rem;outline:none;background:white;">
          <span style="font-size:0.8rem;color:var(--text-muted);display:block;margin-top:4px;">💡 API 키를 입력하지 않아도 맞춤형 프롬프트가 즉시 생성되며, 키를 입력하면 Solar AI가 실시간 정제합니다.</span>
        </div>
      `;
    } else {
      // Standard / Canva mode
      const dataStructureField = isCanva ? `
        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:6px;color:var(--text);">🗄️ 백엔드 데이터 구조 설계 (저장할 데이터 항목)</label>
          <textarea id="${prefix}datastruct" class="pg-input" rows="3" placeholder="예: 
  1. 상벌점 데이터: 학생이름, 구분(상점/벌점), 항목명, 점수, 입력일자
  2. 할일(TO-DO) 데이터: 항목내용, 마감일, 완료여부(true/false), 우선순위" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;"></textarea>
          <span style="font-size:0.8rem;color:var(--primary);font-weight:500;">💡 캔바 AI는 1차시 제미나이 캔버스와 달리 단순 화면(프론트)을 넘어 폼 데이터를 받는 구조(백엔드 데이터)까지 프롬프트로 설계할 수 있습니다!</span>
        </div>
      ` : '';

      fieldsHTML = `
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
      `;
    }

    return `
      <div class="card prompt-generator-card fade-in" data-mode="${mode}" style="background:var(--surface);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);border:2px solid ${borderColor};margin-bottom:24px;">
        <h3 style="display:flex;align-items:center;gap:8px;margin-bottom:8px;color:${titleColor};font-size:1.25rem;">
          ${esc(title)}
        </h3>
        <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:20px;">${esc(desc)}</p>

        ${fieldsHTML}

        <div style="text-align:center;margin-bottom:20px;">
          <button id="${prefix}generate-btn" style="background:${btnColor};color:white;border:none;padding:12px 28px;font-size:1rem;font-weight:700;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.2s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
            ${btnText}
          </button>
        </div>

        <div id="${prefix}result-container" style="display:none;margin-top:20px;padding-top:20px;border-top:1px dashed var(--border);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <strong style="color:${titleColor};font-size:0.95rem;">🚀 생성된 맞춤형 바이브코딩 프롬프트</strong>
            <button id="${prefix}copy-btn" style="background:var(--primary-light);color:var(--primary-hover);border:1px solid var(--primary);padding:6px 14px;border-radius:var(--radius-sm);font-weight:600;font-size:0.85rem;cursor:pointer;">
              📋 프롬프트 복사하기
            </button>
          </div>
          <pre id="${prefix}result-code" style="background:var(--code-bg);padding:16px;border-radius:var(--radius-sm);white-space:pre-wrap;word-break:break-word;font-family:'Fira Code', monospace;font-size:0.875rem;line-height:1.6;color:var(--text);border:1px solid var(--border);"></pre>
        </div>
      </div>`;
  };

  const initPromptGenerator = () => {
    // Helper: Call Upstage Solar API if key is present
    const callUpstageRefine = async (apiKey, basePrompt) => {
      if (!apiKey) return basePrompt;
      showToast('🤖 업스테이지 Solar AI가 바이브코딩 프롬프트를 깔끔하게 다듬는 중...');
      try {
        const response = await fetch('https://api.upstage.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            model: 'solar-pro',
            messages: [
              {
                role: 'system',
                content: `당신은 바이브코딩(Vibe Coding) 프롬프트 다듬기 전문 엔지니어입니다.
[최우선 필수 지침]
1. 절대로 실제 HTML, CSS, JavaScript 완성 코드를 작성하거나 출력하지 마세요! 코드 블록(\`\`\`javascript 등)을 포함하지 마세요.
2. 당신의 유일한 역할은 수강생이 제미나이(Gemini)나 AI 챗봇에 복사해서 붙여넣을 '자연어 프롬프트(Prompt)'만 깔끔하게 다듬는 것입니다.
3. 실제 코드는 제미나이가 작성하도록 맡기고, 프롬프트 안에는 [목표], [피드백 원칙/페르소나 어포던스], [구글 시트 DB 자동 세팅(헤더 자동 생성)], [화면 구성요소]를 직관적인 항목 형식으로만 정리하세요.
4. 긴 코드로 프롬프트를 비대하게 만들지 말고, 복사해서 바로 쓰기 좋은 300~500자 안팎의 명확하고 군더더기 없는 한국어 프롬프트로 다듬어 출력하세요.`
              },
              {
                role: 'user',
                content: basePrompt
              }
            ]
          })
        });
        const data = await response.json();
        if (data.choices && data.choices[0]?.message?.content) {
          return data.choices[0].message.content;
        }
      } catch (e) {
        console.error(e);
      }
      return basePrompt;
    };

    // 1. Gemini 모드 (1차시)
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

    // 2. Canva 모드 (2차시)
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

    // 3. Feedback 모드 (5차시)
    const genBtnFeedback = document.getElementById('fb-generate-btn');
    if (genBtnFeedback && !genBtnFeedback.dataset.init) {
      genBtnFeedback.dataset.init = 'true';
      const copyBtn = document.getElementById('fb-copy-btn');
      const resultBox = document.getElementById('fb-result-container');
      const resultCode = document.getElementById('fb-result-code');

      genBtnFeedback.addEventListener('click', async () => {
        const target = document.getElementById('fb-target')?.value.trim() || '학생';
        const appName = document.getElementById('fb-appname')?.value.trim() || 'AI 글쓰기 피드백 도구';
        const rules = document.getElementById('fb-rules')?.value.trim() || '1. 잘한 점 칭찬 2가지\n2. 개선점 1가지';
        const tone = document.getElementById('fb-tone')?.value.trim() || '다정한 선생님 어조';
        const steps = document.getElementById('fb-steps')?.value.trim() || '칭찬 ➔ 개선 팁 ➔ 응원';
        const upstageKey = document.getElementById('fb-upstage-key')?.value.trim();

        let basePrompt = `[선생님 맞춤형 AI 글쓰기 피드백 웹앱 제작 프롬프트]
구글 시트 앱스스크립트(Code.gs)와 웹 화면(Index.html)으로 동작하는 '학생 글쓰기 AI 피드백 지원 도구'를 만들어줘.

[기본 정보]
- 교육 대상: ${target}
- 웹앱 제목: ${appName}

[AI 피드백 역할 및 원칙 (System Prompt / Role)]
- 피드백 원칙 및 기준:
${rules}
- 피드백 어조 및 스타일: ${tone}
- 피드백 구성 단계: ${steps}

[🗄️ 구글 시트 데이터베이스(DB) 구조 자동 세팅 요구사항]
- 구글 시트의 첫 번째 행에 데이터베이스 헤더(컬럼명)가 없거나 시트가 비어있을 경우, 앱스스크립트 코드가 실행될 때 헤더 행이 '짝!' 하고 자동으로 추가되도록 자동 세팅 함수(setupDatabase)를 반드시 포함해줘.
- 데이터베이스 헤더 구성: ['작성일시', '피드백 원칙', '학생 글', 'AI 피드백']

[주요 기능 및 화면 요구사항]
1. 프론트엔드 (Index.html):
   - '피드백 원칙/기준'을 사용자가 필요 시 수정할 수 있는 입력창 제시
   - '학생이 작성한 글' 입력란 및 [✨ AI 피드백 받기] 버튼
   - 결과를 예쁘게 보여주는 피드백 결과 출력 카드 UI

2. 백엔드 (Code.gs):
   - 업스테이지 Solar API를 호출하여 위 '피드백 원칙'과 '어조'에 따라 '학생 글'을 분석하고 맞춤형 피드백을 생성하여 반환해줘.
   - API 키 변수는 var apiKey = "여기에_API_키를_넣으세요"; 형태로 작성해줘.
   - 피드백 결과 및 작성일시를 구글 시트 DB에 한 줄로 자동 기록해줘.`;

        if (upstageKey) {
          genBtnFeedback.disabled = true;
          genBtnFeedback.textContent = '⏳ 업스테이지 AI 정제 중...';
          basePrompt = await callUpstageRefine(upstageKey, basePrompt);
          genBtnFeedback.disabled = false;
          genBtnFeedback.textContent = '✨ AI 글쓰기 피드백 도구 프롬프트 생성하기';
        }

        resultCode.textContent = basePrompt;
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast('✨ AI 글쓰기 피드백 도구 프롬프트가 성공적으로 생성되었습니다!');
      });

      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const text = resultCode.textContent;
          if (!text) return;
          try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = '✅ 복사 완료!';
            showToast('클립보드에 복사되었습니다!');
            setTimeout(() => { copyBtn.textContent = '📋 프롬프트 복사하기'; }, 2000);
          } catch {
            showToast('복사에 실패했습니다.');
          }
        });
      }
    }

    // 4. Chatbot 모드 (6차시)
    const genBtnChatbot = document.getElementById('cb-generate-btn');
    if (genBtnChatbot && !genBtnChatbot.dataset.init) {
      genBtnChatbot.dataset.init = 'true';
      const copyBtn = document.getElementById('cb-copy-btn');
      const resultBox = document.getElementById('cb-result-container');
      const resultCode = document.getElementById('cb-result-code');

      genBtnChatbot.addEventListener('click', async () => {
        const botName = document.getElementById('cb-botname')?.value.trim() || '맞춤형 AI 챗봇';
        const target = document.getElementById('cb-target')?.value.trim() || '학생';
        const persona = document.getElementById('cb-persona')?.value.trim() || '조선시대 4대 국왕 세종대왕';
        const flow = document.getElementById('cb-flow')?.value.trim() || '1단계: 인사 ➔ 2단계: 대화 ➔ 3단계: 마무리';
        const rules = document.getElementById('cb-rules')?.value.trim() || '조선 시대 왕의 말투 사용';
        const upstageKey = document.getElementById('cb-upstage-key')?.value.trim();

        let basePrompt = `[맞춤형 AI 대화형 챗봇 웹앱 제작 프롬프트]
구글 시트 앱스스크립트(Code.gs)와 웹 화면(Index.html)으로 동작하는 '인공지능 대화형 챗봇'을 만들어줘.

[기본 정보]
- 챗봇 이름/제목: ${botName}
- 대화 대상: ${target}

[챗봇 페르소나 및 어포던스 (Role & Rules)]
1. 챗봇 페르소나 (역할 및 인물):
   ${persona}

2. 대화 순서 및 단계 (Conversation Flow):
${flow}

3. 대화 조건 및 어포던스 (말투 및 행동 규칙):
${rules}

[🗄️ 구글 시트 데이터베이스(DB) 구조 자동 세팅 요구사항]
- 구글 시트의 첫 번째 행에 데이터베이스 헤더(컬럼명)가 없거나 시트가 비어있을 경우, 앱스스크립트 코드가 실행될 때 헤더 행이 '짝!' 하고 자동으로 추가되도록 자동 세팅 함수(setupDatabase)를 반드시 포함해줘.
- 데이터베이스 헤더 구성: ['대화일시', '사용자 메시지', '챗봇 응답', '페르소나/조건']

[주요 기능 및 화면 요구사항]
1. 프론트엔드 (Index.html):
   - 카카오톡 스타일의 깔끔하고 모던한 대화창 UI ([전송] 버튼, 실시간 대화 말풍선)

2. 백엔드 (Code.gs):
   - 업스테이지 Solar API를 호출하여 이전 대화 맥락과 위 '페르소나/어포던스 조건'을 유지하며 답변 생성
   - API 키 변수는 var apiKey = "여기에_API_키를_넣으세요"; 형태로 작성해줘.
   - 대화 내역 및 일시를 구글 시트 DB에 함께 기록해줘.`;

        if (upstageKey) {
          genBtnChatbot.disabled = true;
          genBtnChatbot.textContent = '⏳ 업스테이지 AI 정제 중...';
          basePrompt = await callUpstageRefine(upstageKey, basePrompt);
          genBtnChatbot.disabled = false;
          genBtnChatbot.textContent = '✨ AI 대화형 챗봇 프롬프트 생성하기';
        }

        resultCode.textContent = basePrompt;
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast('✨ AI 대화형 챗봇 프롬프트가 성공적으로 생성되었습니다!');
      });

      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const text = resultCode.textContent;
          if (!text) return;
          try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = '✅ 복사 완료!';
            showToast('클립보드에 복사되었습니다!');
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
