window.SESSIONS = [
  {
    id: 'session-1',
    number: 1,
    title: '바이브코딩의 기초 원리 이해',
    subtitle: '제미나이 캔버스로 웹앱 만들기 기초',
    duration: '50분',
    objectives: ['프론트엔드/백엔드 개념 이해', '바이브코딩 개념 이해', '제미나이 캔버스로 간단한 웹앱 만들기'],
    sections: [
      { type: 'concept', icon: '💡', title: '바이브코딩이란?', body: 'AI에게 대화로 코드를 주문하는 것을 말합니다. 코딩 지식이 전혀 없어도, 우리가 일상적으로 쓰는 자연어로 원하는 프로그램을 만들어낼 수 있는 새롭고 혁신적인 개발 방식입니다. 선생님의 아이디어가 곧바로 프로그램이 됩니다!' },
      { type: 'concept', icon: '🏛️', title: '웹 서비스의 3대 요소: 프론트엔드 + 백엔드 + 데이터베이스(DB)', body: `
        맞습니다! 웹 서비스가 제대로 작동하려면 <b>프론트엔드, 백엔드, 그리고 데이터베이스(DB)</b> 3가지가 모두 필요합니다.<br>
        선생님들께서 이해하기 가장 쉬운 <b>'식당 구조'</b>로 비교해 볼까요?<br><br>
        
        <div style="background:var(--code-bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px;margin:16px 0;">
          <div style="text-align:center;font-weight:700;font-size:1.05rem;color:var(--primary);margin-bottom:16px;">
            🍱 [식당 비유로 보는 웹 서비스 구조도]
          </div>
          
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;text-align:center;">
            <!-- 프론트엔드 -->
            <div style="background:white;padding:16px;border-radius:var(--radius-sm);box-shadow:var(--shadow-sm);border-top:4px solid #0D7377;">
              <div style="font-size:2rem;margin-bottom:8px;">🍽️</div>
              <div style="font-weight:700;font-size:1rem;color:var(--text);margin-bottom:4px;">1. 프론트엔드 (Frontend)</div>
              <div style="font-size:0.85rem;color:var(--primary);font-weight:600;margin-bottom:8px;">"식당의 홀 & 인테리어"</div>
              <div style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;text-align:left;">
                • 사용자가 눈으로 보는 화면<br>
                • <b>HTML</b>: 메뉴판 (기본 구조)<br>
                • <b>CSS</b>: 식당 인테리어 (디자인)<br>
                • <b>JS</b>: 서빙 로봇 (버튼 클릭 동작)
              </div>
            </div>

            <!-- 백엔드 -->
            <div style="background:white;padding:16px;border-radius:var(--radius-sm);box-shadow:var(--shadow-sm);border-top:4px solid #3B82F6;">
              <div style="font-size:2rem;margin-bottom:8px;">👨‍🍳</div>
              <div style="font-weight:700;font-size:1rem;color:var(--text);margin-bottom:4px;">2. 백엔드 (Backend)</div>
              <div style="font-size:0.85rem;color:#2563EB;font-weight:600;margin-bottom:8px;">"식당의 주방 (로직)"</div>
              <div style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;text-align:left;">
                • 보이지 않는 곳에서 계산/처리<br>
                • 주문을 받아서 요리 조리<br>
                • 암호 처리, 점수 계산, AI 연결<br>
                • (3~4차시: 앱스스크립트로 맛보기)
              </div>
            </div>

            <!-- 데이터베이스 -->
            <div style="background:white;padding:16px;border-radius:var(--radius-sm);box-shadow:var(--shadow-sm);border-top:4px solid #8B5CF6;">
              <div style="font-size:2rem;margin-bottom:8px;">🗄️</div>
              <div style="font-weight:700;font-size:1rem;color:var(--text);margin-bottom:4px;">3. 데이터베이스 (DB)</div>
              <div style="font-size:0.85rem;color:#7C3AED;font-weight:600;margin-bottom:8px;">"주방의 대형 냉장고/창고"</div>
              <div style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;text-align:left;">
                • 영구적으로 저장하는 창고<br>
                • 학생 성적, 로그인 아이디/비번<br>
                • 웹페이지를 닫아도 데이터가 유지됨<br>
                • <b>(구글 시트 = 선생님들의 무료 DB!)</b>
              </div>
            </div>
          </div>

          <!-- 흐름 설명 -->
          <div style="margin-top:16px;background:white;padding:14px;border-radius:var(--radius-sm);font-size:0.9rem;line-height:1.6;color:var(--text);">
            🔄 <b>실제 작동 흐름:</b> <br>
            손님이 화면에서 버튼 클릭(프론트엔드) ➔ 주방에서 주문 처리(백엔드) ➔ 창고에서 재료 꺼내기/저장(DB) ➔ 완성된 요리를 화면에 보여줌!
          </div>
        </div>

        💡 <b>선생님을 위한 꿀팁:</b> 전문 개발자들은 복잡한 DB(MySQL, PostgreSQL 등)를 쓰지만, 교사 바이브코딩에서는 <b>'구글 시트'</b>가 가장 훌륭하고 쉬운 <b>데이터베이스(DB)</b> 역할을 해줍니다! 3~4차시에서 구글 시트를 DB처럼 활용하는 법을 배웁니다.
      ` },
      { type: 'concept', icon: '✨', title: '제미나이 캔버스란?', body: '구글이 만든 강력한 AI 코딩 도구입니다. 대화창에 원하는 것을 말하면 AI가 알아서 코드를 작성해주고, 화면 한쪽에 결과물을 실시간으로 미리 보여줍니다. 코드를 몰라도 눈으로 확인하며 뚝딱뚝딱 웹페이지를 수정할 수 있어요.' },
      { type: 'concept', icon: '🌟', title: '강사 추천! 제미나이 캔버스 실습 예시 모음 (2×2)', body: '실습을 시작하기 전, 제미나이 캔버스로 작성된 실제 웹앱 예시들을 직접 체험해보세요. 코딩 없이 대화만으로 이런 멋진 학습용 도구들이 완성됩니다!' },
      { type: 'linkGrid', cols: 2, links: [
          { title: '예시 1: 기후분류 탐험지도 🌍', description: '기후대별 특징을 시각적으로 탐험하는 인터랙티브 지도 웹앱', url: 'https://gemini.google.com/share/af2377c2089b', icon: '🗺️' },
          { title: '예시 2: 보완대체의사소통(AAC) 도구 🗣️', description: '그림 상징을 눌러 의사를 표현하는 보완대체의사소통 웹앱', url: 'https://gemini.google.com/share/d4b5b9ec839c', icon: '💬' },
          { title: '예시 3: 수도 이름 맞히는 슈퍼마리오 게임 🎮', description: '게임 요소와 퀴즈를 결합한 수도 맞히기 퀴즈 게임', url: 'https://gemini.google.com/share/801a43d57c3c', icon: '🍄' },
          { title: '예시 4: 공정무역 설득 챌린지 챗봇 🤝', description: '상황별 설득 시뮬레이션을 해볼 수 있는 인공지능 챗봇 웹앱', url: 'https://gemini.google.com/share/eeaad1cdf8e1', icon: '🤖' }
        ]
      },
      { type: 'divider' },
      { type: 'link', title: '제미나이 캔버스 접속하기 (gemini.google.com)', description: '구글 계정으로 로그인 후 대화창에서 \'캔버스\' 모드를 실행해보세요.', url: 'https://gemini.google.com', icon: '🚀' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: 'gemini.google.com 접속 후 대화창에서 \'캔버스\' 모드를 선택합니다.' },
          { title: 'Step 2', description: '아래 \'교육용 프롬프트 제작소\'에서 원하는 조건을 입력하고 프롬프트를 생성합니다.' },
          { title: 'Step 3', description: '복사한 프롬프트를 제미나이 대화창에 붙여넣고 엔터를 누릅니다.' },
          { title: 'Step 4', description: '생성된 웹앱 미리보기를 확인하고, "배경색 바꿔줘", "버튼 크게 해줘" 등 자유롭게 추가 대화로 수정합니다.' }
        ]
      },
      { type: 'promptGenerator', title: '🛠️ 1차시 실습: 교육용 웹앱 프롬프트 제작소', description: '대상, 사용목적, 웹앱 제목, 필요한 기능을 적으면 제미나이 캔버스용 맞춤 프롬프트가 완성됩니다!' },
      { type: 'tip', variant: 'tip', content: '프롬프트 팁 — 구체적으로 말할수록 좋은 결과가 나옵니다! "웹페이지 만들어줘"보다 "학생 이름, 점수를 입력하면 자동으로 평균을 계산해주는 성적 관리 페이지를 만들어줘"가 훨씬 좋습니다.' },
      { type: 'tip', variant: 'warning', content: '🚨 <b>1차시 핵심 정리 & 한계:</b> 제미나이 캔버스는 대화만으로 예쁜 <b>프론트엔드(화면 UI)</b>를 즉시 만들어내지만, 보이지 않는 곳에서 데이터를 처리하고 저장하는 <b>백엔드(Backend) 및 데이터베이스 기능은 전혀 지원되지 않습니다.</b> 창을 닫으면 입력했던 정보가 모두 사라지니, 완성된 코드(HTML/CSS/JS)는 반드시 복사해두세요!' },
      { type: 'checklist', sessionId: 'session-1', items: [
          { id: 's1-c1', label: '강사 추천 예시 웹앱 4종 둘러보기' },
          { id: 's1-c2', label: '제미나이 캔버스 접속 완료' },
          { id: 's1-c3', label: '프롬프트 제작소에서 맞춤 프롬프트 생성 및 복사' },
          { id: 's1-c4', label: '제미나이 캔버스에 프롬프트 입력 후 웹앱 생성' },
          { id: 's1-c5', label: '제미나이 캔버스의 백엔드 한계점 이해하기' }
        ]
      }
    ]
  },
  {
    id: 'session-2',
    number: 2,
    title: '캔바 AI로 경험해보는 바이브코딩',
    subtitle: '백엔드 데이터 구조 설계와 캔바 AI 바이브코딩',
    duration: '50분',
    objectives: ['캔바 AI(canva.com/ai) 사용법 익히기', '제미나이 캔버스와 캔바 AI의 차이점 이해하기', '백엔드 데이터 구조(Data Structure)를 포함한 바이브코딩 실습', '캔바 AI의 한계점과 앱스스크립트 필요성 이해하기'],
    sections: [
      { type: 'concept', icon: '🎨', title: '캔바 AI란? (아주 간단한 접속법!)', body: '복잡할 것 전혀 없습니다! 캔바 계정으로 로그인한 뒤, <a href="https://www.canva.com/ai" target="_blank" style="color:var(--primary);font-weight:700;">canva.com/ai</a>에 접속해서 원하는 대화(프롬프트)만 입력하면 AI가 알아서 사이트와 인터랙티브 콘텐츠를 만들어줍니다!' },
      { type: 'concept', icon: '⚙️', title: '제미나이 캔버스 vs 캔바 AI: 무엇이 다른가요?', body: `
        1차시에서 배운 <b>제미나이 캔버스</b>는 오직 <b>프론트엔드(화면 UI)만</b> 만들어주었습니다.<br>
        반면 <b>캔바 AI</b>는 단순한 화면 생성을 넘어서 <b>백엔드 데이터 구조(입력 폼, 목록 저장, 단순 점수 합산 구조)까지 부분적으로 지원</b>합니다!<br>
        선생님께서 프롬프트 작성 시 <i>"어떤 데이터를 저장하고 수집할 것인지"</i> <b>백엔드 데이터 항목</b>을 함께 주문해 주는 것이 2차시 바이브코딩의 핵심입니다.
      ` },
      { type: 'concept', icon: '🌟', title: '강사 추천 캔바 AI 실습 예시 3종 (3×1 그리드)', body: '백엔드 데이터 구조가 부분적으로 녹아든 캔바 AI 웹사이트 실습 예시입니다. 직접 접속해서 입력해 보세요!' },
      { type: 'linkGrid', cols: 3, links: [
          { title: '예시 1: 우리반 상벌점 관리 시스템 🏆', description: '학생별 상점/벌점 데이터 항목을 입력하고 조회하는 캔바 웹사이트', url: 'https://pbjgdeal.my.canva.site/meritpunish', icon: '📋' },
          { title: '예시 2: 오늘 나의 TO-DO list 관리 📝', description: '할일 내용, 마감일, 완료 여부 데이터 구조가 설계된 할일 관리 웹사이트', url: 'https://pbjgdeal.my.canva.site/todolist', icon: '✅' },
          { title: '예시 3: 우리 반 재활용 업사이클링 대시보드 ♻️', description: '재활용 품목 및 실천 점수를 기록하고 공유하는 학급 업사이클링 대시보드', url: 'https://pbjgdeal.my.canva.site/upcycle', icon: '🌱' }
        ]
      },
      { type: 'divider' },
      { type: 'link', title: '캔바 AI 대화창 바로가기 (canva.com/ai)', description: '로그인 후 프롬프트만 입력하면 바이브코딩 준비 끝!', url: 'https://www.canva.com/ai', icon: '🚀' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: 'canva.com 로그인 후 canva.com/ai 로 접속합니다.' },
          { title: 'Step 2', description: '아래 캔바 AI 전용 프롬프트 제작소에서 화면 기능뿐 아니라 \'저장할 백엔드 데이터 구조\' 항목까지 작성합니다.' },
          { title: 'Step 3', description: '생성된 프롬프트를 복사하여 canva.com/ai 대화창에 입력하고 결과를 확인합니다.' }
        ]
      },
      { type: 'promptGenerator', mode: 'canva', title: '🛠️ 2차시 실습: 캔바 AI 전용 백엔드 프롬프트 제작소', description: '1차시와 달리 화면 기능 외에 \'저장할 데이터 항목(백엔드 데이터 구조)\'까지 함께 설계하여 캔바 AI에 주문합니다!' },
      { type: 'tip', variant: 'warning', content: '🚨 <b>캔바 AI의 한계점 & 다음 시간 예고:</b><br>캔바 AI가 데이터 구조를 받아주긴 하지만, <b>구체적인 고난도 백엔드 로직 처리나 AI 기반 실시간 자동 산출(자동 채점, AI 피드백 연동 등)은 불가능합니다.</b><br>이러한 한계를 완벽하게 해결하기 위해! 다음 3차시에서는 구글 시트와 코드를 직접 연동하는 <b>"앱스스크립트(Google Apps Script)"</b>를 배워볼 예정입니다!' },
      { type: 'checklist', sessionId: 'session-2', items: [
          { id: 's2-c1', label: '캔바 추천 예시 3종(상벌점, TO-DO, 업사이클링) 체험' },
          { id: 's2-c2', label: 'canva.com/ai 접속 완료' },
          { id: 's2-c3', label: '백엔드 데이터 구조 항목을 포함하여 맞춤 프롬프트 생성' },
          { id: 's2-c4', label: '캔바 AI에 프롬프트 입력 및 생성 확인' },
          { id: 's2-c5', label: '캔바 AI 한계 이해 및 3차시 앱스스크립트 연계 확인' }
        ]
      }
    ]
  },
  {
    id: 'session-3',
    number: 3,
    title: '앱스스크립트 기초: 템플릿 실습 및 코드 구조 분석',
    subtitle: '완성된 앱스스크립트 예제 템플릿 4종 코드 뜯어보기',
    duration: '50분',
    objectives: ['앱스스크립트의 백엔드 작동 원리 이해하기', '구글 시트 사본 복사 후 Apps Script 편집기 열어보기', '완성된 교육용 웹앱 4종의 코드 구조 뜯어보기'],
    sections: [
      { type: 'concept', icon: '📜', title: '앱스스크립트(Google Apps Script)란?', body: '구글 시트를 강력한 <b>데이터베이스(DB)</b>로 만들어주고, 구글 드라이브·폼과 연동하여 진정한 <b>백엔드 로직(자동 저장, 파일 업로드, 점수 집계)</b>을 수행할 수 있게 해주는 구글의 백엔드 엔진입니다.' },
      { type: 'concept', icon: '🔍', title: '본격적인 바이브코딩 전, 예제 코드 뜯어보기!', body: '스스로 코드를 주문하기 전! 이미 완성된 <b>4가지 완성형 교육용 웹앱의 구글 시트 사본</b>을 복사해보고, <code>확장 프로그램 → Apps Script</code> 메뉴를 열어 코드가 어떻게 시트(DB)와 연결되어 작동하는지 직접 뜯어봅시다.' },
      { type: 'concept', icon: '🌟', title: '앱스스크립트 템플릿 예제 4종 (구글시트 사본 + 웹앱)', body: '아래 4가지 예제에서 <b>[구글시트 사본 만들기]</b>를 클릭해 내 구글 드라이브로 복사한 뒤, 시트의 <code>확장 프로그램 → Apps Script</code>를 열어 코드를 확인해 보세요!' },
      { type: 'linkGrid', cols: 2, links: [
          { title: '1. 분리배출 챌린지 웹앱 ♻️', description: '학반별 재활용 기록 누적 ➔ 포인트/학교 쓰레기 통계/뱃지 자동 부여<br><br><a href="https://docs.google.com/spreadsheets/d/17UfYys852t6LKmB2KZWUsF1cm7IKwW2px0J8Or6gkXc/copy" target="_blank" style="color:#0D7377;font-weight:700;">📄 [구글시트 사본 복사하기]</a><br><a href="https://script.google.com/macros/s/AKfycbwQdTFo1MptLvvlaREDPaRC1WzNglQA-kMS8XN15VhAETOLxAUH9zNwwKvUFglhench/exec" target="_blank" style="color:#2563EB;font-weight:700;">🚀 [웹앱 실행화면 체험하기]</a>', url: 'https://docs.google.com/spreadsheets/d/17UfYys852t6LKmB2KZWUsF1cm7IKwW2px0J8Or6gkXc/copy', icon: '♻️' },
          { title: '2. 인터랙티브 보드게임 웹앱 🎲', description: 'Quiz 탭(퀴즈) + BoardConfig 탭(칸 설정) ➔ 실시간 보드게임 구동<br><br><a href="https://docs.google.com/spreadsheets/d/1_EjAtMnMJK9j8t7FDO59fAMXYhxTnO9YffRJiQrUY1A/copy" target="_blank" style="color:#0D7377;font-weight:700;">📄 [구글시트 사본 복사하기]</a><br><a href="https://script.google.com/a/macros/gdeal.io/s/AKfycbzgtBHpl9dpapjw6yzreIC3SzwlsKXlrpCkkQehNJAWe_NYqgIdT1QkAYktTxAEnKoU/exec" target="_blank" style="color:#2563EB;font-weight:700;">🚀 [웹앱 실행화면 체험하기]</a>', url: 'https://docs.google.com/spreadsheets/d/1_EjAtMnMJK9j8t7FDO59fAMXYhxTnO9YffRJiQrUY1A/copy', icon: '🎲' },
          { title: '3. 연수 이수증 제출 도구 📑', description: '구글드라이브 연동 ➔ 이수증 제출(교사이름 자동 저장) & 실시간 명단 확인<br><br><a href="https://docs.google.com/spreadsheets/d/1BFS-il1rfTyX2Lk7B7tuefCefPi0H-cspsGryoapEZk/copy" target="_blank" style="color:#0D7377;font-weight:700;">📄 [구글시트 사본 복사하기]</a><br><a href="https://script.google.com/a/macros/cwyeo-h.gne.go.kr/s/AKfycbxz8dCITEq4_bhA_fBeeX_aM7xQe8hBe6Ci8wT5oiJc-LhhS6sGZekkL6XX_uiaoB1y/exec" target="_blank" style="color:#2563EB;font-weight:700;">🚀 [웹앱 실행화면 체험하기]</a>', url: 'https://docs.google.com/spreadsheets/d/1BFS-il1rfTyX2Lk7B7tuefCefPi0H-cspsGryoapEZk/copy', icon: '📑' },
          { title: '4. 영단어 학습/테스트기 🔤', description: '시트 단어 데이터 연동 ➔ 단어 테스트, 틀린 오답 Top 50 및 재시험 제공<br><br><a href="https://docs.google.com/spreadsheets/d/1M4yWlXdyA91qEA3fR1CBICvns0cVjMiga1VfUw1XI9w/copy" target="_blank" style="color:#0D7377;font-weight:700;">📄 [구글시트 사본 복사하기]</a><br><a href="https://script.google.com/macros/s/AKfycbxrXww_9P7HLNfFvSWOMHHK-nFapy7IkND3huJtW8UE_TulFBbZmhVGB70Vb_uhT8c/exec" target="_blank" style="color:#2563EB;font-weight:700;">🚀 [웹앱 실행화면 체험하기]</a>', url: 'https://docs.google.com/spreadsheets/d/1M4yWlXdyA91qEA3fR1CBICvns0cVjMiga1VfUw1XI9w/copy', icon: '🔤' }
        ]
      },
      { type: 'divider' },
      { type: 'concept', icon: '🚀', title: '구글 시트 앱스스크립트(Apps Script) 웹앱 배포 방법 (상세 가이드)', body: `
        구글 시트 사본을 내 드라이브로 복사한 뒤, 이 스크립트를 실제로 작동하는 웹사이트(웹앱)로 배포하는 전체 순서입니다. 그대로 따라해 보세요!
      ` },
      { type: 'steps', steps: [
          { title: 'Step 1: 앱스스크립트 편집기 열기', description: '복사한 구글 시트 상단 메뉴에서 [확장 프로그램] ➔ [Apps Script]를 클릭합니다.' },
          { title: 'Step 2: 배포 메뉴 진입', description: '열린 코드 편집기 우측 상단의 파란색 [배포] 버튼을 누른 뒤 [새 배포]를 클릭합니다.' },
          { title: 'Step 3: 웹앱 유형 선택', description: '왼쪽 톱니바퀴(유형 선택) 아이콘을 눌러 [웹 앱]을 선택합니다.' },
          { title: 'Step 4: 실행 및 액세스 권한 설정', description: '• 다음 사용자 인증 정보로 실행: <b>나 (My Account)</b> 선택<br>• 액세스 권한 있는 사용자: <b>모든 사용자 (Anyone)</b> 선택 후 [배포] 버튼 클릭' },
          { title: 'Step 5: 액세스 승인 및 팝업 대처', description: '• [액세스 승인] 클릭 ➔ 구글 계정 선택 팝업창이 뜨면 한 번 더 로그인합니다.<br>• <i>"Google에서 이 앱을 검증하지 않았습니다"</i> 경고창이 뜨면 당황하지 마시고 하단의 <b>[고급]</b> ➔ <b>[안전하지 않은 페이지로 이동]</b> ➔ <b>[허용]</b>을 순서대로 클릭합니다.' },
          { title: 'Step 6: 웹앱 URL 복사', description: '배포가 완료되면 생성된 <b>웹앱 URL</b>(<code>https://script.google.com/macros/s/.../exec</code>)을 복사하여 새 탭에서 열어봅니다!' }
        ]
      },
      { type: 'tip', variant: 'warning', content: '⚠️ <b>배포 관련 핵심 팁:</b><br>• <b>액세스 권한:</b> 반드시 "모든 사용자(Anyone)"로 지정해야 학생이나 타 교사가 로그인 없이 접속할 수 있습니다.<br>• <b>코드 수정 후 재배포:</b> 코드를 새로 고친 후에는 반드시 <code>배포 ➔ 새 배포</code>를 통해 새로운 버전으로 배포해야 웹앱에 변경사항이 즉시 적용됩니다!' },
      { type: 'checklist', sessionId: 'session-3', items: [
          { id: 's3-c1', label: '예제 템플릿 4종 웹앱 체험 및 동작 확인' },
          { id: 's3-c2', label: '최소 1개 이상 구글 시트 사본 복사 완료' },
          { id: 's3-c3', label: '확장 프로그램 ➔ Apps Script 편집기 열기' },
          { id: 's3-c4', label: 'Code.gs 파일과 Index.html 파일 구조 뜯어보기' },
          { id: 's3-c5', label: '상세 가이드에 따라 웹앱 새 배포 실행 및 URL 접속 성공' }
        ]
      }
    ]
  },
  {
    id: 'session-4',
    number: 4,
    title: '앱스스크립트 심화',
    subtitle: '챗봇으로 앱스스크립트 프롬프트 만들어보기',
    duration: '50분',
    objectives: ['Gems 챗봇 활용법 익히기', '프롬프트 엔지니어링 기초 이해', '챗봇 대화로 앱스스크립트 코드 생성하기'],
    sections: [
      { type: 'concept', icon: '🗣️', title: '프롬프트 엔지니어링이란?', body: 'AI에게서 우리가 딱 원하는 결과를 얻어내기 위해, 질문이나 지시사항을 잘 구성하고 다듬는 기술입니다. 똑똑한 AI라도 어떻게 질문하느냐(프롬프트)에 따라 완전히 다른 결과물을 내놓는답니다.' },
      { type: 'concept', icon: '🤖', title: 'Gems 챗봇', body: '일반 AI보다 특정 작업에 특화된 전문가 AI입니다. 이 과정에서 제공하는 Gems 챗봇은 앱스스크립트 작성의 전문가입니다. 선생님이 원하시는 기능을 말로만 설명하면, 바로 붙여넣기 할 수 있는 완벽한 코드를 짜줍니다.' },
      { type: 'link', title: 'Gems 챗봇 접속', description: '앱스스크립트 전용 AI 챗봇 - 클릭하면 바로 대화 시작', url: 'https://gemini.google.com/gem/13holjQ_PRtsGjldPydMg4LiU34JEx5Ih?usp=sharing' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: '위의 링크를 클릭하여 교육용 Gems 챗봇에 접속합니다.' },
          { title: 'Step 2', description: '필요한 기능 설명하기. 예: "구글 시트 A열에 학생 이름, B열에 점수가 있을 때, 80점 이상인 학생에게 자동으로 \'우수\' 표시를 C열에 넣어주는 스크립트 만들어줘"' },
          { title: 'Step 3', description: '챗봇이 작성해준 코드를 복사해서 내 구글 시트의 앱스스크립트 편집기에 붙여넣습니다.' },
          { title: 'Step 4', description: '코드를 실행해보고 구글 시트에서 결과가 맞게 나왔는지 확인합니다.' },
          { title: 'Step 5', description: '원하는 대로 작동하지 않거나 추가 기능이 필요하면 챗봇에게 다시 수정 요청을 합니다.' }
        ]
      },
      { type: 'tip', variant: 'tip', content: '좋은 프롬프트의 3요소! ① 현재 상황 설명 ② 원하는 결과 설명 ③ 구체적 조건 명시. 예시: "A열에 날짜가 있고(상황), 오늘 날짜와 같은 행을 노란색으로(결과), 자동으로 색칠해줘(조건)"' },
      { type: 'checklist', sessionId: 'session-4', items: [
          { id: 's4-c1', label: 'Gems 챗봇 접속 성공' },
          { id: 's4-c2', label: '프롬프트 작성 후 코드 생성 1회' },
          { id: 's4-c3', label: '생성된 코드 앱스스크립트에 붙여넣기' },
          { id: 's4-c4', label: '코드 실행 및 결과 확인' },
          { id: 's4-c5', label: '수정 요청 1회 이상 시도' }
        ]
      }
    ]
  },
  {
    id: 'session-5',
    number: 5,
    title: '인공지능 API를 붙인 솔루션 만들어보기',
    subtitle: '업스테이지 API 시작하기',
    duration: '50분',
    objectives: ['API 개념 이해하기', '업스테이지 AI 이니셔티브 가입', 'API 키 발급받기'],
    sections: [
      { type: 'concept', icon: '🔌', title: 'API란?', body: '택배 서비스로 비유해볼까요? 우리가 물건(데이터/요청)을 보내면, 배송센터(AI 서버)가 복잡한 처리를 대신 해주고 결과물만 우리 집으로 쏙 보내주는 시스템입니다. 덕분에 코드 한 줄만으로 강력한 AI의 능력을 내 프로그램에 얹어 쓸 수 있어요.' },
      { type: 'concept', icon: '🚀', title: '업스테이지란?', body: '세계적인 기술력을 인정받는 한국의 대표적인 AI 스타트업입니다. 학생들의 손글씨를 읽어내는 문서 이해(Document AI), 번역, 텍스트 분석 등 교육 현장에서 유용하게 쓰일 수 있는 다양한 AI 기능을 API 형태로 제공하고 있습니다.' },
      { type: 'concept', icon: '🎁', title: 'AI 이니셔티브', body: '선생님들의 교육 혁신과 연구를 지원하기 위해, 업스테이지에서 교육 목적으로 API를 무료로 사용할 수 있게 혜택을 제공하는 뜻깊은 프로그램입니다.' },
      { type: 'link', title: '업스테이지 API 문서', description: 'API 사용법이 정리된 공식 문서', url: 'https://console.upstage.ai/docs/getting-started' },
      { type: 'link', title: 'AI 이니셔티브 신청', description: '교육용 API 무료 사용 신청 페이지', url: 'https://www.upstage.ai/ko/events/ai-initiative-2026-ko' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: '업스테이지 콘솔 홈페이지에 접속하여 회원가입을 진행합니다.' },
          { title: 'Step 2', description: 'AI 이니셔티브 안내 페이지로 이동하여 교육용 무료 사용 혜택을 신청합니다.' },
          { title: 'Step 3', description: '콘솔 화면에서 \'API 키(Key)\'를 발급받습니다.' },
          { title: 'Step 4', description: '발급받은 복잡한 문자열(API 키)을 안전한 메모장 등에 복사해둡니다.' }
        ]
      },
      { type: 'tip', variant: 'warning', content: 'API 키는 내 통장의 비밀번호와 같습니다! 절대 다른 사람에게 알려주거나 인터넷 공개된 곳에 올리면 안 됩니다. 누군가 내 키를 도용해서 요금이 발생할 수 있어요.' },
      { type: 'tip', variant: 'tip', content: '방금 발급받은 API 키를 내 컴퓨터의 메모장에 안전하게 저장해두세요. 다음 6차시 실습에서 바로 사용할 예정입니다.' },
      { type: 'checklist', sessionId: 'session-5', items: [
          { id: 's5-c1', label: 'API 개념 이해하기' },
          { id: 's5-c2', label: '업스테이지 콘솔 회원가입 완료' },
          { id: 's5-c3', label: 'AI 이니셔티브 신청 완료' },
          { id: 's5-c4', label: 'API 키 발급 및 안전하게 저장하기' }
        ]
      }
    ]
  },
  {
    id: 'session-6',
    number: 6,
    title: 'API 도큐먼트를 활용해서 바이브코딩으로 인공지능 기반 솔루션 주문해보기',
    subtitle: 'AI API 연동 실습',
    duration: '50분',
    objectives: ['API 도큐먼트 읽는 법 배우기', '바이브코딩으로 API 연동 앱 만들기', 'AI 기반 솔루션 직접 만들어보기'],
    sections: [
      { type: 'concept', icon: '📖', title: 'API 도큐먼트 읽기', body: '새로운 전자제품을 사면 들어있는 \'사용 설명서\'와 같습니다. ① 어떤 인터넷 주소로 ② 어떤 형태의 데이터를 보내면 ③ 어떤 결과값을 돌려주는지 아주 상세히 적혀있습니다.' },
      { type: 'concept', icon: '🤝', title: '바이브코딩 + API = 무한한 가능성', body: 'API 도큐먼트를 우리가 직접 다 이해할 필요는 없습니다. AI 챗봇에게 "이 사용 설명서(API)를 참고해서 이런 기능을 하는 프로그램을 만들어줘"라고 주문하기만 하면, 어려운 연동 코드까지 알아서 척척 짜줍니다.' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: '업스테이지 API 도큐먼트에서 내가 사용해보고 싶은 흥미로운 기능을 하나 고릅니다.' },
          { title: 'Step 2', description: '제미나이나 Gems 챗봇에게 주문합니다. 예: "업스테이지 Document AI API를 사용해서 학생이 제출한 독후감 사진을 텍스트로 변환하고, 글자 수를 세어주는 구글 시트 앱스스크립트를 만들어줘. API 키는 스크립트 속성에 저장할거야."' },
          { title: 'Step 3', description: '챗봇이 만들어준 코드를 구글 시트 앱스스크립트 편집기에 복사하여 붙여넣습니다.' },
          { title: 'Step 4', description: '지난 시간에 메모장에 적어둔 내 API 키를 스크립트 설정에 붙여넣습니다.' },
          { title: 'Step 5', description: '실행 버튼을 눌러 내 시트에서 AI 기능이 잘 작동하는지 테스트해봅니다.' }
        ]
      },
      { type: 'tip', variant: 'tip', content: '프롬프트를 작성할 때, API 도큐먼트의 URL 주소를 함께 복사해서 AI에게 알려주면 최신 정보를 바탕으로 훨씬 정확한 코드를 만들어냅니다!' },
      { type: 'tip', variant: 'warning', content: 'API 호출(사용)에는 사용량 제한이 있거나 요금이 부과될 수 있습니다. 처음 테스트할 때는 1~2개의 적은 데이터로만 조심스럽게 실험해보세요.' },
      { type: 'checklist', sessionId: 'session-6', items: [
          { id: 's6-c1', label: 'API 도큐먼트 확인 완료' },
          { id: 's6-c2', label: '프롬프트 작성하여 코드 생성' },
          { id: 's6-c3', label: '코드에 내 API 키 설정하기' },
          { id: 's6-c4', label: 'API 연동 테스트 성공' },
          { id: 's6-c5', label: '결과 확인 및 추가 수정 요청해보기' }
        ]
      }
    ]
  },
  {
    id: 'session-7',
    number: 7,
    title: '안티그래비티로 주문해보기 기초',
    subtitle: '안티그래비티 사용방법',
    duration: '50분',
    objectives: ['안티그래비티(Antigravity) 이해하기', '설치 및 기본 사용법 익히기', '안티그래비티로 프로젝트 만들기'],
    sections: [
      { type: 'concept', icon: '🛸', title: '안티그래비티란?', body: '구글 딥마인드가 개발한 최첨단 AI 코딩 어시스턴트입니다. 캔버스가 단순한 웹페이지용이라면, 안티그래비티는 대화만으로 복잡한 파일들을 알아서 생성하고 수정하며 하나의 거대한 프로젝트를 통째로 만들어내는 강력한 마법 지팡이입니다.' },
      { type: 'concept', icon: '💻', title: 'IDE란?', body: '통합 개발 환경(Integrated Development Environment)의 약자입니다. 코드를 쓰고, 실행해보고, 오류를 잡는 등 프로그램 개발의 모든 과정을 한 곳에서 할 수 있는 \'전문 작업실\'입니다. 안티그래비티는 이 작업실에서 선생님을 돕는 유능한 조수입니다.' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: '강사가 안내하는 설치 링크를 통해 안티그래비티를 컴퓨터에 설치합니다.' },
          { title: 'Step 2', description: '프로그램을 실행한 뒤 바탕화면에 새 폴더를 만들고 프로젝트 폴더로 엽니다.' },
          { title: 'Step 3', description: '채팅창에 첫 지시를 내립니다. 예: "학생들의 출석부를 관리할 수 있는 모던하고 깔끔한 웹페이지를 만들어줘"' },
          { title: 'Step 4', description: 'AI가 스스로 여러 파일들을 만들고 코드를 작성하는 놀라운 과정을 지켜봅니다.' },
          { title: 'Step 5', description: '내장된 미리보기 창을 통해 결과물이 잘 작동하는지 테스트합니다.' }
        ]
      },
      { type: 'tip', variant: 'tip', content: '안티그래비티는 여러 개의 파일을 알아서 만들고 관리해줍니다. 제미나이 캔버스보다 훨씬 정교하고 복잡한, 진짜 서비스 같은 프로젝트를 만들 수 있어요!' },
      { type: 'tip', variant: 'tip', content: '결과가 마음에 들지 않으면 "이 버튼의 색깔을 이렇게 바꿔줘", "여기에는 이미지가 들어가면 좋겠어"라고 꼬리에 꼬리를 무는 대화를 이어가며 계속 발전시킬 수 있습니다.' },
      { type: 'checklist', sessionId: 'session-7', items: [
          { id: 's7-c1', label: '안티그래비티 설치 완료' },
          { id: 's7-c2', label: '프로그램 실행 및 폴더 열기 성공' },
          { id: 's7-c3', label: '첫 프로젝트 생성 요청' },
          { id: 's7-c4', label: 'AI가 생성한 파일 확인' },
          { id: 's7-c5', label: '미리보기로 결과 확인' },
          { id: 's7-c6', label: '수정 요청 1회 이상 진행하기' }
        ]
      }
    ]
  },
  {
    id: 'session-8',
    number: 8,
    title: '깃허브와 연동시켜보기',
    subtitle: '안티그래비티로 웹 호스팅하기',
    duration: '50분',
    objectives: ['깃허브 개념 이해하기', '안티그래비티로 깃허브 연동하기', '만든 웹앱을 세상에 공개하기'],
    sections: [
      { type: 'concept', icon: '🐙', title: '깃허브란?', body: '전 세계의 수많은 개발자들이 코드를 보관하고 공유하는 거대한 저장소(Repository)입니다. 구글 드라이브에 문서를 안전하게 저장하듯, 깃허브(GitHub)에는 우리가 만든 프로그램 코드를 체계적으로 저장합니다.' },
      { type: 'concept', icon: '🌐', title: '웹 호스팅이란?', body: '지금까지 내 컴퓨터 안에서만 돌아가던 웹페이지를 인터넷 세상에 띄워, 전 세계 누구나 주소를 치고 들어올 수 있게 만드는 과정입니다. GitHub Pages나 Vercel 같은 서비스를 쓰면 이 과정을 무료로 할 수 있습니다.' },
      { type: 'steps', steps: [
          { title: 'Step 1', description: 'github.com에 접속하여 회원가입을 하고 나만의 계정을 만듭니다.' },
          { title: 'Step 2', description: '안티그래비티 채팅창에 말합니다: "지금까지 만든 이 프로젝트를 내 깃허브에 올려줘"' },
          { title: 'Step 3', description: '화면에 뜨는 깃허브 로그인 및 인증 절차를 차분히 따라갑니다.' },
          { title: 'Step 4', description: '깃허브 사이트에 내 코드가 담긴 새로운 저장소가 잘 만들어졌는지 확인합니다.' },
          { title: 'Step 5', description: '인터넷에 배포하기 위해 요청합니다: "이 프로젝트를 다른 사람들도 인터넷에서 볼 수 있게 배포해줘"' }
        ]
      },
      { type: 'tip', variant: 'tip', content: '배포가 성공적으로 완료되면 고유한 웹사이트 주소(URL)가 생깁니다! 이 주소를 카카오톡 등으로 학생이나 동료 선생님들께 바로 공유해보세요.' },
      { type: 'tip', variant: 'tip', content: '한 번 배포했다고 끝이 아닙니다. 안티그래비티에서 코드를 수정하고 다시 깃허브에 올리면, 배포된 웹사이트도 자동으로 최신 버전으로 업데이트됩니다.' },
      { type: 'concept', icon: '🎉', title: '축하합니다!', body: '드디어 8차시의 모든 과정을 훌륭하게 완료하셨습니다! 이제 선생님은 코딩을 전혀 모르더라도 바이브코딩과 다양한 AI 도구를 지휘하여, 수업에 꼭 필요한 교수학습 콘텐츠를 뚝딱 만들고 전 세계와 공유할 수 있는 막강한 능력을 갖추셨습니다. 선생님의 다음 프로젝트를 응원합니다!' },
      { type: 'checklist', sessionId: 'session-8', items: [
          { id: 's8-c1', label: 'GitHub 계정 생성 완료' },
          { id: 's8-c2', label: '안티그래비티로 깃허브 연동 성공' },
          { id: 's8-c3', label: '내 깃허브 저장소 생성 확인' },
          { id: 's8-c4', label: '웹 배포 성공 (Vercel 등)' },
          { id: 's8-c5', label: '배포된 URL로 접속 확인' },
          { id: 's8-c6', label: '동료 선생님이나 학생에게 URL 공유하기' }
        ]
      }
    ]
  }
];

window.HOME_DATA = {
  title: '구글 도구와 함께하는 바이브코딩으로\n교수학습 콘텐츠 만들기',
  subtitle: '왕초보 교사를 위한 8차시 실습형 과정',
  description: '코딩을 전혀 몰라도 괜찮습니다! AI에게 대화로 주문하는 "바이브코딩"으로 나만의 교수학습 콘텐츠를 만들어 봅시다.',
  sessions: [
    { number: 1, title: '바이브코딩의 기초 원리 이해', tool: '제미나이 캔버스', icon: '🚀' },
    { number: 2, title: '캔바 AI로 경험해보는 바이브코딩', tool: '캔바 AI', icon: '🎨' },
    { number: 3, title: '앱스스크립트 기초', tool: 'Google Apps Script', icon: '📝' },
    { number: 4, title: '앱스스크립트 심화', tool: 'Gems 챗봇', icon: '🤖' },
    { number: 5, title: '인공지능 API 소개', tool: '업스테이지 API', icon: '🔌' },
    { number: 6, title: 'API로 AI 솔루션 주문하기', tool: 'API + 바이브코딩', icon: '⚡' },
    { number: 7, title: '안티그래비티 기초', tool: 'Antigravity', icon: '🛸' },
    { number: 8, title: '깃허브 연동 + 웹 호스팅', tool: 'GitHub + Vercel', icon: '🌐' }
  ]
};
