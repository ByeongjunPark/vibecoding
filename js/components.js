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
      showToast('🤖 업스테이지 Solar AI가 5가지 구조화 마크다운 프롬프트로 다듬는 중...');
      try {
        const response = await fetch('https://api.upstage.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            model: 'solar-pro3',
            messages: [
              {
                role: 'system',
                content: `당신은 바이브코딩(Vibe Coding) 프롬프트 전문 엔지니어입니다.
주어진 교사 요구사항을 바탕으로 제미나이(Gemini)나 AI 챗봇에게 전달할 완벽한 마크다운 바이브코딩 주문서(Prompt)를 가공하세요.

[최우선 필수 지침]
반드시 프롬프트의 '가장 맨 처음(첫 줄)'에 다음 코딩 요구사항을 문구 그대로 배치하고, 이어서 5가지 마크다운 헤더(#, ##) 구조를 엄격히 유지해서 프롬프트를 작성하세요:

🚨 **[최우선 필수 요구사항]**
**제미나이(Gemini) 및 AI는 구글 앱스스크립트 백엔드 코드(Code.gs)와 웹 화면 프론트엔드 코드(Index.html)를 중간 생략이나 축약 없이 '각각', 그리고 '빠짐없이' 처음부터 끝까지 전체 완성형 코드로 산출해 주세요.**

# [웹앱 제목] 바이브코딩 개발 주문서

## 1. 배경 및 목표
- 개발 배경 및 최종 목표 (교육 대상 포함)

## 2. 사용자 분석
- 주요 사용자, 사용 환경(PC/모바일 웹 브라우저), 사용자 특성/요구사항

## 3. 핵심 기능 정의
- 프론트엔드 UI 기능, 백엔드 AI API 연동 기능, 구글 시트 데이터베이스 자동 기록 기능

## 4. 사용자 경험 흐름 (UX Flow)
- 화면 접속 및 데이터베이스 자동 세팅(백엔드) ➔ 사용자 데이터 입력(프론트엔드) ➔ API 연동 및 로딩 표시(프론트-백엔드) ➔ AI 응답 생성 및 화면 출력/DB 기록(백엔드-프론트엔드) 절차 및 화면 연동 중심 설명

## 5. 참고자료 및 기술 지침
- 5.1 외부 API 연동 지침 (업스테이지 Solar API 공식 도큐먼트 사양: https://api.upstage.ai/v1/chat/completions, model: "solar-pro3", reasoning_effort: "medium", Authorization: Bearer "여기에_API_키를_넣으세요", message.reasoning 추론 및 message.content 응답 처리)
- 5.2 프론트엔드 관련 지침: Index.html 파스텔 톤 모던 UI 및 반응형 CSS
- 5.3 백엔드 관련 지침: Code.gs UrlFetchApp.fetch() 통신
- 5.4 구글 시트 데이터베이스 구성 지침: 시트가 비어있거나 첫 행에 컬럼명이 없을 때 헤더 행이 '짝!' 하고 자동으로 생성되는 setupDatabase() 함수 코딩 지침

[금지 사항]
- 절대로 실제 완성된 HTML/JS/CSS 코드를 직접 쏟아내거나 코드 블록(\`\`\`javascript 등)을 출력하지 마세요!
- 오직 수강생이 AI에게 복사해 넣을 5개 항목 마크다운 프롬프트 텍스트만 깔끔하게 출력하세요.`
              },
              {
                role: 'user',
                content: basePrompt
              }
            ],
            reasoning_effort: 'medium'
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

        const generatedPrompt = `🚨 **[최우선 필수 요구사항]**
**제미나이(Gemini) 및 AI는 웹 화면 프론트엔드 코드를 중간 생략이나 축약 없이 '빠짐없이' 처음부터 끝까지 전체 완성형 코드로 산출해 주세요.**

다음 조건에 맞는 HTML/CSS/JavaScript 싱글 페이지 웹 애플리케이션을 제미나이 캔버스(Canvas)용으로 만들어줘.

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

        const generatedPrompt = `🚨 **[최우선 필수 요구사항]**
**캔바 AI 및 AI는 프론트엔드 화면 UI와 백엔드 데이터 처리 구조를 생략이나 축약 없이 '각각', 그리고 '빠짐없이' 전체 구성으로 산출해 주세요.**

캔바 AI(Canva AI) 웹사이트 생성용 프롬프트입니다.

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
        const target = document.getElementById('fb-target')?.value.trim() || '초등학교 5학년';
        const appName = document.getElementById('fb-appname')?.value.trim() || '다정한 AI 글쓰기 피드백 도구';
        const rules = document.getElementById('fb-rules')?.value.trim() || '1. 잘한 점 칭찬 2가지 작성하기\n2. 문장을 더 생생하게 만드는 구체적 개선 제안 1가지 제시하기';
        const tone = document.getElementById('fb-tone')?.value.trim() || '초등학생 눈높이에 맞춘 다정하고 친절한 선생님 어조';
        const steps = document.getElementById('fb-steps')?.value.trim() || '1단계: 칭찬하기 ➔ 2단계: 문장 다듬기 팁 ➔ 3단계: 응원 메시지';
        const upstageKey = document.getElementById('fb-upstage-key')?.value.trim();

        let basePrompt = `🚨 **[최우선 필수 요구사항]**
**제미나이(Gemini) 및 AI는 구글 앱스스크립트 백엔드 코드(Code.gs)와 웹 화면 프론트엔드 코드(Index.html)를 중간 생략이나 축약 없이 '각각', 그리고 '빠짐없이' 처음부터 끝까지 전체 완성형 코드로 산출해 주세요.**

# [${appName}] 바이브코딩 개발 주문서

## 1. 배경 및 목표
- **개발 배경**: 선생님이 설정한 피드백 원칙과 어조를 바탕으로 학생 글에 맞춰 따뜻하고 구체적인 피드백을 제공하기 위함
- **최종 목표**: ${target}을 위한 '${appName}' 구글 앱스스크립트 웹 애플리케이션 개발

## 2. 사용자 분석
- **주요 사용자**: ${target} 및 담당 교사
- **사용 환경**: PC 및 모바일 반응형 웹 브라우저
- **사용자 특성 및 요구사항**: ${tone}를 적용하여 다정하고 직관적인 UI/UX 제공

## 3. 핵심 기능 정의
- **[기능 1] 프론트엔드 UI**: 피드백 원칙 수정 입력창, 학생 글 입력 폼, [✨ AI 피드백 받기] 버튼, 예쁜 피드백 결과 출력 카드
- **[기능 2] 백엔드 AI 연동**: 업스테이지 Solar API를 호출하여 입력된 원칙과 어조에 맞게 피드백 생성
- **[기능 3] DB 자동 기록**: 피드백 결과를 구글 시트 데이터베이스에 한 줄로 자동 저장

## 4. 사용자 경험 흐름 (UX Flow)
1. **화면 접속 및 DB 자동 세팅**: 웹앱(Index.html) 접속 시 백엔드(Code.gs)가 구글 시트 헤더가 없으면 자동으로 세팅(setupDatabase)함
2. **사용자 글 입력**: 학생/교사가 글을 작성하고 피드백 받기 버튼 클릭
3. **API 연동 & 로딩 표시**: 화면에 로딩 상태를 보여주고 google.script.run으로 백엔드를 거쳐 업스테이지 Solar API 호출
4. **AI 피드백 출력 & DB 저장**: 생성된 피드백을 결과 카드에 보여주고 시트 DB에도 자동 기록

## 5. 참고자료 및 기술 지침
### 5.1 외부 API 연동 지침 (Upstage Solar API 공식 도큐먼트 사양)
- **API Endpoint**: https://api.upstage.ai/v1/chat/completions (또는 OpenAI SDK baseURL: https://api.upstage.ai/v1)
- **인증 헤더**: Authorization: Bearer "여기에_API_키를_넣으세요"
- **모델 및 사양**: model: "solar-pro3", reasoning_effort: "medium"
- **추론 및 답변 처리**: message.reasoning (생각 과정) 확인 및 message.content (최종 답변) 추출
- **피드백 원칙**: ${rules}
- **피드백 단계**: ${steps}

### 5.2 프론트엔드 지침 (Index.html)
- 깔끔하고 친근한 파스텔 톤 디자인 및 반응형 레이아웃

### 5.3 백엔드 지침 (Code.gs)
- UrlFetchApp.fetch()를 사용하는 앱스스크립트 표준 코드

### 5.4 구글 시트 데이터베이스 구성 지침
- 시트 첫 행에 컬럼명이 없으면 ['작성일시', '피드백 원칙', '학생 글', 'AI 피드백'] 헤더 행이 '짝!' 하고 자동 생성되는 setupDatabase() 함수 포함`;

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
        const botName = document.getElementById('cb-botname')?.value.trim() || '세종대왕과의 역사 대화';
        const target = document.getElementById('cb-target')?.value.trim() || '초등학생';
        const persona = document.getElementById('cb-persona')?.value.trim() || '훈민정음을 창제하신 조선시대 4대 국왕 세종대왕';
        const flow = document.getElementById('cb-flow')?.value.trim() || '1단계: 인사 ➔ 2단계: 대화 ➔ 3단계: 마무리';
        const rules = document.getElementById('cb-rules')?.value.trim() || '조선 시대 왕의 말투 사용';
        const upstageKey = document.getElementById('cb-upstage-key')?.value.trim();

        let basePrompt = `🚨 **[최우선 필수 요구사항]**
**제미나이(Gemini) 및 AI는 구글 앱스스크립트 백엔드 코드(Code.gs)와 웹 화면 프론트엔드 코드(Index.html)를 중간 생략이나 축약 없이 '각각', 그리고 '빠짐없이' 처음부터 끝까지 전체 완성형 코드로 산출해 주세요.**

# [${botName}] 바이브코딩 개발 주문서

## 1. 배경 및 목표
- **개발 배경**: 챗봇의 페르소나, 대화 순서, 대화 조건(어포던스)을 반영하여 생생하고 유익한 AI 대화 경험을 제공하기 위함
- **최종 목표**: ${target}을 위한 '${botName}' 대화형 챗봇 웹 애플리케이션 개발

## 2. 사용자 분석
- **주요 사용자**: ${target}
- **사용 환경**: PC 및 모바일 반응형 웹 브라우저
- **사용자 특성 및 요구사항**: 대화 몰입도를 높이는 카카오톡 스타일 대화 UI 및 친근한 페르소나 적용

## 3. 핵심 기능 정의
- **[기능 1] 프론트엔드 UI**: 카카오톡 스타일 모던 대화창, 메시지 입력란 및 [전송] 버튼, 대화 말풍선 목록
- **[기능 2] 백엔드 AI 연동**: 업스테이지 Solar API를 호출하여 페르소나와 대화 규칙에 따른 맞춤형 응답 생성
- **[기능 3] DB 자동 기록**: 대화 내역 및 일시를 구글 시트 데이터베이스에 자동 기록

## 4. 사용자 경험 흐름 (UX Flow)
1. **화면 접속 및 DB 자동 세팅**: 웹앱 접속 시 백엔드가 구글 시트 헤더가 없으면 자동으로 세팅(setupDatabase)함
2. **대화 시작 및 입력**: 사용자가 대화창에 메시지를 입력하고 전송 버튼 클릭
3. **API 연동 & 대화 맥락 유지**: 로딩 말풍선을 표시하며 이전 대화 맥락과 페르소나 조건을 포함해 업스테이지 API 호출
4. **AI 챗봇 응답 출력 & DB 저장**: AI 답변을 말풍선으로 보여주고 구글 시트 DB에도 대화 내역 자동 저장

## 5. 참고자료 및 기술 지침
### 5.1 외부 API 연동 지침 (Upstage Solar API 공식 도큐먼트 사양)
- **API Endpoint**: https://api.upstage.ai/v1/chat/completions (또는 OpenAI SDK baseURL: https://api.upstage.ai/v1)
- **인증 헤더**: Authorization: Bearer "여기에_API_키를_넣으세요"
- **모델 및 사양**: model: "solar-pro3", reasoning_effort: "medium"
- **추론 및 답변 처리**: message.reasoning (생각 과정) 확인 및 message.content (최종 답변) 추출
- **챗봇 페르소나**: ${persona}
- **대화 순서/단계**: ${flow}
- **대화 조건/어포던스**: ${rules}

### 5.2 프론트엔드 지침 (Index.html)
- 카카오톡 스타일 모던 채팅 UI 및 반응형 레이아웃

### 5.3 백엔드 지침 (Code.gs)
- UrlFetchApp.fetch()를 사용하는 앱스스크립트 표준 코드

### 5.4 구글 시트 데이터베이스 구성 지침
- 시트 첫 행에 컬럼명이 없으면 ['대화일시', '사용자 메시지', '챗봇 응답', '페르소나/조건'] 헤더 행이 '짝!' 하고 자동 생성되는 setupDatabase() 함수 포함`;

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
