
/* =========================================================
   PUBLISH POLISH - illustrative OPEX scenario model
========================================================= */
(function(){
  const BASE=125000;
  function calc(volume,inflation,fixedChange){
    const variableBase=85000;
    const fixedBase=40000;
    const variable=variableBase*(volume/100)*(1+inflation/100);
    const fixed=fixedBase*(1+fixedChange/100);
    return variable+fixed;
  }
  function wire(prefix){
    const v=document.getElementById(prefix+'Volume');
    const i=document.getElementById(prefix+'Inflation');
    const f=document.getElementById(prefix+'Fixed');
    const vo=document.getElementById(prefix+'VolumeValue');
    const io=document.getElementById(prefix+'InflationValue');
    const fo=document.getElementById(prefix+'FixedValue');
    const out=document.getElementById(prefix+'Forecast');
    const delta=document.getElementById(prefix+'Delta');
    if(!v||!i||!f||!out)return;
    const render=()=>{
      const volume=Number(v.value), inflation=Number(i.value), fixed=Number(f.value);
      const forecast=calc(volume,inflation,fixed);
      const pct=((forecast/BASE)-1)*100;
      if(vo)vo.textContent=volume+'%';
      if(io)io.textContent=inflation+'%';
      if(fo)fo.textContent=(fixed>0?'+':'')+fixed+'%';
      out.textContent='€'+(forecast/1000).toFixed(1)+'K';
      if(delta)delta.textContent=(pct>=0?'+':'')+pct.toFixed(1)+'% vs base';
    };
    [v,i,f].forEach(x=>x.addEventListener('input',render));
    render();
  }
  wire('sim');
  wire('caseSim');
})();

/* =========================================================
   FINAL VISIBILITY FIX - reveal system
   The hero must never depend on an unavailable external observer.
========================================================= */
(function(){
  const show = el => {
    if(!el) return;
    el.classList.add('show');
    el.style.opacity='1';
    el.style.transform='none';
  };

  // Hero is the first thing visitors must see immediately.
  document.querySelectorAll('.home-page .home-hero .reveal').forEach(show);

  // Reveal remaining sections as they enter the viewport.
  const items = Array.from(document.querySelectorAll('.reveal:not(.home-hero .reveal)'));
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.06, rootMargin:'0px 0px 80px 0px'});
    items.forEach(el=>observer.observe(el));
  } else {
    items.forEach(show);
  }
})();



/* =========================================================
   PREMIUM SMOOTH INTERACTIONS
   ========================================================= */
(function () {
  function initPremiumMotion() {
    if (document.querySelector('.premium-scroll-progress')) return;

    var progress = document.createElement('div');
    progress.className = 'premium-scroll-progress';
    progress.innerHTML = '<span></span>';
    document.body.appendChild(progress);

    var bar = progress.firstElementChild;

    function updateProgress() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var value = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, value)) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    var selectors = [
      'section > *',
      '.project-card',
      '.timeline-item',
      '.timeline-card',
      '.career-card',
      '.kpi-card',
      '.metric-card',
      '.stat-card',
      '.workflow-step',
      '.process-card',
      '.formula-card',
      '.control-card'
    ];

    var candidates = [];
    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        if (!el.classList.contains('premium-reveal')) {
          el.classList.add('premium-reveal');
          candidates.push(el);
        }
      });
    });

    if (!('IntersectionObserver' in window)) {
      candidates.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -7% 0px'
    });

    candidates.forEach(function (el, i) {
      el.style.transitionDelay = Math.min((i % 5) * 55, 220) + 'ms';
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumMotion);
  } else {
    initPremiumMotion();
  }
})();



/* =========================================================
   PREMIUM HEADER INTERACTIONS
========================================================= */
(function(){
  const dateOutput = document.getElementById('premiumHeaderDateTime');

  function updatePremiumHeaderTime(){
    if(!dateOutput) return;
    const now = new Date();
    const date = now.toLocaleDateString('en-GB',{
      day:'2-digit',
      month:'short',
      year:'numeric'
    }).toUpperCase();
    const time = now.toLocaleTimeString('en-GB',{
      hour:'2-digit',
      minute:'2-digit',
      hour12:false
    });
    dateOutput.textContent = date + ' · ' + time;
  }

  updatePremiumHeaderTime();
  window.setInterval(updatePremiumHeaderTime, 30000);

  const menuButton = document.getElementById('headerMenuButton');
  const menuPanel = document.getElementById('premiumMenuPanel');

  if(menuButton && menuPanel){
    menuButton.addEventListener('click', function(){
      const open = document.body.classList.toggle('premium-nav-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuPanel.setAttribute('aria-hidden', String(!open));
    });

    menuPanel.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        document.body.classList.remove('premium-nav-open');
        menuButton.setAttribute('aria-expanded','false');
        menuPanel.setAttribute('aria-hidden','true');
      });
    });

    document.addEventListener('click', function(event){
      if(!document.body.classList.contains('premium-nav-open')) return;
      if(!menuPanel.contains(event.target) && !menuButton.contains(event.target)){
        document.body.classList.remove('premium-nav-open');
        menuButton.setAttribute('aria-expanded','false');
        menuPanel.setAttribute('aria-hidden','true');
      }
    });
  }

  const themeButton = document.getElementById('premiumThemeToggle');
  if(themeButton){
    themeButton.addEventListener('click', function(){
      const body = document.body;
      const isLight = body.dataset.theme === 'light';
      body.dataset.theme = isLight ? 'dark' : 'light';
      document.documentElement.classList.toggle('premium-light-theme', !isLight);
      themeButton.setAttribute('aria-pressed', String(!isLight));
    });
  }
})();



// Projects full-screen scroll introduction
(function(){
  const intro=document.querySelector('.projects-scroll-intro');
  const cue=document.querySelector('[data-scroll-target="projects-content"]');
  const target=document.getElementById('projects-content');
  if(!intro||!cue||!target)return;
  cue.addEventListener('click',()=>target.scrollIntoView({behavior:'smooth',block:'start'}));
  const update=()=>intro.classList.toggle('is-past',window.scrollY>intro.offsetHeight*.35);
  update();
  window.addEventListener('scroll',update,{passive:true});
})();


/* =========================================================
   ACCESSIBLE NAVIGATION + INTERACTION POLISH
   Centralized here so accessibility behavior is not scattered
   across page-specific inline scripts.
========================================================= */
(function(){
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';

  // Back-to-top control.
  const backTop = document.getElementById('backTop');
  if(backTop){
    backTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior});
    });
  }

  // Keep the primary navigation state meaningful for keyboard and screen-reader users.
  const navLinks = Array.from(document.querySelectorAll('.portfolio-reference-nav .portfolio-nav-link'));
  const sections = navLinks.map(link => {
    const target = document.querySelector(link.getAttribute('href'));
    return target ? {link,target} : null;
  }).filter(Boolean);

  function setCurrent(link){
    navLinks.forEach(item => {
      item.classList.toggle('active', item === link);
      if(item === link) item.setAttribute('aria-current','page');
      else item.removeAttribute('aria-current');
    });
  }

  navLinks.forEach(link => link.addEventListener('click', function(){ setCurrent(link); }));

  if('IntersectionObserver' in window && sections.length){
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if(!visible) return;
      const match = sections.find(item => item.target === visible.target);
      if(match) setCurrent(match.link);
    }, {rootMargin:'-25% 0px -60% 0px', threshold:[0.05,0.2,0.5]});
    sections.forEach(item => observer.observe(item.target));
  }
})();

/* =========================================================
   ACCESSIBLE CAPABILITY TABS
   Adds Arrow/Home/End keyboard navigation and keeps ARIA state
   synchronized with the existing visual interaction.
========================================================= */
(function(){
  const tabs = Array.from(document.querySelectorAll('.portfolio-expertise-section .expertise-tab[role="tab"]'));
  const panel = document.getElementById('expertiseDetail');
  if(!tabs.length || !panel) return;

  function activate(tab, focus){
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.setAttribute('tabindex', active ? '0' : '-1');
    });
    panel.setAttribute('aria-labelledby', tab.id);
    if(focus) tab.focus();
    if(!tab.classList.contains('active')) tab.click();
  }

  tabs.forEach((tab,index) => {
    tab.addEventListener('click', function(){ activate(tab,false); });
    tab.addEventListener('keydown', function(event){
      let next = null;
      if(event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if(event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if(event.key === 'Home') next = 0;
      if(event.key === 'End') next = tabs.length - 1;
      if(next === null) return;
      event.preventDefault();
      activate(tabs[next], true);
    });
  });
})();

/* =========================================================
   CAREER TIMELINE - EXACT TRAVELLING LIGHT
   The point moves to measured milestone centres and activates only
   the milestone it has physically reached. This replaces fixed
   percentage keyframes, keeping desktop and responsive alignment exact.
========================================================= */
(function(){
  const track = document.querySelector('#timeline.timeline-v2 .timeline-v2-track');
  if(!track) return;

  const light = track.querySelector('.timeline-v2-moving-light');
  const items = Array.from(track.querySelectorAll('.timeline-v2-item'));
  if(!light || !items.length) return;

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#6bd8b5','#86b9ec','#aaa5ee','#ff9b70','#f0ca5d'];
  let frameId = null;
  let running = false;
  let positions = [];
  let phaseIndex = -1;
  let phaseStarted = 0;

  const travelDuration = 1450;
  const stopDuration = 620;
  const finalStopDuration = 1650;
  const resetFadeDuration = 180;

  function measure(){
    // The moving light is positioned inside the motion lane, so measure every
    // milestone relative to that same lane. This keeps the light physically
    // centered on each stop even when the lane is inset from the track.
    const lane = track.querySelector('.timeline-v2-motion-lane');
    if(!lane) return;
    const laneRect = lane.getBoundingClientRect();
    positions = items.map(item => {
      const rect = item.getBoundingClientRect();
      return rect.left - laneRect.left + rect.width / 2;
    });
  }

  function setActive(index){
    items.forEach((item, i) => item.classList.toggle('is-timeline-active', i === index));
  }

  function setLight(x, colorIndex){
    light.style.left = `${x}px`;
    light.style.setProperty('--journey-light', colors[Math.max(0, Math.min(colors.length - 1, colorIndex))]);
  }

  function stop(){
    if(frameId) cancelAnimationFrame(frameId);
    frameId = null;
    running = false;
    setActive(-1);
    light.style.opacity = '0';
  }

  function start(){
    if(reduced && reduced.matches){ stop(); return; }
    measure();
    const lane = track.querySelector('.timeline-v2-motion-lane');
    if(!lane || !positions.length || lane.getBoundingClientRect().width <= 0) return;
    if(frameId) cancelAnimationFrame(frameId);
    running = true;
    phaseIndex = 0;
    phaseStarted = performance.now();
    setActive(0);
    light.style.opacity = '1';
    setLight(positions[0], 0);
    frameId = requestAnimationFrame(tick);
  }

  function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2; }

  function beginPhase(index, now){
    phaseIndex = index;
    phaseStarted = now;
  }

  function tick(now){
    if(!running) return;

    // Each numbered phase holds the current milestone, then the next frame
    // begins travel to the next physically measured centre.
    if(phaseIndex >= 0 && phaseIndex < positions.length){
      const hold = phaseIndex === positions.length - 1 ? finalStopDuration : stopDuration;
      const elapsed = now - phaseStarted;
      if(elapsed < hold){
        setActive(phaseIndex);
        setLight(positions[phaseIndex], phaseIndex);
      } else if(phaseIndex === positions.length - 1){
        // Premium reset: fade briefly at Allianz, jump invisibly to the start, then restart.
        setActive(-1);
        light.style.opacity = '0';
        const fadeElapsed = elapsed - hold;
        if(fadeElapsed >= resetFadeDuration){
          setLight(positions[0], 0);
          light.style.opacity = '1';
          beginPhase(0, now);
        }
      } else {
        const next = phaseIndex + 1;
        const travelStart = elapsed - hold;
        const t = Math.min(travelStart / travelDuration, 1);
        setActive(-1);
        const x = positions[phaseIndex] + (positions[next] - positions[phaseIndex]) * ease(t);
        setLight(x, next);
        if(t >= 1){ setLight(positions[next], next); setActive(next); beginPhase(next, now); }
      }
    }

    frameId = requestAnimationFrame(tick);
  }

  if(reduced){
    const onMotionChange = () => reduced.matches ? stop() : start();
    if(reduced.addEventListener) reduced.addEventListener('change', onMotionChange);
    else if(reduced.addListener) reduced.addListener(onMotionChange);
  }

  let resizeTimer = null;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 120);
  }, {passive:true});

  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(start); }
  else if(document.readyState === 'complete') start();
  else window.addEventListener('load', start, {once:true});
})();


/* =========================================================
   CENTRALIZED HOMEPAGE INTERACTIONS
========================================================= */
(function(){
  const data={
    finance:{accent:'#43d8bd',rgb:'67,216,189',title:'Finance & FP&A',flow:['Forecast','Budget','Variance','Reconciliation','Decision support'],tools:['Excel','Power BI','QuickBooks'],proof:[['€125K+','monthly OPEX forecast scope'],['20% → 5%','forecast variance improvement'],['€150K+','supplier payments managed']]},
    forecasting:{accent:'#4b9cff',rgb:'75,156,255',title:'Forecasting & Budgeting',flow:['Drivers','Assumptions','Budget','Forecast','Variance review'],tools:['Excel','OPEX Model','Cost Analysis'],proof:[['€125K+','monthly OPEX scope'],['5%','improved forecast variance'],['250+','monthly AP invoices']]},
    performance:{accent:'#a86af6',rgb:'168,106,246',title:'Variance & Performance',flow:['Actuals','Compare','Explain','Track KPIs','Action'],tools:['Power BI','KPI Tracking','Reporting'],proof:[['20% → 5%','forecast variance'],['16+','standardised KPIs'],['15+','business units']]},
    bi:{accent:'#ffb23e',rgb:'255,178,62',title:'Business Intelligence',flow:['Define','Structure','Visualise','Validate','Report'],tools:['Power BI','MicroStrategy','SQL'],proof:[['6','regional dashboards'],['15+','business units'],['16+','KPIs standardised']]},
    accounting:{accent:'#47c9d7',rgb:'71,201,215',title:'Accounting & Close',flow:['Capture','Reconcile','Accrue','Close','Control'],tools:['QuickBooks','Excel','Reconciliation'],proof:[['3.5K+','AP invoices reconstructed'],['€10K-€15K','operational costs reconciled'],['60+','claims reconciled']]},
    commercial:{accent:'#e95ea8',rgb:'233,94,168',title:'Commercial Analysis',flow:['Revenue','Mix','Pricing','Scenario','Decision'],tools:['Excel','Pricing Analysis','Scenarios'],proof:[['10%','revenue growth'],['188%','quarterly growth'],['69%','CAGR']]},
    data:{accent:'#4b9cff',rgb:'75,156,255',title:'Data & Automation',flow:['Clean','Match','Reconcile','Automate','Refresh'],tools:['Excel','SQL','VBA','Apps Script'],proof:[['250+','monthly invoices'],['300+','refunds reconciled'],['60+','claims reconciled']]}
  };
  const panel=document.getElementById('expertiseDetail');
  const esc=x=>String(x).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  const toolIcon={Excel:'▦','Power BI':'▥',QuickBooks:'qb','OPEX Model':'ƒ','Cost Analysis':'↗','KPI Tracking':'▤',Reporting:'▤',MicroStrategy:'μ',SQL:'SQL',Reconciliation:'≋','Pricing Analysis':'%','Scenarios':'◫',VBA:'V','Apps Script':'{}'};
  function visual(){return '<div class="capability-visual" aria-hidden="true"><div class="capability-dots"></div><div class="capability-line"><svg viewBox="0 0 600 150" preserveAspectRatio="none"><path d="M8 132 C72 122 78 105 130 112 S205 95 245 83 S306 92 348 62 S404 74 450 39 S526 51 592 8" fill="none" stroke="var(--cap)" stroke-width="2"/><g fill="var(--cap)"><circle cx="245" cy="83" r="4"/><circle cx="348" cy="62" r="4"/><circle cx="450" cy="39" r="4"/><circle cx="592" cy="8" r="4"/></g></svg></div><div class="capability-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="capability-pie"></div></div>';}
  function render(key){
    const d=data[key]||data.finance;
    if(!panel)return;
    panel.style.setProperty('--cap',d.accent);
    panel.style.setProperty('--cap-rgb',d.rgb);
    panel.innerHTML='<div class="capability-top"><div><span class="capability-kicker"><span class="bulb">♙</span> Capability logic</span><h3>'+esc(d.title)+'</h3><div class="capability-flow">'+d.flow.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div><div class="detail-tools">'+d.tools.map(x=>'<span><em>'+esc(toolIcon[x]||'◆')+'</em>'+esc(x)+'</span>').join('')+'</div></div>'+visual()+'</div><div class="expertise-proof">'+d.proof.map(x=>'<div><div><strong>'+esc(x[0])+'</strong><small>'+esc(x[1])+'</small></div></div>').join('')+'</div>';
  }
  document.querySelectorAll('.portfolio-expertise-section .expertise-tab').forEach(btn=>btn.addEventListener('click',function(){
    document.querySelectorAll('.portfolio-expertise-section .expertise-tab').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
    this.classList.add('active');
    this.setAttribute('aria-selected','true');
    render(this.dataset.expertise);
  }));
  render('finance');
})();

(function(){
  const stages={
    data:{label:'DATA',title:'Start with a reliable base.',text:'Supplier, operational and KPI inputs are structured and validated before the numbers are used for forecasting or reporting.',tags:['RECONCILE','VALIDATE','STANDARDISE'],proof:[['250+','monthly supplier invoices'],['300+','customer refunds reconciled'],['60+','claims reconciled']]},
    calculation:{label:'CALCULATION',title:'Apply the financial logic.',text:'Translate operational drivers into forecasts, costs, KPIs and financial outputs using clear, repeatable calculations.',tags:['FORECAST','MODEL','CALCULATE'],proof:[['€125K+','monthly OPEX forecast scope'],['16+','standardised KPIs'],['6','regional dashboards']]},
    control:{label:'CONTROL',title:'Challenge the number before it moves.',text:'Forecast-to-actual checks, reconciliations and KPI definitions make unusual movements visible and keep reporting reliable.',tags:['VARIANCE','RECONCILIATION','KPI GOVERNANCE'],proof:[['20% → 5%','forecast variance'],['€150K+','supplier payments'],['15+','business units']]},
    decision:{label:'DECISION',title:'Explain what changes.',text:'Turn the validated result into a clear business explanation so stakeholders can understand the movement and decide what to do next.',tags:['REPORT','EXPLAIN','ACT'],proof:[['10%','revenue growth'],['188%','quarterly growth'],['69%','CAGR']]}
  };
  const panel=document.getElementById('financeDetail');
  if(!panel)return;
  const render=key=>{
    const d=stages[key]; if(!d)return;
    panel.innerHTML='<span class="section-code">'+d.label+'</span><h3>'+d.title+'</h3><p>'+d.text+'</p><div class="finance-detail-tags">'+d.tags.map(t=>'<span>'+t+'</span>').join('')+'</div><div class="finance-detail-proof">'+d.proof.map(x=>'<div><strong>'+x[0]+'</strong><small>'+x[1]+'</small></div>').join('')+'</div>';
  };
  document.querySelectorAll('.finance-tab').forEach(btn=>btn.addEventListener('click',function(){
    document.querySelectorAll('.finance-tab').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
    this.classList.add('active');
    this.setAttribute('aria-selected','true');
    render(this.dataset.financeStage);
  }));
  render('data');
})();

(function(){
  const page=document.querySelector('.home-page');
  const cue=document.querySelector('.home-page .scroll-explore');
  if(!page||!cue)return;
  const reveal=()=>page.classList.toggle('scroll-content-revealed',window.scrollY>45);
  window.addEventListener('scroll',reveal,{passive:true});
  reveal();
})();

(function(){
  const el=document.getElementById('siteDateTime');
  if(!el)return;
  const fmt=new Intl.DateTimeFormat(undefined,{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
  const update=()=>{el.textContent=fmt.format(new Date()).replace(/,/g,' ·').toUpperCase();};
  update();
  window.setInterval(update,30000);
})();

(function(){
  const enterPortfolio=()=>{
    const screen=document.getElementById('introScreen');
    if(!screen)return;
    const button=document.getElementById('enterPortfolio');
    if(button)button.disabled=true;
    screen.classList.add('is-leaving');
    document.body.classList.remove('intro-active');
    document.body.classList.add('page-ready');
    window.setTimeout(()=>screen.remove(),650);
  };
  const button=document.getElementById('enterPortfolio');
  if(button){button.addEventListener('click',enterPortfolio);button.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enterPortfolio();}});}
  const screen=document.getElementById('introScreen');
  if(screen){
    screen.addEventListener('click',e=>{if(e.target.closest('.enter-portfolio'))return;enterPortfolio();});
    window.setTimeout(enterPortfolio,900);
  }
  document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&document.getElementById('introScreen')){e.preventDefault();enterPortfolio();} if(e.key==='Escape'&&document.getElementById('introScreen'))enterPortfolio();});
})();

(function(){
  const navHome=document.querySelector('.nav-single-home');
  if(navHome)navHome.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  const paletteExperience=document.querySelector('[data-command="/experience"]');
  if(paletteExperience)paletteExperience.addEventListener('click',()=>document.getElementById('experience')?.scrollIntoView({behavior:'smooth',block:'start'}));
})();

/* =========================================================
   SOOTHING AMBIENT WEBSITE SOUND
   Starts only after visitor interaction (browser autoplay policy),
   loops softly, and exposes a tiny keyboard-accessible mute control.
========================================================= */
(function(){
  let audio = null;
  let toggle = null;
  let started = false;

  function ensureAudio(){
    if(audio) return audio;
    audio = document.createElement('audio');
    audio.src = './assets/soothing-ambient-loop.ogg';
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.075;
    audio.setAttribute('aria-label','Soothing ambient background music');
    audio.style.display = 'none';
    document.body.appendChild(audio);
    return audio;
  }

  function ensureToggle(){
    if(toggle || !document.body.classList.contains('home-page')) return;
    toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='ambient-sound-toggle';
    toggle.setAttribute('aria-pressed','true');
    toggle.setAttribute('aria-label','Mute ambient music');
    toggle.textContent='♪';
    toggle.addEventListener('click',function(){
      const a=ensureAudio();
      a.muted=!a.muted;
      toggle.setAttribute('aria-pressed',String(!a.muted));
      toggle.setAttribute('aria-label',a.muted?'Unmute ambient music':'Mute ambient music');
      toggle.textContent=a.muted?'×':'♪';
    });
    document.body.appendChild(toggle);
  }

  function start(){
    if(started) return;
    started=true;
    ensureToggle();
    const a=ensureAudio();
    const play=a.play();
    if(play && typeof play.catch==='function') play.catch(()=>{ started=false; });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){
      ensureAudio();
      document.addEventListener('pointerdown',start,{once:true,passive:true});
      document.addEventListener('keydown',start,{once:true});
    });
  }else{
    ensureAudio();
    document.addEventListener('pointerdown',start,{once:true,passive:true});
    document.addEventListener('keydown',start,{once:true});
  }
})();
