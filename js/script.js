(function () {
  'use strict';

  /* HELPERS */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initCategoryTabs();
    initSeasonTabs();
    initCarousels();
    initWishlist();
    initThingsFilter();
    initSearchBox();
    initLoginModal();
    initAiAgent();
  }

  /* HERO CATEGORY TABS  */
  function initCategoryTabs() {
    const tabs = $$('.glass-tab');
    if (!tabs.length) return;

    const activate = (activeTab) => {
      tabs.forEach((tab) => {
        const isActive = tab === activeTab;
        tab.classList.toggle('btn-light', isActive);
        tab.classList.toggle('text-dark', isActive);
        tab.classList.toggle('fw-semibold', isActive);
        tab.classList.toggle('shadow-sm', isActive);
        tab.classList.toggle('active', isActive);
        tab.classList.toggle('btn-link', !isActive);
        tab.classList.toggle('text-white', !isActive);
        tab.classList.toggle('text-decoration-none', !isActive);
        tab.setAttribute('aria-pressed', String(isActive));
      });
    };

    activate($('.glass-tab.active') || tabs[0]);
    tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab)));
  }

  /* Trending Destinations*/
  function initSeasonTabs() {
    const tabs = $$('.season-btn');
    if (!tabs.length) return;

    const activate = (activeTab) => {
      tabs.forEach((tab) => {
        const isActive = tab === activeTab;
        tab.classList.toggle('bg-dark', isActive);
        tab.classList.toggle('text-white', isActive);
        tab.classList.toggle('bg-white', !isActive);
        tab.classList.toggle('text-dark', !isActive);
      });
    };

    activate($('.season-btn.active') || tabs[0]);
    tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab)));
  }

  /* SWIPER CAROUSELS */
  function initCarousels() {
    if (typeof Swiper === 'undefined') {
      console.warn('[Tripto] Swiper failed to load — carousels disabled.');
      return;
    }

    const baseConfig = {
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      updateOnImagesReady: true,
      keyboard: { enabled: true },
      a11y: {
        prevSlideMessage: 'Previous properties',
        nextSlideMessage: 'Next properties'
      },
      breakpoints: {
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    };

    const swipers = [];

    if ($('.dealsSwiper')) {
      swipers.push(
        new Swiper('.dealsSwiper', Object.assign({}, baseConfig, {
          navigation: { nextEl: '.deals-next', prevEl: '.deals-prev' }
        }))
      );
    }

    if ($('.homesSwiper')) {
      swipers.push(
        new Swiper('.homesSwiper', Object.assign({}, baseConfig, {
          navigation: { nextEl: '.homes-next', prevEl: '.homes-prev' }
        }))
      );
    }

    // Images load after init and change slide heights; one update settles it.
    window.addEventListener('load', () => swipers.forEach((s) => s.update()));
  }

  /* WISHLIST HEARTS */
  function initWishlist() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlist-btn');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const icon = btn.querySelector('i');
      if (!icon) return;

      const saved = icon.classList.toggle('bi-heart-fill');
      icon.classList.toggle('bi-heart', !saved);
      icon.classList.toggle('text-danger', saved);
      btn.setAttribute('aria-pressed', String(saved));
      btn.setAttribute('aria-label', saved ? 'Remove from wishlist' : 'Save to wishlist');
    });
  }

  /*  THINGS TO DO  */
  function initThingsFilter() {
    const buttons = $$('.city-filter-btn');
    const items = $$('.thing-item');
    if (!buttons.length || !items.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle('btn-dark', isActive);
          b.classList.toggle('active', isActive);
          b.classList.toggle('btn-outline-secondary', !isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });

        const selected = btn.dataset.category;
        items.forEach((item) => {
          const categories = (item.dataset.category || '').split(/\s+/);
          const show = selected === 'all' || categories.includes(selected);
          item.classList.toggle('d-none', !show);
        });
      });
    });
  }

  /* ==========================================
     7. SEARCH BOX
     ========================================== */
  function initSearchBox() {
    const locationBtn = $('#locationSelectBtn');
    const locationDropdown = $('#locationDropdown');
    const locationInput = $('#locationInput');
    const clearLocationBtn = $('#clearLocationBtn');
    const guestsBtn = $('#guestsSelectBtn');
    const guestsDropdown = $('#guestsDropdown');
    const checkIn = $('#checkInInput');
    const checkOut = $('#checkOutInput');
    const searchForm = $('#searchForm');
    const feedback = $('#searchFeedback');

    const counts = { rooms: 1, adults: 1, children: 0 };

    /* --- dropdown open/close --- */
    const closeAll = () => {
      if (locationDropdown) locationDropdown.style.display = 'none';
      if (guestsDropdown) guestsDropdown.style.display = 'none';
      [locationBtn, guestsBtn].forEach((btn) => {
        if (!btn) return;
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    const toggle = (btn, dropdown) => {
      const willOpen = dropdown.style.display !== 'block';
      closeAll();
      if (willOpen) {
        dropdown.style.display = 'block';
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    };

    if (locationBtn && locationDropdown) {
      locationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle(locationBtn, locationDropdown);
      });
    }

    if (guestsBtn && guestsDropdown) {
      guestsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle(guestsBtn, guestsDropdown);
      });
      // Clicks inside the guests panel must not bubble up and close it
      guestsDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    document.addEventListener('click', (e) => {
      const insideLocation =
        locationBtn && locationDropdown &&
        (locationBtn.contains(e.target) || locationDropdown.contains(e.target));
      const insideGuests =
        guestsBtn && guestsDropdown &&
        (guestsBtn.contains(e.target) || guestsDropdown.contains(e.target));
      if (!insideLocation && !insideGuests) closeAll();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });

    /* --- picking a destination --- */
    $$('[data-city]').forEach((el) => {
      el.addEventListener('click', () => {
        if (!locationInput) return;
        locationInput.value = el.dataset.city;
        if (clearLocationBtn) clearLocationBtn.classList.remove('d-none');
        if (feedback) feedback.classList.add('d-none');
        closeAll();
      });
    });

    if (clearLocationBtn && locationInput) {
      clearLocationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        locationInput.value = '';
        clearLocationBtn.classList.add('d-none');
        if (feedback) feedback.classList.add('d-none');
      });
    }

    /* --- dates --- */
    if (checkIn && checkOut) {
      const today = new Date().toISOString().split('T')[0];
      checkIn.min = today;
      checkOut.min = today;

      checkIn.addEventListener('change', () => {
        checkOut.min = checkIn.value || today;
        if (checkOut.value && checkOut.value < checkIn.value) {
          checkOut.value = checkIn.value;
        }
      });
    }

    /* --- rooms & guests counters --- */
    const summary = $('#guestsSummary');

    const renderCounts = () => {
      Object.keys(counts).forEach((key) => {
        const el = document.getElementById(key + 'Count');
        if (el) el.textContent = counts[key];
      });

      if (summary) {
        const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
        summary.textContent = [
          plural(counts.rooms, 'room'),
          plural(counts.adults, 'adult'),
          counts.children + (counts.children === 1 ? ' child' : ' children')
        ].join(', ');
      }

      // Grey out the minus button once the floor is reached
      $$('[data-counter]').forEach((btn) => {
        const type = btn.dataset.counter;
        const step = Number(btn.dataset.step);
        const min = type === 'children' ? 0 : 1;
        btn.disabled = step < 0 && counts[type] <= min;
      });
    };

    $$('[data-counter]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.dataset.counter;
        const step = Number(btn.dataset.step);
        const min = type === 'children' ? 0 : 1;
        const next = counts[type] + step;
        if (next < min || next > 30) return;
        counts[type] = next;
        renderCounts();
      });
    });

    renderCounts();

    /* --- submit --- */
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!locationInput || !locationInput.value) {
          if (feedback) {
            feedback.textContent = 'Please choose a destination first.';
            feedback.classList.remove('d-none', 'text-success');
            feedback.classList.add('text-danger');
          }
          if (locationBtn && locationDropdown) toggle(locationBtn, locationDropdown);
          return;
        }

        const guests = counts.adults + counts.children;
        const query = {
          location: locationInput.value,
          checkIn: checkIn && checkIn.value ? checkIn.value : 'any date',
          checkOut: checkOut && checkOut.value ? checkOut.value : 'any date',
          rooms: counts.rooms,
          adults: counts.adults,
          children: counts.children
        };

        console.log('[Tripto] search query', query);

        if (feedback) {
          feedback.textContent =
            'Searching stays in ' + query.location + ' · ' +
            query.checkIn + ' → ' + query.checkOut + ' · ' +
            query.rooms + (query.rooms === 1 ? ' room, ' : ' rooms, ') +
            guests + (guests === 1 ? ' guest' : ' guests');
          feedback.classList.remove('d-none', 'text-danger');
          feedback.classList.add('text-success');
        }
      });
    }
  }

  /* ==========================================
     8. LOGIN + VERIFICATION MODAL
     ========================================== */
  function initLoginModal() {
    const modalEl = $('#loginModal');
    if (!modalEl) return;

    const emailInput = $('#userEmail');
    const continueBtn = $('#continueBtn');
    const emailForm = $('#emailForm');
    const emailStep = $('#emailStep');
    const verifyStep = $('#verifyStep');
    const displayEmail = $('#displayEmail');
    const backBtn = $('#backToEmailBtn');
    const editEmailBtn = $('#editEmailBtn');
    const codeInputs = $$('.code-input');
    const verifyForm = $('#verifyForm');
    const verifyBtn = $('#verifyBtn');
    const verifySpinner = $('#verifySpinner');
    const timerEl = $('#timer');
    const resendBtn = $('#resendBtn');
    const resendWrap = $('#resendWrap');

    let countdownId = null;

    /* --- step 1: email --- */
    if (emailInput && continueBtn) {
      const sync = () => {
        continueBtn.disabled = !emailInput.value.trim() || !emailInput.checkValidity();
      };
      emailInput.addEventListener('input', sync);
      sync();
    }

    function startCountdown(seconds) {
      stopCountdown();
      if (!timerEl) return;

      let remaining = typeof seconds === 'number' ? seconds : 24;
      timerEl.textContent = remaining;
      if (resendWrap) resendWrap.classList.remove('d-none');
      if (resendBtn) resendBtn.classList.add('d-none');

      countdownId = setInterval(() => {
        remaining -= 1;
        timerEl.textContent = remaining;
        if (remaining <= 0) {
          stopCountdown();
          if (resendWrap) resendWrap.classList.add('d-none');
          if (resendBtn) resendBtn.classList.remove('d-none');
        }
      }, 1000);
    }

    function stopCountdown() {
      if (countdownId) clearInterval(countdownId);
      countdownId = null;
    }

    const showVerifyStep = () => {
      if (displayEmail && emailInput) displayEmail.textContent = emailInput.value;
      emailStep.classList.add('d-none');
      verifyStep.classList.remove('d-none');
      if (backBtn) backBtn.classList.remove('d-none');
      codeInputs.forEach((i) => (i.value = ''));
      syncVerifyBtn();
      if (codeInputs[0]) codeInputs[0].focus();
      startCountdown();
    };

    const showEmailStep = () => {
      verifyStep.classList.add('d-none');
      emailStep.classList.remove('d-none');
      if (backBtn) backBtn.classList.add('d-none');
      stopCountdown();
    };

    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showVerifyStep();
      });
    }

    if (backBtn) backBtn.addEventListener('click', showEmailStep);
    if (editEmailBtn) editEmailBtn.addEventListener('click', showEmailStep);

    if (resendBtn) {
      resendBtn.addEventListener('click', () => {
        codeInputs.forEach((i) => (i.value = ''));
        syncVerifyBtn();
        if (codeInputs[0]) codeInputs[0].focus();
        startCountdown();
      });
    }

    /* --- code boxes: digits only, auto-advance, paste support --- */
    codeInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 1);
        if (input.value && index < codeInputs.length - 1) {
          codeInputs[index + 1].focus();
        }
        syncVerifyBtn();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
          codeInputs[index - 1].focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) codeInputs[index - 1].focus();
        if (e.key === 'ArrowRight' && index < codeInputs.length - 1) codeInputs[index + 1].focus();
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const clip = e.clipboardData || window.clipboardData;
        const digits = clip.getData('text').replace(/\D/g, '');
        digits.split('').slice(0, codeInputs.length - index).forEach((d, i) => {
          codeInputs[index + i].value = d;
        });
        const next = Math.min(index + digits.length, codeInputs.length - 1);
        codeInputs[next].focus();
        syncVerifyBtn();
      });
    });

    function syncVerifyBtn() {
      if (!verifyBtn) return;
      verifyBtn.disabled = codeInputs.some((i) => !i.value);
    }

    syncVerifyBtn();

    /* --- verify --- */
    if (verifyForm) {
      verifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (verifySpinner) verifySpinner.classList.remove('d-none');
        if (verifyBtn) verifyBtn.disabled = true;

        setTimeout(() => {
          if (verifySpinner) verifySpinner.classList.add('d-none');
          stopCountdown();

          const instance = window.bootstrap && bootstrap.Modal.getInstance(modalEl);
          if (instance) instance.hide();

          setLoggedIn(emailInput ? emailInput.value : '');
        }, 1500);
      });
    }

    // Reset back to step 1 whenever the modal is dismissed
    modalEl.addEventListener('hidden.bs.modal', () => {
      showEmailStep();
      if (emailForm) emailForm.reset();
      if (continueBtn) continueBtn.disabled = true;
      codeInputs.forEach((i) => (i.value = ''));
      syncVerifyBtn();
    });

    /*the signed-in avatar  */
    function setLoggedIn(email) {
      const loginBtn = $('#loginBtn');
      const account = $('#accountMenu');
      const label = $('#accountEmail');

      if (loginBtn) loginBtn.classList.add('d-none');
      if (account) account.classList.remove('d-none');
      if (label && email) label.textContent = email;
    }
  }

  /*  AI AGENT CHAT */
  function initAiAgent() {
    const chat = $('#chatMessages');
    const form = $('#aiChatForm');
    const input = $('#aiInput');
    const welcome = $('#welcomeHeader');
    const resetBtn = $('#aiResetBtn');
    if (!chat) return;

    function followUps(pairs) {
      return '<div class="d-flex flex-column gap-1 mb-2">' + pairs.map(function (pair) {
        return '<button type="button" class="btn btn-outline-secondary border text-start rounded-4 p-2 d-flex align-items-center justify-content-between follow-up-btn fs-7 bg-white" data-type="' + pair[1] + '">' +
               '<span>' + pair[0] + '</span><i class="bi bi-chevron-right text-muted"></i></button>';
      }).join('') + '</div>';
    }

    /* canned answers */
    const responses = {
      hotels:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Based on the latest ratings in Barcelona, we recommend:</p>' +
          '<div class="mb-2"><strong class="text-primary d-block">Hotel Arts Barcelona</strong>' +
          '<small class="text-muted">Rating 5.0 &middot; Luxurious stay with 6-star service.</small></div>' +
          '<div class="mb-0"><strong class="text-primary d-block">SLS Barcelona</strong>' +
          '<small class="text-muted">Rating 4.5 &middot; Rooftop pool &amp; sea view.</small></div>' +
        '</div>' +
        '<div class="d-flex gap-2 chat-scroll-x py-2 mb-2 pe-1">' +
          '<div class="card border rounded-4 shadow-sm flex-shrink-0 position-relative ai-hotel-card">' +
            '<span class="badge bg-success position-absolute top-0 start-0 m-1 fs-8">Deal</span>' +
            '<img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" class="card-img-top rounded-top-4" alt="Hotel Arts Barcelona">' +
            '<div class="card-body p-2"><h6 class="fw-bold mb-1 fs-7">Hotel Arts</h6>' +
            '<span class="badge-rating">5.0</span><div class="fw-bold text-dark fs-7 mt-1">$300 / night</div></div>' +
          '</div>' +
          '<div class="card border rounded-4 shadow-sm flex-shrink-0 position-relative ai-hotel-card">' +
            '<span class="badge bg-primary position-absolute top-0 start-0 m-1 fs-8">Popular</span>' +
            '<img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80" class="card-img-top rounded-top-4" alt="SLS Barcelona">' +
            '<div class="card-body p-2"><h6 class="fw-bold mb-1 fs-7">SLS Barcelona</h6>' +
            '<span class="badge-rating">4.5</span><div class="fw-bold text-dark fs-7 mt-1">$288 / night</div></div>' +
          '</div>' +
        '</div>' +
        followUps([
          ['Compare these hotels for me.', 'compare'],
          ['Show me cheaper options.', 'budget']
        ]),

      apartments:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Here are top apartments &amp; homes near downtown Barcelona:</p>' +
          '<div class="mb-2"><strong class="text-primary d-block">Gothic Quarter Modern Loft</strong>' +
          '<small class="text-muted">Fully equipped kitchen, 5 min walk to La Rambla &middot; $132 / night</small></div>' +
          '<div class="mb-0"><strong class="text-primary d-block">Eixample Luxury Apartment</strong>' +
          '<small class="text-muted">Spacious 2-bedroom with private balcony &middot; $178 / night</small></div>' +
        '</div>' +
        followUps([
          ['Show apartments under $150 per night.', 'budget'],
          ['Which ones allow pets?', 'default']
        ]),

      inspiration:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Tips to prevent motion sickness during travel:</p>' +
          '<ul class="mb-0 ps-3">' +
            '<li>Choose the seat with the least motion — front of the bus, over the wing on a plane.</li>' +
            '<li>Look at the horizon or a fixed point outside, not at a screen.</li>' +
            '<li>Stay hydrated and skip heavy meals before you set off.</li>' +
            '<li>Fresh air and ginger tea both help more than people expect.</li>' +
          '</ul>' +
        '</div>' +
        followUps([['What should I pack for a long trip?', 'default']]),

      attractions:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Top attractions &amp; activities in Barcelona:</p>' +
          '<div class="mb-2"><strong class="text-primary d-block">1. Sagrada Família</strong>' +
          '<small class="text-muted">Gaudí\'s unfinished masterpiece — book a timed entry slot.</small></div>' +
          '<div class="mb-2"><strong class="text-primary d-block">2. Park Güell</strong>' +
          '<small class="text-muted">Mosaic terraces and panoramic views over the city.</small></div>' +
          '<div class="mb-0"><strong class="text-primary d-block">3. Gothic Quarter</strong>' +
          '<small class="text-muted">Medieval streets, tapas bars and the cathedral cloister.</small></div>' +
        '</div>' +
        followUps([
          ['Get entry ticket info for Sagrada Família.', 'tickets'],
          ['What can I do on a rainy day?', 'default']
        ]),

      compare:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Hotel Arts vs. SLS Barcelona</p>' +
          '<ul class="mb-0 ps-3">' +
            '<li><strong>Price:</strong> $300 vs. $288 per night</li>' +
            '<li><strong>Rating:</strong> 5.0 vs. 4.5</li>' +
            '<li><strong>Location:</strong> both on the beachfront in Port Olímpic</li>' +
            '<li><strong>Best for:</strong> Hotel Arts for service, SLS for the rooftop pool</li>' +
          '</ul>' +
        '</div>',

      budget:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Good value stays under $150 a night:</p>' +
          '<div class="mb-2"><strong class="text-primary d-block">Casa Gràcia Boutique</strong>' +
          '<small class="text-muted">Rating 4.4 &middot; $118 / night</small></div>' +
          '<div class="mb-0"><strong class="text-primary d-block">Poble Sec Garden Flat</strong>' +
          '<small class="text-muted">Rating 4.6 &middot; $139 / night</small></div>' +
        '</div>',

      tickets:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          '<p class="mb-2 fw-semibold">Sagrada Família — visitor info</p>' +
          '<ul class="mb-0 ps-3">' +
            '<li>Open daily, roughly 9:00–18:00 (longer in summer).</li>' +
            '<li>Entry from about €26; tower access costs extra.</li>' +
            '<li>Timed tickets sell out — book a few days ahead.</li>' +
          '</ul>' +
        '</div>',

      dates:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          'Tell me your check-in and check-out dates and I\'ll pull availability for them.' +
        '</div>',

      default:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
          'I can help with stays, apartments, attractions and travel tips. ' +
          'Try asking about hotels in a city, things to do, or your budget.' +
        '</div>' +
        followUps([
          ['Recommend hotels in Barcelona.', 'hotels'],
          ['What is there to do nearby?', 'attractions']
        ])
    };

    /* --- work out the topic of a free-typed message --- */
    const KEYWORDS = [
      [/\b(hotel|hotels|resort|stay|stays|room|rooms)\b/i, 'hotels'],
      [/\b(apartment|apartments|flat|loft|home|homes|villa|villas)\b/i, 'apartments'],
      [/(attraction|sight|visit|activit|things to do|museum|tour|see)/i, 'attractions'],
      [/(tip|advice|sick|pack|inspir)/i, 'inspiration'],
      [/\b(compare|comparison|versus|vs)\b/i, 'compare'],
      [/(cheap|budget|affordable|under \$|price|cost)/i, 'budget'],
      [/\b(ticket|tickets|entry|opening|hours)\b/i, 'tickets'],
      [/(check[- ]?in|check[- ]?out|availability|\bdates?\b)/i, 'dates']
    ];

    function detectTopic(text) {
      for (let i = 0; i < KEYWORDS.length; i++) {
        if (KEYWORDS[i][0].test(text)) return KEYWORDS[i][1];
      }
      return 'default';
    }

    /* --- rendering --- */
    const scrollToBottom = () => {
      chat.scrollTop = chat.scrollHeight;
    };

    function addUserMessage(text) {
      const row = document.createElement('div');
      row.className = 'd-flex justify-content-end my-2';
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble-user shadow-sm fs-7';
      bubble.textContent = text;   // textContent, never innerHTML — this is user input
      row.appendChild(bubble);
      chat.appendChild(row);
      scrollToBottom();
    }

    function addTypingIndicator() {
      const wrap = document.createElement('div');
      wrap.className = 'my-2';
      wrap.innerHTML =
        '<div class="bg-light rounded-4 d-inline-flex px-3 py-2">' +
        '<span class="typing-dots"><span></span><span></span><span></span></span></div>';
      chat.appendChild(wrap);
      scrollToBottom();
      return wrap;
    }

    function addBotMessage(type) {
      const wrap = document.createElement('div');
      wrap.className = 'my-2';
      wrap.innerHTML = responses[type] || responses.default;
      chat.appendChild(wrap);
      scrollToBottom();
    }

    function sendMessage(text, explicitType) {
      if (!text) return;

      // The welcome block is the empty state hide it once a chat starts
      if (welcome && !welcome.classList.contains('d-none')) {
        welcome.classList.add('d-none');
      }

      addUserMessage(text);

      const typing = addTypingIndicator();
      const type = explicitType && responses[explicitType] ? explicitType : detectTopic(text);

      setTimeout(() => {
        typing.remove();
        addBotMessage(type);
      }, 650);
    }

    /* --- events --- */
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.prompt-card');
      if (card) {
        const textEl = card.querySelector('.prompt-text');
        sendMessage(textEl ? textEl.textContent.trim() : '', card.dataset.type);
        return;
      }

      const followUp = e.target.closest('.follow-up-btn');
      if (followUp) {
        const span = followUp.querySelector('span');
        sendMessage(span ? span.textContent.trim() : '', followUp.dataset.type);
      }
    });

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        sendMessage(text);
        input.value = '';
      });
    }

    /* --- reset the conversation --- */
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        $$('#chatMessages > *').forEach((child) => {
          if (child !== welcome) child.remove();
        });
        if (welcome) welcome.classList.remove('d-none');
        if (input) input.value = '';
        scrollToBottom();
      });
    }
  }
})();
