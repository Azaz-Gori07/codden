/**
 * CODDEN — Unified Atelier Engine & Ultra-Motion Controller
 * Features:
 * 1. Ambient cursor spotlight tracking & HUD telemetry
 * 2. 3D card tilt & specular light glare physics
 * 3. Magnetic micro-button interactions
 * 4. Section scrollspy & smooth anchor glide
 * 5. Interactive case study sliding documentary drawer
 * 6. Diagnostic scenario finder tab controller
 * 7. Interactive SVG technology topology radar
 * 8. 6-step project intake wizard with dynamic receipt generation
 * 9. CODDEN // DIRECTORY sliding side navbar
 * 10. Universal IntersectionObserver scroll reveal engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Guaranteed Opening Curtain Dismissal: Full CODDEN name loads, holds, then curtain glides upwards
  setTimeout(() => {
    const curtain = document.getElementById('openingCurtain');
    if (curtain) {
      curtain.classList.add('revealed');
      setTimeout(() => {
        curtain.style.display = 'none';
      }, 1050);
    }
  }, 1500);

  // ==========================================================================
  // 1. AMBIENT CURSOR SPOTLIGHT & HUD TELEMETRY
  // ==========================================================================
  let ambientSpotlight = document.querySelector('.ambient-cursor-spotlight');
  if (!ambientSpotlight) {
    ambientSpotlight = document.createElement('div');
    ambientSpotlight = Object.assign(ambientSpotlight, { className: 'ambient-cursor-spotlight' });
    document.body.prepend(ambientSpotlight);
  }

  // HUD Telemetry Strip removed as requested
  const hudCoordEl = null;
  const hudSecEl = null;
  const hudScrollEl = null;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let mouseTicking = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!mouseTicking) {
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
        if (hudCoordEl) {
          hudCoordEl.textContent = `X: ${String(mouseX).padStart(4, '0')} Y: ${String(mouseY).padStart(4, '0')}`;
        }
        mouseTicking = false;
      });
      mouseTicking = true;
    }
  }, { passive: true });

  // ==========================================================================
  // 2. 3D SPECULAR LIGHT & TACTILE CARD TILT PHYSICS
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card, .work-item, .level-card, .domain-card, .essay-card');
  tiltCards.forEach(card => {
    // Inject specular glare overlay if missing
    let glare = card.querySelector('.specular-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'specular-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty('--glare-x', `${(x / rect.width * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(y / rect.height * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // 3. MAGNETIC MICRO-INTERACTIONS FOR ACTION BUTTONS
  // ==========================================================================
  const magneticElements = document.querySelectorAll('.btn-talk, .btn-action-pill, #drawerClose, .menu-trigger');
  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ==========================================================================
  // 4. SCROLL PROGRESS & SCROLLSPY SECTION DETECTOR
  // ==========================================================================
  let progressBar = document.querySelector('.scroll-progress-line');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-line';
    document.body.appendChild(progressBar);
  }

  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link, .nav-pill-item, .drawer-nav-item a');

  let scrollTicking = false;
  function onScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY;

    if (totalHeight > 0) {
      const pct = Math.min(Math.max((scrollY / totalHeight) * 100, 0), 100);
      progressBar.style.width = `${pct.toFixed(2)}%`;
      if (hudScrollEl) {
        hudScrollEl.textContent = `${Math.round(pct)}%`;
      }
    }

    // Scrollspy: detect active section
    let currentSecId = 'hero';
    let currentSecLabel = '00 HERO';
    const vhOffset = window.innerHeight * 0.35;

    sections.forEach(sec => {
      const top = sec.offsetTop - vhOffset;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSecId = sec.getAttribute('id') || 'hero';
        const tag = sec.querySelector('.hero-tag, .section-eyebrow, .brand-logo');
        if (tag) {
          const txt = tag.textContent.trim().split('//')[0].trim().substring(0, 14);
          currentSecLabel = `${txt}`;
        } else {
          currentSecLabel = (currentSecId || '').toUpperCase();
        }
      }
    });

    if (hudSecEl) {
      hudSecEl.textContent = currentSecLabel;
    }

    // Update active nav links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSecId}` || (currentSecId === 'hero' && (href === '#hero' || href === 'index.html'))) {
        link.classList.add('active');
      } else if (href.startsWith('#')) {
        link.classList.remove('active');
      }
    });

    // Parallax micro-offset on media
    const parallaxMedia = document.querySelectorAll('.work-media img, .scroll-parallax-media');
    const vh = window.innerHeight;
    parallaxMedia.forEach(img => {
      const rect = img.parentElement ? img.parentElement.getBoundingClientRect() : img.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const center = (rect.top + rect.height / 2) / vh;
        const translateY = (center - 0.5) * -16;
        img.style.transform = `translateY(${translateY.toFixed(1)}px) scale(1.04)`;
      }
    });

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  onScroll();

  // Smooth scroll with offset for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 64;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // 5. CODDEN // DIRECTORY SIDENAVBAR CONTROLLER
  // ==========================================================================
  const navDrawer = document.getElementById('navDrawer');
  let backdrop = document.querySelector('.nav-drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  const openTriggers = document.querySelectorAll('#menuToggle, .menu-trigger, .open-directory-btn');
  function openSidenavbar() {
    if (navDrawer) navDrawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidenavbar() {
    if (navDrawer) navDrawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSidenavbar();
    });
  });

  const drawerClose = document.getElementById('drawerClose');
  if (drawerClose) {
    drawerClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidenavbar();
    });
  }

  backdrop.addEventListener('click', () => {
    closeSidenavbar();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidenavbar();
      closeCaseStudy();
    }
  });

  if (navDrawer) {
    navDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeSidenavbar();
      });
    });
  }

  // ==========================================================================
  // 6. INTERACTIVE FULL-SCREEN CASE STUDY DETAIL DRAWER
  // ==========================================================================
  const caseStudiesData = {
    aura: {
      badge: 'SPATIAL ARCHITECTURE // CANVAS',
      category: 'SPATIAL ARCHITECTURE & CANVAS',
      title: 'Aura OS Spatial Interface',
      subtitle: 'Next-generation spatial design canvas engineered in WebGL 2.0 and Rust/WASM, reducing CPU usage by 74% and sustaining locked 60fps at 25,000 active nodes.',
      client: 'Aura Spatial Systems (San Francisco, CA)',
      role: 'Principal Spatial Systems Architect & Lead WebGL Engineer',
      timeline: 'Q1–Q3 2026 • 8 Months Production',
      status: 'VERIFIED PRODUCTION • 420K ACTIVE CREATORS',
      image: 'assets/card1.jpg',
      liveUrl: 'https://superlist.com',
      frameCode: 'FR // 01 • SPATIAL CANVAS',
      mediaTechBadge: 'WEBGL 2.0 • RUST WASM • GLSL',
      tags: ['Rust / WASM', 'WebGL 2.0', 'Instanced Drawing', 'SIMD Offloading', 'Spatial Quadtree', 'Linear Memory', 'Zero GC'],
      metrics: [
        { val: '60 FPS', label: 'Locked Framerate', sub: 'Zero stutter with 25,000 active nodes simultaneously' },
        { val: '-74%', label: 'CPU Overhead', sub: 'Eliminated DOM & SVG main-thread layout thrashing' },
        { val: '< 8ms', label: 'Motion-to-Photon', sub: 'Sub-frame input latency verified on 120Hz ProMotion' },
        { val: '4.8x', label: 'Memory Efficiency', sub: 'Linear typed buffer replacing V8 heap allocations' }
      ],
      challenge: 'Enterprise product teams were constrained by traditional DOM-based canvas solutions. When complex documents scaled past 5,000 vectors, browser garbage collector pauses degraded rendering below 18fps, creating severe latency spikes and causing memory exhaustion on team collaborative canvases during critical client reviews.',
      solution: 'We architected an asynchronous rendering engine entirely in Rust compiled to WebAssembly with SIMD parallelization. The entire scene graph, spatial hierarchy, and bounding boxes are maintained in contiguous linear WASM memory. The browser main thread merely receives low-overhead input events, while WebGL 2.0 handles instanced draw calls at 60fps locked.',
      innovations: [
        { title: 'Contiguous WASM Scene Graph', desc: 'Flat binary array buffers manage transforms and hierarchy with zero garbage collection cycles, bypassing JavaScript V8 heap overhead entirely.' },
        { title: 'Dynamic Draw-Call Batching', desc: 'Custom GLSL shaders batch 25,000 discrete objects into fewer than 16 GPU draw calls per frame using hardware instancing.' },
        { title: 'Offscreen Worker Dispatch', desc: 'Hit-testing and spatial quadtree partitioning are evaluated off the main UI thread via shared ArrayBuffer transfer.' }
      ],
      outcome: 'Adopted across 420,000+ daily active designers across tier-1 technology teams. Achieved 99.99% session stability, reduced average client machine battery drain by 62%, and secured universal praise for zero-latency collaboration.',
      stack: 'Rust • WebAssembly (WASM) • WebGL 2.0 • GLSL Shaders • Web Workers • TypeScript • OffscreenCanvas'
    },
    rideflow: {
      badge: 'DISTRIBUTED SYSTEMS // MOBILITY',
      category: 'DISTRIBUTED SYSTEMS & REALTIME',
      title: 'Rideflow Urban Dispatch Platform',
      subtitle: 'High-concurrency urban dispatch system coordinating 120,000+ real-time passenger journeys, driver state machines, and micro-billing transactions in Go.',
      client: 'Rideflow Mobility Corp (Singapore / Tokyo)',
      role: 'Lead Distributed Systems Architect',
      timeline: 'Q2 2025 – Q1 2026 • 11 Months',
      status: 'ACTIVE INFRASTRUCTURE • 99.999% SLA',
      image: 'assets/card4.jpg',
      liveUrl: 'https://railway.com',
      frameCode: 'FR // 04 • CLOUD DISPATCH',
      mediaTechBadge: 'GO • REDIS CLUSTER • POSTGIS',
      tags: ['Distributed Go', 'Redis Cluster', 'PostGIS', 'WebSockets', 'Kubernetes', 'Micro-Billing', 'H3 Hexagons'],
      metrics: [
        { val: '120k+', label: 'Concurrent Trips', sub: 'Real-time state sync across drivers and riders' },
        { val: '38ms', label: 'Allocation Latency', sub: 'Median matching time within geographic geofences' },
        { val: '99.999%', label: 'Uptime SLA', sub: 'Zero outage during peak holiday commute surges' },
        { val: '14.2M', label: 'Daily Events', sub: 'Ingested location telemetry packets processed' }
      ],
      challenge: 'During peak commute spikes, legacy monolithic API gateways experienced socket connection exhaustion and state race conditions. Drivers were double-booked, trip cancellations spiked by 28%, and ledger reconciliations required hours of batch correction after system outages.',
      solution: 'Engineered an event-driven distributed state machine using Go actors and Redis cluster sharding. Geo-spatial matching was decentralized using dynamic H3 hexagonal indexing and PostGIS spatial clustering, ensuring lock-free transaction guarantees and sub-50ms driver dispatching.',
      innovations: [
        { title: 'Lock-Free Geo Matching', desc: 'Uber H3 spatial cells allow concurrent driver allocation without mutual exclusion locks across cluster nodes.' },
        { title: 'Asynchronous State Consensus', desc: 'Raft-backed distributed consensus guarantees exactly-once trip reservation even during transient cellular dropouts.' },
        { title: 'Micro-Ledger Billing Engine', desc: 'Append-only immutable audit trail recording GPS path points and dynamic toll pricing in real time.' }
      ],
      outcome: 'Successfully handled over 45M completed rides with zero double-allocations. Cut cloud infrastructure compute costs by 48% through optimized Go memory pooling and connection multiplexing.',
      stack: 'Go (Golang) • Redis Cluster • PostgreSQL / PostGIS • gRPC • WebSockets • Docker • Kubernetes'
    },
    neurolens: {
      badge: 'AUTONOMOUS INTELLIGENCE // AI',
      category: 'AUTONOMOUS MULTI-MODAL AI',
      title: 'NeuroLens AI Intelligence Engine',
      subtitle: 'Autonomous multi-modal intelligence pipeline parsing high-volume regulatory filings with private Qdrant vector retrieval and automated telemetry.',
      client: 'NeuroLens Enterprise Systems (Zurich / London)',
      role: 'Principal AI Systems Architect',
      timeline: 'Q3 2025 – Present • Production v2.4',
      status: 'SOC2 COMPLIANT • PRIVATE ON-PREM VPC',
      image: 'assets/card_raycast.jpg',
      liveUrl: 'https://raycast.com',
      frameCode: 'FR // 02 • NEURAL PIPELINE',
      mediaTechBadge: 'PYTHON • QDRANT • LANGGRAPH',
      tags: ['Private Vector DB', 'Deterministic RAG', 'Hybrid BM25', 'FastAPI', 'LangGraph', 'Telemetry', 'vLLM'],
      metrics: [
        { val: '100%', label: 'Deterministic Citation', sub: 'Every generated conclusion linked to verified source paragraphs' },
        { val: '82%', label: 'Time Reduction', sub: 'Average compliance audit turnaround cut from days to hours' },
        { val: '0', label: 'Data Egress', sub: 'Fully contained within customer on-premise VPC perimeter' },
        { val: '450k', label: 'Tokens / Sec', sub: 'Batch document parsing through vLLM clustered nodes' }
      ],
      challenge: 'Global compliance officers were burdened with reviewing 15,000+ pages of legal and financial directives per quarter. Generic third-party LLMs hallucinated regulatory references, suffered from context window truncation, and violated strict data sovereignty standards.',
      solution: 'Constructed an on-premise, air-gapped retrieval pipeline fusing dense vector embeddings with sparse BM25 keyword indexes. Implemented multi-agent validation loops with LangGraph and fine-tuned open weights models that cross-reference every output against primary source text.',
      innovations: [
        { title: 'Hybrid Dense-Sparse RAG', desc: 'Combines semantic understanding with exact lexical matching for legal terms, preventing hallucinated statutes.' },
        { title: 'Self-Correcting Agent Swarm', desc: 'A secondary adversarial verification agent inspects all generated outputs, flagging ungrounded claims.' },
        { title: 'Zero-Egress Encryption', desc: 'Customer data never touches external cloud APIs; all embeddings compute on dedicated enterprise GPUs.' }
      ],
      outcome: 'Deployed across 14 sovereign financial institutions and tier-1 legal firms. Reduced audit preparation cycles by 82% and achieved 100% adherence to FINRA and GDPR regulatory requirements.',
      stack: 'Python • FastAPI • Qdrant Vector DB • LangGraph • vLLM • PyTorch • Docker • OpenSearch'
    },
    apex: {
      badge: 'HIGH-FREQUENCY ANALYTICS // CLICKHOUSE',
      category: 'HIGH-THROUGHPUT ANALYTICS',
      title: 'Apex Metrics Financial Engine',
      subtitle: 'Columnar time-series analytics engine in ClickHouse processing 100M+ daily market ticks, risk thresholds, and liquidity metrics with sub-50ms responses.',
      client: 'Apex Capital & Quantitative Partners (New York)',
      role: 'Staff Infrastructure & Data Systems Architect',
      timeline: 'Q4 2024 – Q4 2025 • 12 Months',
      status: 'LOW LATENCY • TICK-BY-TICK STREAMING',
      image: 'assets/card2.jpg',
      liveUrl: 'https://dub.co',
      frameCode: 'FR // 03 • MARKET TELEMETRY',
      mediaTechBadge: 'CLICKHOUSE • KAFKA • RUST',
      tags: ['ClickHouse', 'Time-Series DB', 'Kafka Streams', 'Real-Time Risk', 'Sub-50ms SQL', 'Next.js', 'WebSockets'],
      metrics: [
        { val: '100M+', label: 'Daily Market Ticks', sub: 'Sustained ingest rate during market open spikes' },
        { val: '42ms', label: 'Median Query Speed', sub: '99th percentile responses across multi-year tick data' },
        { val: '10x', label: 'Compute Cost Savings', sub: 'Optimized compression vs legacy Snowflake/Redshift' },
        { val: '0.001%', label: 'Packet Drop Rate', sub: 'Zero-loss Kafka streaming pipelines under market stress' }
      ],
      challenge: 'Quantitative analysts and risk officers were paralyzed by legacy database queries timing out during market volatility spikes. Running a multi-asset VaR (Value at Risk) simulation took up to 45 minutes, rendering intraday hedging impossible.',
      solution: 'Architected an ultra-fast columnar storage layer utilizing ClickHouse and Apache Kafka. Real-time ticker feeds are vectorized, compressed, and written to memory-mapped columnar chunks with continuous materialized rollups, powering live browser dashboards via WebSockets.',
      innovations: [
        { title: 'Columnar Compression Sharding', desc: 'Custom Gorilla float compression reduces historical quote footprints by 91% while preserving bit-exact values.' },
        { title: 'Materialized Delta Streaming', desc: 'Pre-aggregates volatility surfaces on write, allowing instantaneous complex analytical queries.' },
        { title: 'WebAssembly Client Aggregation', desc: 'Pushes secondary filtering to trader browser threads, eliminating duplicate backend round-trips.' }
      ],
      outcome: 'Reduced portfolio risk calculation latency from 45 minutes to 42 milliseconds. Empowered hedge fund trading desks to manage $4.2B in assets with millisecond risk visibility.',
      stack: 'ClickHouse • Apache Kafka • Rust • Node.js • TypeScript • Next.js • Tailwind CSS • Docker'
    },
    veloce: {
      badge: 'INTERACTIVE 3D // WEBGL',
      category: 'INTERACTIVE 3D WEBGL',
      title: 'Veloce Hypercar 3D Configurator',
      subtitle: 'Real-time 3D vehicle configurator engineered in Three.js WebGL with ray-traced material fidelity, physics simulations, and 60fps mobile execution.',
      client: 'Veloce Automobili (Modena, Italy)',
      role: 'Creative Technologist & 3D WebGL Director',
      timeline: 'Q1 2026 • 5 Months R&D',
      status: 'PRODUCTION • AWWWARDS SITE OF THE DAY',
      image: 'assets/card3.jpg',
      liveUrl: 'https://framer.com',
      frameCode: 'FR // 05 • 3D HYPERCAR',
      mediaTechBadge: 'THREE.JS • PBR SHADERS • DRACO',
      tags: ['Three.js', 'WebGL 2.0', 'PBR Shaders', 'Draco Mesh', 'Blender Pipeline', 'Ray-Tracing', 'Web Audio'],
      metrics: [
        { val: '6.2 MB', label: 'Initial Asset Payload', sub: 'Complete 3D hypercar interior and exterior geometry' },
        { val: '1.4s', label: 'Mobile Interactive', sub: 'First touchable 3D render on cellular 4G/5G' },
        { val: '310%', label: 'Engagement Increase', sub: 'Average time on site exceeded 4 minutes 20 seconds' },
        { val: '60 FPS', label: 'Fluid Refresh', sub: 'Maintained across iPhone, Android, and Desktop' }
      ],
      challenge: 'High-fidelity CAD automotive models typically exceed 180MB, resulting in 30-second mobile load times, massive bounce rates, and inability to run on mid-tier mobile GPUs.',
      solution: 'Engineered a proprietary geometry optimization pipeline using Draco compression and custom PBR (Physically Based Rendering) shaders. Developed dynamic texture streaming and progressive LOD (Level of Detail) meshing to achieve console-grade fidelity at 6.2MB.',
      innovations: [
        { title: 'Dynamic Texture Mip-Streaming', desc: 'Progressively loads 4K clearcoat and carbon-fiber textures based on camera distance and device GPU limits.' },
        { title: 'Custom Anisotropic Carbon Shader', desc: 'Physically simulates weave light reflectance with minimal compute overhead using single-pass GLSL.' },
        { title: 'Automated Draco Asset Pipeline', desc: 'Reduces complex CAD mesh polygon counts by 92% with zero visible artifacting on specular reflections.' }
      ],
      outcome: 'Generated 2.4M unique configurator sessions in the first 30 days. Directly supported the sell-out of the limited-edition 150-unit production run within 48 hours of launch.',
      stack: 'Three.js • WebGL 2.0 • GLSL • Blender • Draco Compression • Web Audio API • Vanilla JS'
    }
  };

  const caseKeys = ['aura', 'rideflow', 'neurolens', 'apex', 'veloce'];
  let currentCaseKey = 'aura';

  // Build Full-Screen Case Study Drawer if missing
  let caseDrawer = document.getElementById('caseStudyDrawer');
  let caseBackdrop = document.querySelector('.case-drawer-backdrop');

  if (!caseDrawer) {
    caseBackdrop = document.createElement('div');
    caseBackdrop.className = 'case-drawer-backdrop';
    document.body.appendChild(caseBackdrop);

    caseDrawer = document.createElement('div');
    caseDrawer.id = 'caseStudyDrawer';
    caseDrawer.className = 'case-study-drawer';
    caseDrawer.setAttribute('role', 'dialog');
    caseDrawer.setAttribute('aria-modal', 'true');
    caseDrawer.setAttribute('aria-label', 'Project Case Study Full Screen View');
    caseDrawer.innerHTML = `
      <!-- Sticky Top Navigation Bar -->
      <div class="case-drawer-topbar">
        <div class="topbar-left">
          <button class="case-drawer-back-btn" id="caseDrawerClose" title="Close case study (ESC)">
            <span class="back-arrow">←</span>
            <span>Back</span>
            <kbd class="key-pill">ESC</kbd>
          </button>
        </div>

        <div class="case-nav-switcher" id="caseNavSwitcher">
          <button class="case-nav-item active" data-switch="aura">Aura OS</button>
          <button class="case-nav-item" data-switch="rideflow">Rideflow</button>
          <button class="case-nav-item" data-switch="neurolens">NeuroLens</button>
          <button class="case-nav-item" data-switch="apex">Apex Metrics</button>
          <button class="case-nav-item" data-switch="veloce">Veloce 3D</button>
        </div>

        <div class="topbar-right">
          <a href="#" target="_blank" rel="noopener noreferrer" class="case-live-link" id="caseLiveLink">
            <span class="live-dot"></span>
            <span class="live-link-text">Live Platform</span>
            <span class="link-arrow">↗</span>
          </a>
          <button class="case-drawer-x-btn" id="caseDrawerCloseIcon" title="Close case study">✕</button>
        </div>
      </div>

      <!-- Scrollable Full-Screen Layout -->
      <div class="case-drawer-scroll-container">
        <div class="case-drawer-layout">
          
          <!-- Sticky Left Sidebar Panel -->
          <aside class="case-sidebar-panel">
            <div class="sidebar-sticky-inner">
              <div class="case-badge-pill" id="caseDrawerBadge">CASE 00 // FLAGSHIP</div>
              
              <h2 class="case-sidebar-title" id="caseSidebarTitle">Aura OS Spatial Interface</h2>
              
              <p class="case-sidebar-sub" id="caseSidebarSubtitle">
                Next-generation spatial design canvas engineered in WebGL 2.0 & Rust/WASM.
              </p>

              <div class="case-meta-spec-table">
                <div class="meta-spec-row">
                  <span class="spec-label">CLIENT / ORG</span>
                  <span class="spec-val" id="caseMetaClient">Aura Technologies Inc.</span>
                </div>
                <div class="meta-spec-row">
                  <span class="spec-label">DISCIPLINE</span>
                  <span class="spec-val" id="caseMetaRole">Lead Systems Architecture</span>
                </div>
                <div class="meta-spec-row">
                  <span class="spec-label">TIMELINE</span>
                  <span class="spec-val" id="caseMetaTimeline">2026 • 8 Months</span>
                </div>
                <div class="meta-spec-row">
                  <span class="spec-label">STATUS</span>
                  <span class="spec-val status-verified" id="caseMetaStatus">VERIFIED PRODUCTION</span>
                </div>
              </div>

              <div class="case-sidebar-tech">
                <div class="sidebar-sec-label">PRODUCTION TECH STACK</div>
                <div class="tech-tag-cloud" id="caseTechTags"></div>
              </div>

              <div class="case-sidebar-cta-wrap">
                <a href="#contact" class="btn-sidebar-contact" id="caseDrawerCta">
                  <span>Discuss an Architecture Like This</span>
                  <span class="cta-arrow">→</span>
                </a>
                <span class="cta-subtext">Direct consultation with lead systems engineers</span>
              </div>
            </div>
          </aside>

          <!-- Main Deep-Dive Content Panel -->
          <main class="case-main-content">
            
            <!-- Hero Media Viewport with Frame HUD -->
            <div class="case-hero-media-wrap">
              <div class="media-hud-overlay">
                <div class="hud-top-meta">
                  <span class="rec-pill"><span class="rec-dot"></span> LIVE 4K • 60FPS</span>
                  <span class="frame-code" id="caseMediaFrameCode">FR // 01 • SPATIAL CANVAS</span>
                </div>
                <div class="hud-bottom-meta">
                  <span id="caseMediaTechBadge">WEBGL 2.0 • RUST WASM</span>
                  <span>ENTERPRISE GRADE ARCHITECTURE</span>
                </div>
              </div>
              <img id="caseDrawerImg" src="" alt="Case Study Cover" class="case-hero-img">
            </div>

            <!-- Quantitative Telemetry Metrics -->
            <div class="case-metrics-grid" id="caseDrawerMetrics"></div>

            <!-- Section 01: Commercial Challenge -->
            <section class="case-detail-section">
              <div class="section-num-header">
                <span class="sec-num">01</span>
                <span class="sec-kicker">STRATEGIC CONTEXT</span>
              </div>
              <h3 class="sec-headline">The Commercial Challenge & Operational Bottleneck</h3>
              <p class="sec-prose" id="caseDrawerChallenge"></p>
            </section>

            <!-- Section 02: Architectural Execution -->
            <section class="case-detail-section">
              <div class="section-num-header">
                <span class="sec-num">02</span>
                <span class="sec-kicker">TECHNICAL EXECUTION</span>
              </div>
              <h3 class="sec-headline">System Architecture & Core Engineering</h3>
              <p class="sec-prose" id="caseDrawerSolution"></p>
            </section>

            <!-- Section 03: Core Subsystems Innovations -->
            <section class="case-detail-section">
              <div class="section-num-header">
                <span class="sec-num">03</span>
                <span class="sec-kicker">SUBSYSTEM HIGHLIGHTS</span>
              </div>
              <h3 class="sec-headline">Engine Innovations & Low-Level Mechanics</h3>
              <div class="innovations-grid" id="caseInnovations"></div>
            </section>

            <!-- Section 04: Production Outcomes -->
            <section class="case-detail-section outcome-section">
              <div class="section-num-header">
                <span class="sec-num">04</span>
                <span class="sec-kicker">VERIFIED OUTCOMES</span>
              </div>
              <h3 class="sec-headline">Commercial Impact & Deployment Scale</h3>
              <p class="sec-prose" id="caseDrawerOutcome"></p>
              <div class="full-stack-strip">
                <span class="stack-strip-label">FULL PIPELINE SPECIFICATION:</span>
                <span class="stack-strip-val" id="caseDrawerStack"></span>
              </div>
            </section>

            <!-- Bottom Case Navigation (Prev / Next Case) -->
            <div class="case-bottom-nav">
              <button class="case-bottom-btn prev" id="casePrevBtn">
                <span class="btn-dir">← PREVIOUS CASE</span>
                <span class="btn-title" id="casePrevTitle">Apex Metrics</span>
              </button>
              <button class="case-bottom-btn next" id="caseNextBtn">
                <span class="btn-dir">NEXT CASE →</span>
                <span class="btn-title" id="caseNextTitle">Rideflow Platform</span>
              </button>
            </div>

          </main>

        </div>
      </div>
    `;
    document.body.appendChild(caseDrawer);

    // Event listeners
    document.getElementById('caseDrawerClose').addEventListener('click', closeCaseStudy);
    document.getElementById('caseDrawerCloseIcon').addEventListener('click', closeCaseStudy);
    caseBackdrop.addEventListener('click', closeCaseStudy);
    document.getElementById('caseDrawerCta').addEventListener('click', () => {
      closeCaseStudy();
    });

    // Top switcher buttons
    document.querySelectorAll('[data-switch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const switchKey = btn.getAttribute('data-switch');
        openCaseStudy(switchKey);
      });
    });

    // Prev / Next button listeners
    document.getElementById('casePrevBtn').addEventListener('click', () => {
      const idx = caseKeys.indexOf(currentCaseKey);
      const prevIdx = (idx - 1 + caseKeys.length) % caseKeys.length;
      openCaseStudy(caseKeys[prevIdx]);
    });

    document.getElementById('caseNextBtn').addEventListener('click', () => {
      const idx = caseKeys.indexOf(currentCaseKey);
      const nextIdx = (idx + 1) % caseKeys.length;
      openCaseStudy(caseKeys[nextIdx]);
    });

    // Keyboard navigation (ESC, Left, Right)
    window.addEventListener('keydown', (e) => {
      if (!caseDrawer.classList.contains('open')) return;
      if (e.key === 'Escape') {
        closeCaseStudy();
      } else if (e.key === 'ArrowLeft') {
        const idx = caseKeys.indexOf(currentCaseKey);
        const prevIdx = (idx - 1 + caseKeys.length) % caseKeys.length;
        openCaseStudy(caseKeys[prevIdx]);
      } else if (e.key === 'ArrowRight') {
        const idx = caseKeys.indexOf(currentCaseKey);
        const nextIdx = (idx + 1) % caseKeys.length;
        openCaseStudy(caseKeys[nextIdx]);
      }
    });
  }

  function openCaseStudy(key) {
    if (!caseStudiesData[key]) key = 'aura';
    currentCaseKey = key;
    const data = caseStudiesData[key];

    // Update Topbar Switcher active state
    document.querySelectorAll('[data-switch]').forEach(btn => {
      if (btn.getAttribute('data-switch') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Live Link
    const liveLink = document.getElementById('caseLiveLink');
    if (liveLink) liveLink.href = data.liveUrl;

    // Sidebar fields
    document.getElementById('caseDrawerBadge').textContent = data.badge;
    document.getElementById('caseSidebarTitle').textContent = data.title;
    document.getElementById('caseSidebarSubtitle').textContent = data.subtitle;
    document.getElementById('caseMetaClient').textContent = data.client;
    document.getElementById('caseMetaRole').textContent = data.role;
    document.getElementById('caseMetaTimeline').textContent = data.timeline;
    document.getElementById('caseMetaStatus').textContent = data.status;

    // Sidebar tech tags
    const techTagsEl = document.getElementById('caseTechTags');
    techTagsEl.innerHTML = data.tags.map(t => `<span class="tech-tag-pill">${t}</span>`).join('');

    // Main media showcase
    const drawerImg = document.getElementById('caseDrawerImg');
    drawerImg.src = data.image;
    drawerImg.alt = data.title;
    document.getElementById('caseMediaFrameCode').textContent = data.frameCode;
    document.getElementById('caseMediaTechBadge').textContent = data.mediaTechBadge;

    // 4 Metrics cards
    const metricsContainer = document.getElementById('caseDrawerMetrics');
    metricsContainer.innerHTML = data.metrics.map(m => `
      <div class="case-metric-card">
        <div class="metric-val">${m.val}</div>
        <div class="metric-label">${m.label}</div>
        <div class="metric-sub">${m.sub}</div>
      </div>
    `).join('');

    // Detail prose
    document.getElementById('caseDrawerChallenge').textContent = data.challenge;
    document.getElementById('caseDrawerSolution').textContent = data.solution;

    // 3 Subsystem Innovations
    const innovationsEl = document.getElementById('caseInnovations');
    innovationsEl.innerHTML = data.innovations.map((item, i) => `
      <div class="innovation-card">
        <div class="innovation-idx">INNOVATION 0${i + 1}</div>
        <h4 class="innovation-title">${item.title}</h4>
        <p class="innovation-desc">${item.desc}</p>
      </div>
    `).join('');

    // Outcomes & Stack
    document.getElementById('caseDrawerOutcome').textContent = data.outcome;
    document.getElementById('caseDrawerStack').textContent = data.stack;

    // Update Prev / Next Buttons
    const idx = caseKeys.indexOf(key);
    const prevKey = caseKeys[(idx - 1 + caseKeys.length) % caseKeys.length];
    const nextKey = caseKeys[(idx + 1) % caseKeys.length];
    document.getElementById('casePrevTitle').textContent = caseStudiesData[prevKey].title;
    document.getElementById('caseNextTitle').textContent = caseStudiesData[nextKey].title;

    // Open drawer
    caseDrawer.classList.add('open');
    caseBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset scroll position to top
    window.isCaseDrawerOpen = true;
    const scrollContainer = caseDrawer.querySelector('.case-drawer-scroll-container');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  }

  function closeCaseStudy() {
    window.isCaseDrawerOpen = false;
    if (caseDrawer) caseDrawer.classList.remove('open');
    if (caseBackdrop) caseBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Expose globally
  window.openCaseStudy = openCaseStudy;
  window.closeCaseStudy = closeCaseStudy;

  // Bind clicks on case items (both work items and hero deck cards)
  document.querySelectorAll('[data-case]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const key = el.getAttribute('data-case');
      openCaseStudy(key);
    });
  });

  // ==========================================================================
  // 7. DIAGNOSTIC SCENARIO FINDER CONTROLLER
  // ==========================================================================
  const finderTabs = document.querySelectorAll('.finder-tab');
  const finderResults = document.querySelectorAll('.finder-result');
  finderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      finderTabs.forEach(t => t.classList.remove('active'));
      finderResults.forEach(r => r.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetResult = document.getElementById(targetId);
      if (targetResult) targetResult.classList.add('active');
    });
  });

  // ==========================================================================
  // 8. INTERACTIVE SVG TECHNOLOGY TOPOLOGY RADAR
  // ==========================================================================
  const techNodesData = {
    codden: {
      title: 'CODDEN CORE ARCHITECTURE LAYER',
      desc: 'Central coordination layer uniting Product Strategy, Design Systems, High-Concurrency Engineering, and Cloud Infrastructure under one single responsible team.',
      status: 'STUDIO CORE // ZERO-HANDOFF ENGINE'
    },
    frontend: {
      title: 'FRONTEND ARCHITECTURE & WEB STANDARDS',
      desc: 'Next.js, React, WebGL, Vanilla CSS, WebAssembly. Sub-second initial paints, 60fps render cycles, accessible DOM hierarchies, and zero layout shift.',
      status: 'VERIFIED // SUB-100MS FCP'
    },
    backend: {
      title: 'HIGH-CONCURRENCY BACKEND SYSTEMS',
      desc: 'Go, Node.js, Python, PostgreSQL, Redis, gRPC microservices. Asynchronous event loops, database connection pooling, and deterministic data modeling.',
      status: 'VERIFIED // 100K+ RPS THROUGHPUT'
    },
    mobile: {
      title: 'NATIVE & CROSS-PLATFORM MOBILE',
      desc: 'Swift (iOS), Kotlin (Android), Flutter, React Native. Native offline storage, background GPS telemetry, biometric auth, and butter-smooth gestures.',
      status: 'VERIFIED // 60FPS RUNTIME'
    },
    ai: {
      title: 'INTELLIGENCE, AGENTS & VECTOR ENGINES',
      desc: 'Autonomous multi-step agents, private VPC retrieval-augmented generation (RAG), vector embeddings with Qdrant/Pinecone, and automated safety fences.',
      status: 'VERIFIED // ZERO HALLUCINATION TRAPS'
    },
    data: {
      title: 'STREAMING & COLUMNAR ANALYTICS',
      desc: 'ClickHouse, Kafka, PostgreSQL, Redis, Elasticsearch. Time-series market ingestion, multi-tenant partitioning, and sub-50ms aggregation queries.',
      status: 'VERIFIED // 100M+ DAILY EVENTS'
    },
    cloud: {
      title: 'MULTI-REGION CLOUD INFRASTRUCTURE',
      desc: 'Docker, Kubernetes, AWS, Cloudflare Edge, Terraform. Automated blue/green rollouts, DDOS mitigation, and SOC2 compliant telemetry.',
      status: 'VERIFIED // 99.99% PRODUCTION SLA'
    }
  };

  const nodeHubs = document.querySelectorAll('.node-hub');
  const nodeTitle = document.getElementById('nodeTitle');
  const nodeDesc = document.getElementById('nodeDesc');
  const nodeStatus = document.getElementById('nodeStatus');

  nodeHubs.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const key = node.getAttribute('data-node');
      const data = techNodesData[key];
      if (data && nodeTitle && nodeDesc && nodeStatus) {
        nodeTitle.textContent = data.title;
        nodeDesc.textContent = data.desc;
        nodeStatus.textContent = data.status;
      }
    });
  });

  // ==========================================================================
  // 9. 6-STEP PROJECT INTAKE WIZARD CONTROLLER
  // ==========================================================================
  let currentWizardStep = 1;
  const wizardData = {
    scope: 'Full-Stack Web App',
    stage: 'New Product (0 to 1)',
    synopsis: '',
    budget: '$25,000 - $50,000',
    timeline: '8 - 12 Weeks',
    name: '',
    email: '',
    company: ''
  };

  window.goToWizardStep = function (step) {
    if (step < 1 || step > 6) return;
    
    // Mark previous as completed
    const currentPill = document.querySelector(`.progress-step-pill[data-step="${currentWizardStep}"]`);
    if (step > currentWizardStep && currentPill) {
      currentPill.classList.add('completed');
    }

    document.querySelectorAll('.wizard-step-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.progress-step-pill').forEach(p => p.classList.remove('active'));

    const nextPane = document.getElementById(`stepPane${step}`);
    const nextPill = document.querySelector(`.progress-step-pill[data-step="${step}"]`);
    if (nextPane) nextPane.classList.add('active');
    if (nextPill) nextPill.classList.add('active');

    currentWizardStep = step;
  };

  // Selection tiles
  document.querySelectorAll('.selection-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const field = tile.getAttribute('data-field');
      const val = tile.getAttribute('data-value');
      const parent = tile.parentElement;
      parent.querySelectorAll('.selection-tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      if (field) wizardData[field] = val;
    });
  });

  // Submit wizard
  window.submitProjectWizard = function () {
    const nameInput = document.getElementById('wizName');
    const emailInput = document.getElementById('wizEmail');
    const compInput = document.getElementById('wizCompany');
    const descInput = document.getElementById('wizDesc');

    if (nameInput) wizardData.name = nameInput.value.trim();
    if (emailInput) wizardData.email = emailInput.value.trim();
    if (compInput) wizardData.company = compInput.value.trim();
    if (descInput) wizardData.synopsis = descInput.value.trim();

    if (!wizardData.name || !wizardData.email) {
      alert('Please provide your name and work email so our engineering directors can reach you.');
      return;
    }

    const receiptNum = 'CDN-' + Math.floor(100000 + Math.random() * 900000);
    const receiptContainer = document.getElementById('wizardReceiptContainer');
    const formContainer = document.getElementById('projectWizardForm');

    if (receiptContainer && formContainer) {
      formContainer.style.display = 'none';
      document.getElementById('receiptId').textContent = '#' + receiptNum;
      document.getElementById('receiptScope').textContent = wizardData.scope;
      document.getElementById('receiptStage').textContent = wizardData.stage;
      document.getElementById('receiptBudget').textContent = wizardData.budget;
      document.getElementById('receiptTimeline').textContent = wizardData.timeline;
      document.getElementById('receiptEmail').textContent = wizardData.email;
      receiptContainer.style.display = 'block';
    }
  };

  // ==========================================================================
  // 10. LIVE MASTER TIMECODE CLOCK (40ms precision)
  // ==========================================================================
  const clockElements = document.querySelectorAll('.live-timecode');
  function updateTimecode() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(now.getUTCMilliseconds() / 10)).padStart(2, '0');
    const timeStr = `UTC ${hours}:${minutes}:${seconds}:${milliseconds}`;
    clockElements.forEach(el => { el.textContent = timeStr; });
  }

  if (clockElements.length > 0) {
    setInterval(updateTimecode, 40);
    updateTimecode();
  }

  // ==========================================================================
  // 11. UNIVERSAL INTERSECTION OBSERVER SCROLL REVEAL ENGINE
  // ==========================================================================
  function initScrollAnimations() {
    // If reduced motion is requested or IntersectionObserver is not supported, reveal all immediately
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(`
        .scroll-reveal-container, .scroll-reveal, .scroll-reveal-scale,
        .scroll-reveal-left, .scroll-reveal-right, .scroll-stagger-child,
        section, .editorial-section, .portfolio-editorial, .method-section,
        .inquiry-section, .monument-statement-wrap, .studio-finale, .section-container
      `).forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const containerSelectors = [
      '.scroll-reveal-container',
      '[data-scroll-container]',
      '.editorial-section',
      '.portfolio-editorial',
      '.method-section',
      '.inquiry-section',
      '.monument-statement-wrap',
      '.studio-finale',
      '.page-hero',
      '.section-container'
    ];

    document.querySelectorAll(containerSelectors.join(', ')).forEach(container => {
      if (container.classList.contains('hero-viewport') || container.id === 'hero') return;
      if (!container.classList.contains('scroll-reveal-container')) {
        container.classList.add('scroll-reveal-container');
      }
      if (!container.classList.contains('scroll-border-sweep') &&
          !container.classList.contains('page-hero')) {
        container.classList.add('scroll-border-sweep');
      }
    });

    const textSelectors = [
      '.scroll-reveal',
      '[data-scroll-reveal]',
      '.editorial-main-title',
      '.editorial-statement',
      '.monument-statement',
      '.inquiry-question',
      '.finale-monumental-text',
      '.section-heading',
      '.section-desc',
      '.section-eyebrow'
    ];

    document.querySelectorAll(textSelectors.join(', ')).forEach(el => {
      if (!el.classList.contains('scroll-reveal') && !el.classList.contains('scroll-reveal-scale')) {
        el.classList.add('scroll-reveal');
      }
    });

    // Auto-stagger grids
    const staggerGroups = [
      { parent: '.capabilities-index', children: '.cap-row' },
      { parent: '.work-grid', children: '.work-item' },
      { parent: '.method-grid', children: '.method-node' },
      { parent: '.inquiry-pills-row', children: '.inquiry-pill' },
      { parent: '.manifesto-flow', children: 'span' },
      { parent: '.levels-grid', children: '.level-card' },
      { parent: '.grid-2', children: '> *' },
      { parent: '.grid-3', children: '> *' },
      { parent: '.grid-4', children: '> *' },
      { parent: '.timeline-wrapper', children: '.timeline-node' }
    ];

    staggerGroups.forEach(({ parent, children }) => {
      document.querySelectorAll(parent).forEach(pEl => {
        try {
          const childNodes = children === '> *' ? Array.from(pEl.children) : Array.from(pEl.querySelectorAll(children));
          childNodes.forEach((cEl, idx) => {
            cEl.classList.add('scroll-stagger-child');
            cEl.style.setProperty('--stagger-i', idx);
          });
        } catch (e) {
          // graceful fallback
        }
      });
    });

    const targetElements = document.querySelectorAll(`
      .scroll-reveal-container,
      .scroll-reveal,
      .scroll-reveal-scale,
      .scroll-reveal-left,
      .scroll-reveal-right,
      .scroll-stagger-child
    `);

    // Reveal all elements currently in or near initial viewport (hero area)
    const vh = window.innerHeight;
    targetElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.95 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
    });

    // Enable scroll animation transitions for off-screen elements
    document.documentElement.classList.add('has-scroll-anim');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    targetElements.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    // Safety fallback: if anything hasn't revealed after scroll, reveal it
    const checkSafety = () => {
      const currentVh = window.innerHeight;
      targetElements.forEach(el => {
        if (!el.classList.contains('is-revealed')) {
          const r = el.getBoundingClientRect();
          if (r.top < currentVh * 1.1 && r.bottom > -100) {
            el.classList.add('is-revealed');
          }
        }
      });
    };

    window.addEventListener('scroll', checkSafety, { passive: true });
    setTimeout(checkSafety, 350);
    setTimeout(checkSafety, 1200);
  }

  initScrollAnimations();
});
