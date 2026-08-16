/**
 * app.js — SPA 라우팅, 사이드바, 진행률 관리
 * 바이브코딩 LXP
 */

(function () {
  'use strict';

  let currentSessionIndex = -1; // -1 = 홈

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     초기화
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    initMobile();
    updateProgress();
    handleRoute();

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('keydown', handleKeyNav);
    window.addEventListener('checklist-updated', updateProgress);
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     라우터
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function handleRoute() {
    const hash = location.hash.replace('#', '') || 'home';
    const content = document.getElementById('content');
    if (!content) return;

    // 페이드 아웃
    content.classList.remove('fade-in');

    requestAnimationFrame(() => {
      if (hash === 'home') {
        currentSessionIndex = -1;
        renderHomePage();
      } else {
        const sessions = window.SESSIONS || [];
        const idx = sessions.findIndex(s => s.id === hash);
        if (idx !== -1) {
          currentSessionIndex = idx;
          renderSessionView(sessions[idx], idx, sessions.length);
        } else {
          currentSessionIndex = -1;
          renderHomePage();
        }
      }

      highlightSidebar();
      updateProgress();
      content.classList.add('fade-in');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     홈 페이지
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function renderHomePage() {
    const content = document.getElementById('content');
    const home = window.HOME_DATA || {};
    const sessions = window.SESSIONS || [];
    const prog = calcProgress();

    const cards = sessions.map(s => {
      const info = home.sessions
        ? home.sessions.find(h => h.number === s.number)
        : null;
      const icon = info ? info.icon : '📝';
      const tool = info ? info.tool : '';
      return `
        <a href="#${s.id}" class="home-card">
          <div class="home-card-icon">${icon}</div>
          <div class="home-card-body">
            <span class="home-card-number">${s.number}차시</span>
            <h3 class="home-card-title">${esc(s.title)}</h3>
            <span class="home-card-tool">${esc(tool)}</span>
          </div>
        </a>`;
    }).join('');

    content.innerHTML = `
      <div class="home-hero">
        <h1 class="home-hero-title">${(home.title || '').replace(/\n/g, '<br>')}</h1>
        <p class="home-hero-subtitle">${esc(home.subtitle || '')}</p>
        <p class="home-hero-desc">${esc(home.description || '')}</p>

        <div class="home-progress-box">
          <div class="home-progress-label">
            <span>전체 진행률</span>
            <strong>${prog.completed} / ${prog.total} 완료 (${prog.pct}%)</strong>
          </div>
          <div class="home-progress-track">
            <div class="home-progress-fill" style="width:${prog.pct}%"></div>
          </div>
        </div>

        <a href="#${sessions.length ? sessions[0].id : 'home'}" class="home-start-btn">
          🚀 학습 시작하기
        </a>
      </div>

      <h2 class="home-section-title">📚 차시별 학습 내용</h2>
      <div class="home-grid">${cards}</div>
    `;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     세션 페이지
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function renderSessionView(session, idx, total) {
    const content = document.getElementById('content');
    const C = window.Components;
    if (!C) { content.innerHTML = '<p>컴포넌트 로딩 오류</p>'; return; }

    let html = C.renderSessionPage(session);

    // 이전 / 다음 네비게이션
    const sessions = window.SESSIONS;
    const prev = idx > 0 ? sessions[idx - 1] : null;
    const next = idx < total - 1 ? sessions[idx + 1] : null;

    html += `<div class="nav-footer">`;
    html += prev
      ? `<a href="#${prev.id}" class="nav-btn nav-btn-prev">← ${prev.number}차시: ${esc(prev.title)}</a>`
      : `<span></span>`;
    html += next
      ? `<a href="#${next.id}" class="nav-btn nav-btn-next">${next.number}차시: ${esc(next.title)} →</a>`
      : `<a href="#home" class="nav-btn nav-btn-next">🏠 홈으로 돌아가기</a>`;
    html += `</div>`;

    content.innerHTML = html;
    C.initAllInteractions();
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     사이드바
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function buildSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    const sessions = window.SESSIONS || [];

    let html = `
      <li>
        <a href="#home" class="sidebar-item" data-page="home">
          <span class="session-number" style="font-size:0.9rem;">🏠</span>
          <span>홈</span>
        </a>
      </li>`;

    sessions.forEach(s => {
      html += `
        <li>
          <a href="#${s.id}" class="sidebar-item" data-page="${s.id}">
            <span class="session-number">${s.number}</span>
            <span>${esc(s.title)}</span>
          </a>
        </li>`;
    });

    nav.innerHTML = html;

    // 모바일: 링크 클릭 시 사이드바 닫기
    nav.addEventListener('click', (e) => {
      if (e.target.closest('.sidebar-item') && window.innerWidth < 768) {
        closeSidebar();
      }
    });
  }

  function highlightSidebar() {
    const hash = location.hash.replace('#', '') || 'home';
    document.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === hash);
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     모바일 토글
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initMobile() {
    const btn = document.querySelector('.mobile-menu-toggle');
    const overlay = document.getElementById('overlay');

    if (btn) btn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSidebar();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeSidebar();
    });
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (!sidebar) return;
    const open = sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active', open);
  }

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     진행률 계산
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function calcProgress() {
    const sessions = window.SESSIONS || [];
    let total = 0, completed = 0;

    sessions.forEach(s => {
      (s.sections || []).forEach(sec => {
        if (sec.type === 'checklist' && sec.items) {
          total += sec.items.length;
          const key = `vibe-checklist-${sec.sessionId || s.id}`;
          try {
            const saved = JSON.parse(localStorage.getItem(key) || '{}');
            completed += Object.values(saved).filter(Boolean).length;
          } catch { /* ignore */ }
        }
      });
    });

    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, pct };
  }

  function updateProgress() {
    const p = calcProgress();
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (fill) fill.style.width = p.pct + '%';
    if (text) text.textContent = `${p.completed} / ${p.total}`;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     키보드 네비게이션
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function handleKeyNav(e) {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (currentSessionIndex < 0) return;

    const sessions = window.SESSIONS || [];
    if (e.key === 'ArrowLeft' && currentSessionIndex > 0) {
      location.hash = '#' + sessions[currentSessionIndex - 1].id;
    } else if (e.key === 'ArrowRight' && currentSessionIndex < sessions.length - 1) {
      location.hash = '#' + sessions[currentSessionIndex + 1].id;
    }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     유틸
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function esc(str) {
    if (typeof str !== 'string') return str || '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
