// ===================================================================
// AMOL LONDHE — WORLD-CLASS PERSONAL TECHNOLOGY PORTFOLIO
// Interactive Architecture, Case Studies, and System Visualizers
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  const q = s => document.querySelector(s);
  const qAll = s => document.querySelectorAll(s);

  // 1. Dynamic Footer Year
  const yearEl = q('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Global Header Scroll State
  const header = q('#global-header');
  const scrollProgressBar = q('#scroll-progress-bar');

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollProgressBar) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      scrollProgressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Ambient Cursor Glow (Fine Pointer Only)
  const cursor = q('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // 4. Reveal Animations via Intersection Observer
  const revealElements = qAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Mobile Navigation Drawer
  const mobileMenuBtn = q('#mobile-menu-btn');
  const drawerCloseBtn = q('#drawer-close-btn');
  const mobileMenu = q('#mobile-menu');
  const drawerLinks = qAll('.drawer-link');

  const openDrawer = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 6. 3D Parallax Tilt Effect for Hero Founder Visual Card
  const heroCardWrapper = q('.founder-card-wrapper');
  const founderImage = q('#hero-founder-image');
  const floatingBadges = qAll('.floating-badge');

  if (heroCardWrapper && window.matchMedia('(pointer: fine)').matches) {
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroCardWrapper.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;

          const deltaX = (e.clientX - cardCenterX) / 28;
          const deltaY = (e.clientY - cardCenterY) / 28;

          const rotateX = Math.max(Math.min(-deltaY * 0.4, 8), -8);
          const rotateY = Math.max(Math.min(deltaX * 0.4, 8), -8);

          if (founderImage) {
            founderImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
          }

          floatingBadges.forEach((badge, idx) => {
            const factor = (idx + 1) * 0.35;
            badge.style.transform = `translate(${deltaX * factor}px, ${deltaY * factor}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });

    heroCardWrapper.addEventListener('mouseleave', () => {
      if (founderImage) {
        founderImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
      floatingBadges.forEach(b => b.style.transform = '');
    });
  }

  // 7. Interactive Architecture Lab ("UNDER THE HOOD")
  const architectureLayers = {
    user: {
      badge: "TIER 01 / CLIENT INTERFACES",
      title: "User & Client Interfaces",
      desc: "High-performance client surfaces engineered for zero perceptible latency, responsive layouts across 320px–1920px viewports, accessible keyboard controls, and fluid micro-animations.",
      responsibilities: [
        "Client-side state management and optimistic UI updates",
        "Responsive viewport adaptations across mobile, tablet, and ultra-wide displays",
        "Accessible DOM hierarchy, ARIA attributes & screen-reader compatibility",
        "Edge-cached asset hydration and sub-second First Contentful Paint (FCP)"
      ],
      considerations: "Eliminating render-blocking scripts, caching critical assets via edge CDNs, and validating all form schemas prior to hitting backend network boundaries.",
      tech: ["Next.js", "React", "Vanilla CSS", "TypeScript", "PWA", "Tailored Canvas"]
    },
    gateway: {
      badge: "TIER 02 / EDGE & NETWORK GATEWAY",
      title: "Edge & API Gateway",
      desc: "The perimeter security layer managing SSL termination, token rate limiting, DDoS mitigation, and reverse proxy routing.",
      responsibilities: [
        "Distributed DDoS mitigation and geodistributed DNS routing",
        "TLS 1.3 / SSL encryption termination with HTTP/2 and HTTP/3 multiplexing",
        "Granular per-IP and per-token rate limiting to protect business services",
        "Request sanitization, header normalization, and CORS enforcement"
      ],
      considerations: "Configuring edge caching rules for static assets while keeping dynamic mutation endpoints strictly bypass-routed.",
      tech: ["Cloudflare", "Nginx", "SSL / TLS 1.3", "JWT Auth", "Rate Limiter"]
    },
    api: {
      badge: "TIER 03 / BACKEND BUSINESS LOGIC",
      title: "API & Business Logic Services",
      desc: "High-concurrency asynchronous application services handling business transactions, database transactions, domain validation, and third-party orchestration.",
      responsibilities: [
        "Decoupled microservice and modular monolith domain architectures",
        "Asynchronous non-blocking I/O endpoints handling high concurrent loads",
        "Strict Pydantic / TypeScript schema validation for incoming payloads",
        "Centralized error trapping, audit logging, and transactional rollbacks"
      ],
      considerations: "Keeping services stateless for horizontal autoscaling and decoupling heavy computational workloads into background queues.",
      tech: ["Python FastAPI", "Node.js", "AsyncIO", "Pydantic", "REST", "WebSockets"]
    },
    ai: {
      badge: "TIER 04 / AI & AGENTIC WORKFLOWS",
      title: "AI & Intelligent Automation",
      desc: "Autonomous LLM reasoning loops, tool-calling pipelines, Retrieval-Augmented Generation (RAG), and vector semantic search.",
      responsibilities: [
        "Deterministic JSON schema enforcement for language model outputs",
        "Tool invocation routines that query production databases safely",
        "Hybrid dense-sparse vector search across enterprise knowledge bases",
        "Asynchronous webhook dispatchers for WhatsApp and external triggers"
      ],
      considerations: "Strict token budget monitoring, caching vector embeddings, and fallback deterministic handlers in case of model provider timeouts.",
      tech: ["LangChain", "Vector DBs", "ChromaDB", "Claude / GPT-4o", "Function Calling"]
    },
    database: {
      badge: "TIER 05 / PERSISTENCE & DATA STORAGE",
      title: "Database & Data Storage",
      desc: "Relational data structures, document storage, and schema migrations engineered for ACID compliance, audit trails, and zero data loss.",
      responsibilities: [
        "Normalized relational schemas with strict foreign key constraints",
        "Optimized indexes and composite keys for sub-10ms query execution",
        "Automated schema migration pipelines with zero downtime",
        "Encrypted at-rest object storage for media and document assets"
      ],
      considerations: "Connection pooling via PgBouncer, automated backup snapshots, and read replicas for high-traffic analytical queries.",
      tech: ["PostgreSQL", "MongoDB", "SQLAlchemy", "Alembic", "AWS S3"]
    },
    cache: {
      badge: "TIER 06 / CACHE & ASYNC QUEUES",
      title: "Cache & Async Event Queues",
      desc: "Sub-millisecond in-memory caching and distributed message queues decoupling time-consuming background jobs from user request loops.",
      responsibilities: [
        "Sub-millisecond in-memory caching of frequently queried data models",
        "Distributed task queues for web scraping, PDF generation, and notifications",
        "Pub/Sub messaging for real-time live events and push updates",
        "Exponential backoff and dead-letter queue (DLQ) retry mechanisms"
      ],
      considerations: "Cache invalidation strategies (TTL + event-based purging) and monitoring memory limits to prevent out-of-memory worker drops.",
      tech: ["Redis", "Celery", "BullMQ", "Event Streams", "Webhooks"]
    },
    cloud: {
      badge: "TIER 07 / CLOUD INFRASTRUCTURE & RUNTIME",
      title: "Cloud Infrastructure & DevOps",
      desc: "Containerized environments, automated continuous deployment pipelines, health monitoring, and elastic cloud scaling.",
      responsibilities: [
        "Immutable Docker container images with minimal multi-stage builds",
        "Automated GitHub Actions CI/CD pipelines with automated test suites",
        "Health checks, uptime monitoring, and automatic container recovery",
        "Centralized telemetry, log aggregation, and latency tracing"
      ],
      considerations: "Hardening container security, rotating secrets via environment managers, and designing graceful shutdown signals.",
      tech: ["Docker", "AWS", "CI/CD Actions", "Nginx", "Linux", "Prometheus"]
    }
  };

  const tierBtns = qAll('.arch-tier-btn');
  const inspBadge = q('#inspector-layer-badge');
  const inspTitle = q('#inspector-layer-title');
  const inspDesc = q('#inspector-layer-desc');
  const inspResp = q('#inspector-responsibilities');
  const inspCons = q('#inspector-considerations');
  const inspTech = q('#inspector-tech-tags');

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const layerKey = btn.getAttribute('data-layer');
      const data = architectureLayers[layerKey];
      if (!data) return;

      if (inspBadge) inspBadge.textContent = data.badge;
      if (inspTitle) inspTitle.textContent = data.title;
      if (inspDesc) inspDesc.textContent = data.desc;
      if (inspCons) inspCons.textContent = data.considerations;

      if (inspResp) {
        inspResp.innerHTML = data.responsibilities.map(r => `<li>${r}</li>`).join('');
      }

      if (inspTech) {
        inspTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
      }
    });
  });

  // 8. Technology Ecosystem Category Filter
  const filterBtns = qAll('.filter-btn');
  const ecoItems = qAll('.eco-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      ecoItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          item.style.display = 'flex';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          item.style.display = 'none';
        }
      });
    });
  });

  // 9. Interactive Case Study Drawer / Modal
  const caseStudiesData = {
    realvion: {
      title: "RealVion",
      category: "PROPTECH · PRODUCT ENGINEERING",
      subtitle: "Next-Gen Real Estate Sales Operating System & High-Value Property Engine",
      liveUrl: "https://realvion-official-site.onrender.com/",
      overview: "RealVion is a digital product engineered for luxury real estate developers and institutional property managers. It eliminates fragmented spreadsheets and static brochures by unifying interactive 3D building exploration, real-time unit availability, automated valuation calculations, and buyer analytics into a high-performance web platform.",
      problem: "Traditional real estate sales cycles for high-value architectural developments suffer from significant operational drag: prospective buyers cannot easily visualize units in 3D, inventory availability across multi-broker sales teams goes out of sync, and manual deal processing creates costly communication bottlenecks.",
      approach: "I architected RealVion as a single responsive web operating system with high-speed rendering, sub-100ms API endpoints, and a modular component design. By coupling lightweight 3D models with real-time inventory state tracking, developers can showcase entire multi-story developments dynamically.",
      architectureDiagram: `+-------------------------------------------------------------+
| CLIENT TIER: Responsive Web App (Next.js / Vanilla CSS)      |
| 3D Model Viewport · Inventory Grid · Interactive Pricing    |
+------------------------------+------------------------------+
                               | HTTPS / WSS
+------------------------------v------------------------------+
| EDGE & API GATEWAY: Cloudflare CDN + Nginx Reverse Proxy     |
| SSL Termination · Rate Limiting · Asset Edge Caching        |
+------------------------------+------------------------------+
                               | REST APIs
+------------------------------v------------------------------+
| BACKEND LOGIC: Python FastAPI Asynchronous Services         |
| Unit State Machine · Valuation Engine · Broker Auth Service  |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
+-----------v------------+              +---------v-----------+
| PostgreSQL Database    |              | Redis Cache         |
| Relational Units &     |              | Real-Time Inventory |
| Financial Audit Trails |              | State & Fast Lookup |
+------------------------+              +---------------------+`,
      features: [
        { title: "Interactive 3D Exploration", desc: "Lightweight, fluid 3D floor plan and building visualization engineered to run smoothly across both desktop and mobile viewports." },
        { title: "Real-Time Inventory State", desc: "State machine managing unit availability (Available, Reserved, Under Contract, Sold) with instant multi-user synchronization." },
        { title: "Dynamic Valuation Models", desc: "Algorithmic calculation of mortgage breakdowns, payment schedules, and localized property yield metrics." },
        { title: "Developer Analytics Dashboard", desc: "Executive metrics showing unit viewing heatmaps, conversion rates, and sales agent performance." }
      ],
      stack: ["Python FastAPI", "Next.js", "PostgreSQL", "Redis", "3D Visualization", "Tailored CSS", "Cloudflare"],
      decisions: "Selected Python FastAPI for the backend to ensure high asynchronous throughput while keeping serialization overhead minimal. Avoided heavy bloated 3D engines in favor of an optimized lightweight canvas implementation ensuring sub-second initial load on 4G mobile devices."
    },
    daamdekho: {
      title: "DaamDekho",
      category: "E-COMMERCE INTELLIGENCE · DATA PIPELINE",
      subtitle: "Intelligent Price Tracking, Historical Trends & Market Deal Analytics",
      liveUrl: "#contact",
      overview: "DaamDekho is an automated price intelligence and deal comparison engine that continuously monitors multi-retailer e-commerce platforms. It aggregates real-time product pricing, analyzes historical fluctuation trends, and triggers automated instant alerts when products reach all-time low price points.",
      problem: "Consumers and procurement teams waste hours manually checking competing platforms for true price discounts. E-commerce platforms frequently artificially inflate prices before discounting them, making genuine savings difficult to verify without comprehensive historical data.",
      approach: "Engineered an asynchronous distributed scraping and ingestion pipeline capable of scraping product pages, extracting unstructured pricing and stock data, normalizing the schema, and storing timestamped time-series records for analytical query execution.",
      architectureDiagram: `+-------------------------------------------------------------+
| USER CLIENT: Search & Comparison Portal (Next.js / SSR)     |
| Real-Time Search Bar · Price History Chart · Alert Setup    |
+------------------------------+------------------------------+
                               |
+------------------------------v------------------------------+
| BACKEND INGESTION PIPELINE: Python Async Workers + Celery   |
| Distributed Scrapers · Anti-Bot Bypasses · HTML Parsers     |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
+-----------v------------+              +---------v-----------+
| PostgreSQL Database    |              | Redis Queue & Cache |
| Time-Series Price      |              | Scraping Job Queues |
| Historical Records     |              | Sub-Second Lookups  |
+------------------------+              +---------------------+`,
      features: [
        { title: "Multi-Retailer Price Tracking", desc: "Continuously tracks identical product SKUs across major online merchants with automated currency normalization." },
        { title: "Time-Series Fluctuation Charts", desc: "Visual price history charts illustrating true historical low, average, and peak prices over 30, 90, and 365 days." },
        { title: "Algorithmic Deal Scoring", desc: "Automated ranking of discounts to identify genuine deals versus deceptive pre-sale price hikes." },
        { title: "Real-Time Price Drop Alerts", desc: "Event-driven webhook alerts triggering instant notifications via email and messaging channels." }
      ],
      stack: ["Python", "Next.js", "Redis", "PostgreSQL", "Celery", "BeautifulSoup / Scrapy", "Chart.js"],
      decisions: "Separated the public-facing read API from the background data scraping workers using Redis message queues. This ensured that high-volume scraping tasks never impacted the responsiveness of consumer searches."
    },
    "ai-hub": {
      title: "AI & Automation Hub",
      category: "AI AGENTS · LLM WORKFLOWS · AUTOMATION",
      subtitle: "Autonomous Enterprise Agents, Knowledge RAG & WhatsApp Automation",
      liveUrl: "#contact",
      overview: "A modular suite of enterprise AI agent workflows, proprietary document RAG systems, and two-way WhatsApp Cloud API automation bots engineered to eliminate manual human friction in sales qualification and client operations.",
      problem: "Modern enterprises want to leverage generative AI but struggle with hallucination risks, lack of structured database integration, and high response latency that frustrates end users.",
      approach: "Architected a deterministic execution framework where LLMs operate strictly through validated tool schemas. Combined dense vector embeddings with metadata filtering to ensure factual RAG responses, backed by official WhatsApp Cloud API webhooks.",
      architectureDiagram: `+-------------------------------------------------------------+
| CLIENT TOUCHPOINT: Official WhatsApp Business API / Webhooks |
| Interactive Buttons · List Menus · Media & Document Payloads |
+------------------------------+------------------------------+
                               | Webhook POST
+------------------------------v------------------------------+
| FASTAPI ORCHESTRATION LAYER: Signature Verification & Router |
| Session State Manager · Deduplication Cache                 |
+------------------------------+------------------------------+
                               |
+------------------------------v------------------------------+
| AGENTIC CORE: LangChain Multi-Step Tool Invoker             |
| Intent Classifier · Structured Tool Calling · Guardrails    |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
+-----------v------------+              +---------v-----------+
| ChromaDB / Vector Store|              | Enterprise Database |
| Proprietary Knowledge  |              | Lead CRM Updates &  |
| Grounded Document RAG  |              | Appointment Booking |
+------------------------+              +---------------------+`,
      features: [
        { title: "Autonomous Multi-Step Agents", desc: "Agents capable of planning sub-tasks, querying internal APIs, verifying answers, and executing workflows autonomously." },
        { title: "Grounded Enterprise RAG", desc: "Semantic search across internal PDFs, policies, and product documentation with verifiable attribution citations." },
        { title: "WhatsApp Cloud API Bot", desc: "High-throughput official WhatsApp messaging bot handling customer inquiries, lead qualification, and booking 24/7." },
        { title: "Strict Schema Guardrails", desc: "Guaranteed Pydantic JSON schema outputs eliminating malformed responses or model hallucinations." }
      ],
      stack: ["Python FastAPI", "LangChain", "Vector DBs", "ChromaDB", "WhatsApp Cloud API", "Docker", "AWS"],
      decisions: "Implemented asynchronous background job processing for all LLM calls to prevent WhatsApp webhook timeouts (which require a 200 OK within 3 seconds). Responses are dispatched asynchronously back via the WhatsApp Graph API."
    }
  };

  const csModal = q('#case-study-modal');
  const csBackdrop = q('#cs-backdrop');
  const csCloseBtn = q('#cs-close-btn');
  const csDynamicBody = q('#cs-dynamic-body');
  const csLiveCta = q('#cs-live-cta');
  const openCsBtns = qAll('.open-case-study-btn');

  const openCaseStudy = (projectId) => {
    const data = caseStudiesData[projectId];
    if (!data || !csModal || !csDynamicBody) return;

    if (csLiveCta) {
      csLiveCta.href = data.liveUrl;
      csLiveCta.style.display = data.liveUrl.startsWith('http') ? 'inline-block' : 'none';
    }

    csDynamicBody.innerHTML = `
      <section id="cs-overview" class="cs-section">
        <span class="cs-tag">${data.category}</span>
        <h2 id="cs-modal-title" class="cs-title">${data.title}</h2>
        <div class="cs-subtitle">${data.subtitle}</div>
        <p class="cs-p">${data.overview}</p>
      </section>

      <section id="cs-problem" class="cs-section">
        <span class="cs-tag">01 / THE PROBLEM</span>
        <h3 class="cs-title" style="font-size: 1.6rem;">Operational Bottleneck</h3>
        <p class="cs-p">${data.problem}</p>
        <span class="cs-tag" style="margin-top: 24px;">02 / THE APPROACH</span>
        <p class="cs-p">${data.approach}</p>
      </section>

      <section id="cs-architecture" class="cs-section">
        <span class="cs-tag">03 / SYSTEM ARCHITECTURE</span>
        <h3 class="cs-title" style="font-size: 1.6rem;">High-Concurrency Topology</h3>
        <div class="cs-diagram-box">${data.architectureDiagram}</div>
      </section>

      <section id="cs-features" class="cs-section">
        <span class="cs-tag">04 / KEY FEATURES</span>
        <h3 class="cs-title" style="font-size: 1.6rem;">Engineered Capabilities</h3>
        <div class="cs-feature-grid">
          ${data.features.map(f => `
            <div class="cs-feature-card">
              <b>${f.title}</b>
              <p>${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section id="cs-stack" class="cs-section">
        <span class="cs-tag">05 / TECHNOLOGY & DECISIONS</span>
        <h3 class="cs-title" style="font-size: 1.6rem;">Production Stack</h3>
        <div class="project-tech-tags" style="margin-bottom: 20px;">
          ${data.stack.map(s => `<span>${s}</span>`).join('')}
        </div>
        <p class="cs-p"><strong>Key Architectural Decision:</strong> ${data.decisions}</p>
      </section>
    `;

    csModal.classList.add('open');
    csModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    if (!csModal) return;
    csModal.classList.remove('open');
    csModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openCsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      openCaseStudy(proj);
    });
  });

  if (csCloseBtn) csCloseBtn.addEventListener('click', closeCaseStudy);
  if (csBackdrop) csBackdrop.addEventListener('click', closeCaseStudy);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudy();
      closeDrawer();
    }
  });

  // 10. Contact Form Interactive Feedback
  const contactForm = q('#portfolio-contact-form');
  const formFeedback = q('#form-feedback');
  const submitBtn = q('#form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = q('#form-name')?.value.trim();
      const email = q('#form-email')?.value.trim();
      const projectType = q('#form-project-type')?.value;
      const message = q('#form-message')?.value.trim();

      if (!name || !email) {
        if (formFeedback) {
          formFeedback.textContent = 'Please provide both your name and email address.';
          formFeedback.style.color = '#ef4444';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>DISPATCHING MESSAGE...</span>';
      }

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.innerHTML = `✓ Thank you, <strong>${name}</strong>. Your project inquiry regarding <em>${projectType.replace('_', ' ')}</em> has been prepared. Launching mail client...`;
          formFeedback.className = 'form-feedback success';
        }

        if (submitBtn) {
          submitBtn.innerHTML = '<span>MESSAGE SENT ✓</span>';
          submitBtn.style.background = '#10b981';
          submitBtn.style.borderColor = '#10b981';
        }

        // Trigger native mailto as a reliable fallback
        const mailtoUrl = `mailto:support@firewingtechnology.com?subject=Project%20Inquiry%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AProject%20Type:%20${encodeURIComponent(projectType)}%0AMessage:%0A${encodeURIComponent(message)}`;
        window.location.href = mailtoUrl;

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>START A CONVERSATION →</span>';
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
          }
        }, 6000);
      }, 700);
    });
  }

  // 11. Active Navigation Anchor Tracking
  const navLinks = qAll('#main-nav .nav-link');
  const trackedSections = qAll('section[id]');

  window.addEventListener('scroll', () => {
    let activeId = '';
    const scrollPos = window.scrollY + 180;

    trackedSections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
});
