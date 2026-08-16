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
      case 'tip':       return renderTipCard(section);
      case 'warning':   return renderTipCard(section);
      case 'checklist': return renderChecklist(section);
      case 'quiz':      return renderQuizCard(section);
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

  const initAllInteractions = () => {
    document.querySelectorAll('.checklist[data-session-wrapper]').forEach(el => {
      initChecklist(el.dataset.sessionWrapper);
    });
    initQuiz();
    initCodeCopy();
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
