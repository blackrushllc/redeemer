(function() {
  const scripts = document.getElementsByTagName('script');
  const thisScript = document.currentScript || scripts[scripts.length - 1];

  const baseUrl = (function() {
    try {
      const url = new URL(thisScript.src, window.location.href);
      return (url.origin === 'null') ? 'https://syndorela.com' : url.origin;
    } catch (e) {
      return 'https://syndorela.com';
    }
  })();

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        font-family: inherit;
        color: inherit;
        --accent: var(--primary, #3b82f6);
        --border-color: var(--border, rgba(128, 128, 128, 0.2));
        --muted: var(--muted-foreground, rgba(128, 128, 128, 0.7));
        --bg-col: var(--secondary, rgba(128, 128, 128, 0.03));
      }
      @font-face {
        font-family: 'SyndorelaSans';
        src: local('-apple-system'), local('BlinkMacSystemFont'), local('Segoe UI'), local('Roboto'), local('Helvetica Neue'), local('Arial');
      }
      .banner {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
        font-family: 'SyndorelaSans', sans-serif;
      }
      @media (min-width: 1024px) {
        .banner {
          grid-template-columns: 1fr 1.5fr 1fr;
        }
      }
      .column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .column-side {
        display: none;
      }
      @media (min-width: 1024px) {
        .column-side {
          display: flex;
        }
      }
      .header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .avatar {
        width: 80px;
        height: 120px;
        border-radius: 12px;
        object-fit: cover;
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        border: 1px solid var(--border-color);
      }
      .header-text {
        display: flex;
        flex-direction: column;
      }
      .title {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0;
        line-height: 1.1;
      }
      .subtitle {
        font-size: 0.875rem;
        font-style: italic;
        color: var(--muted);
        margin: 0.125rem 0 0.5rem 0;
      }
      .lead-text {
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0;
      }
      .item-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .item {
        font-size: 0.875rem;
        line-height: 1.4;
      }
      .item-title {
        font-weight: 700;
        color: var(--accent);
      }
      .item-desc {
        color: var(--muted);
        display: block;
      }
      .middle .item {
        padding: 0.75rem;
        border-radius: 8px;
        background: var(--bg-col);
        transition: all 0.2s ease;
        text-decoration: none;
        color: inherit;
        border: 1px solid transparent;
      }
      .middle .item:hover {
        background: rgba(59, 130, 246, 0.05);
        border-color: var(--accent);
        transform: translateY(-1px);
      }
      .middle .item-title {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.125rem;
      }
      .middle .item-desc {
        font-size: 0.8rem;
      }
      .footer-note {
        grid-column: 1 / -1;
        text-align: center;
        font-size: 0.75rem;
        color: var(--muted);
        margin-top: 1rem;
      }
      .banner-heading {
        grid-column: 1 / -1;
        text-align: center;
        font-size: 1.75rem;
        font-weight: 800;
        margin: 0 0 2rem 0;
        letter-spacing: -0.025em;
        line-height: 1.2;
      }
    </style>
    <div class="banner">
      <h1 class="banner-heading">This Website is Part of the Syndorela Ecosystem</h1>
      <!-- Left Column: Legendary Code -->
      <div class="column column-side left">
        <div class="header">
          <img src="${baseUrl}/artwork/syndorelas-basilisk.png" class="avatar" alt="Legendary Code Icon">
          <div class="header-text">
            <h2 class="title">Legendary Code</h2>
            <p class="subtitle">Import Legacy Software</p>
            <p class="lead-text">Classic stacks. Real businesses. Decades of value.</p>
          </div>
        </div>
        <div class="item-list">
          <div class="item">
            <span class="item-title">LAMP / Classic PHP</span>
            <span class="item-desc">Server-rendered business apps, admin tools, and long-lived web systems.</span>
          </div>
          <div class="item">
            <span class="item-title">jQuery / Bootstrap Sites</span>
            <span class="item-desc">Practical interfaces built before modern front-end fashion took over.</span>
          </div>
          <div class="item">
            <span class="item-title">Laravel Applications</span>
            <span class="item-desc">Large PHP platforms with real workflow complexity and years of business logic.</span>
          </div>
          <div class="item">
            <span class="item-title">WordPress Ecosystems</span>
            <span class="item-desc">Content-heavy sites, plugins, themes, and bespoke operational tooling.</span>
          </div>
          <div class="item">
            <span class="item-title">Classic ASP / .NET</span>
            <span class="item-desc">Older Microsoft web systems still powering internal and customer-facing workflows.</span>
          </div>
          <div class="item">
            <span class="item-title">Java Business Systems</span>
            <span class="item-desc">Enterprise apps, portals, and service layers built for stability first.</span>
          </div>
          <div class="item">
            <span class="item-title">Desktop Line-of-Business Tools</span>
            <span class="item-desc">Utility apps, internal dashboards, and operational software that still matters.</span>
          </div>
          <div class="item">
            <span class="item-title">Hand-Built Legacy Platforms</span>
            <span class="item-desc">One-off custom systems nobody wants to lose, yet nobody wants to maintain forever.</span>
          </div>
        </div>
      </div>

      <!-- Middle Column: Syndorela’s Kingdom -->
      <div class="column middle">
        <div class="header">
          <img src="${baseUrl}/artwork/syndorela-toon.png" class="avatar" alt="Syndorela Kingdom Icon">
          <div class="header-text">
            <h2 class="title">Syndorela’s Kingdom</h2>
            <p class="subtitle">Analyse and Refactor Intermediate Code</p>
            <p class="lead-text">A transformation ecosystem for understanding, reshaping, and re-expressing software.</p>
          </div>
        </div>
        <div class="item-list">
           <a href="https://syndorela.com" target="_blank" class="item">
            <span class="item-title">Syndorela.com</span>
            <span class="item-desc">This is the primary resource website for the workflow, debugger, inspector, and command center for the ecosystem.
            <br>
            <br>
            Import, Analyse, Transdform, Debug and Build legacy software into modern software.
            </span>
          </a>
          <a href="https://basilbasic.com" target="_blank" class="item">
            <span class="item-title">Basilica</span>
            <span class="item-desc">A portable GUI windowing system for Desktop Applications.</span>
          </a>
          <a href="https://iobasic.com" target="_blank" class="item">
            <span class="item-title">UIBASIC</span>
            <span class="item-desc">Browser-based development environment and web-facing application platform.</span>
          </a>
          <a href="https://iobasic.com" target="_blank" class="item">
            <span class="item-title">IOBASIC</span>
            <span class="item-desc">ORM, persistence, and data-access layer for structured application logic.</span>
          </a>
          <a href="https://yobasic.com" target="_blank" class="item">
            <span class="item-title">YoBASIC</span>
            <span class="item-desc">Guided learning system, sandbox, simulator, and tutorial-driven BASIC environment.</span>
          </a>
          <a href="https://basilbasic.com" target="_blank" class="item">
            <span class="item-title">BLOOM</span>
            <span class="item-desc">Reactive UI system and drop-in alternative to React, Angular, Vue, jQuery, and Bootstrap-style stacks.</span>
          </a>
          <a href="https://basilbasic.com" target="_blank" class="item">
            <span class="item-title">BASIC</span>
            <span class="item-desc">Editable pseudo-project representation designed for clarity, review, and transformation.</span>
          </a>
          <a href="https://basilbasic.com" target="_blank" class="item">
            <span class="item-title">BASIL</span>
            <span class="item-desc">Executable intermediate application layer used to run, inspect, and refine shadow apps.</span>
          </a>
          <a href="https://sirhub.org" target="_blank" class="item">
            <span class="item-title">SIRHUB</span>
            <span class="item-desc">Repository and project backbone for working code, artifacts, and generated systems.</span>
          </a>
          <a href="https://net-dos.com" target="_blank" class="item">
            <span class="item-title">NET-DOS</span>
            <span class="item-desc">Virtual operating environment for networked tools, utilities, and experimental workflows.</span>
          </a>
          <a href="https://basilsql.com" target="_blank" class="item">
            <span class="item-title">BASILSQL</span>
            <span class="item-desc">AI-assisted database client and query workspace for data exploration and application support.</span>
          </a>
          <a href="https://basrun.com" target="_blank" class="item">
            <span class="item-title">BASRUN</span>
            <span class="item-desc">Cloud services ecosystem for hosting, execution, automation, and deployment workflows.</span>
          </a>
        </div>
      </div>

      <!-- Right Column: Build Targets -->
      <div class="column column-side right">
        <div class="header">
          <img src="${baseUrl}/artwork/syndorelas-castle.png" class="avatar" alt="Build Targets Icon">
          <div class="header-text">
            <h2 class="title">Build Targets</h2>
            <p class="subtitle">Export to Today’s Major Tech Stacks</p>
            <p class="lead-text">Move into production-ready systems built for the stacks teams use now.</p>
          </div>
        </div>
        <div class="item-list">
          <div class="item">
            <span class="item-title">.NET / ASP.NET Core</span>
            <span class="item-desc">Export modern Microsoft-ready applications for enterprise and internal platforms.</span>
          </div>
          <div class="item">
            <span class="item-title">Java / Spring</span>
            <span class="item-desc">Target durable JVM-based systems for large-scale business software.</span>
          </div>
          <div class="item">
            <span class="item-title">Python / Django</span>
            <span class="item-desc">Generate structured web applications in one of today’s most familiar frameworks.</span>
          </div>
          <div class="item">
            <span class="item-title">Python / FastAPI</span>
            <span class="item-desc">Output clean service layers and modern API-first back ends.</span>
          </div>
          <div class="item">
            <span class="item-title">PHP / Laravel</span>
            <span class="item-desc">Re-express systems into contemporary PHP architecture without abandoning the ecosystem.</span>
          </div>
          <div class="item">
            <span class="item-title">LAMP / Classic PHP</span>
            <span class="item-desc">Preserve the deployment model people know while dramatically improving the codebase.</span>
          </div>
          <div class="item">
            <span class="item-title">Node.js / Express</span>
            <span class="item-desc">Export lightweight JavaScript back ends for flexible service-oriented projects.</span>
          </div>
          <div class="item">
            <span class="item-title">Node.js / NestJS</span>
            <span class="item-desc">Target structured TypeScript applications for teams that want modern conventions.</span>
          </div>
          <div class="item">
            <span class="item-title">Ruby on Rails</span>
            <span class="item-desc">Produce convention-driven web applications with fast development ergonomics.</span>
          </div>
          <div class="item">
            <span class="item-title">Go</span>
            <span class="item-desc">Export lean compiled services for speed, portability, and operational simplicity.</span>
          </div>
          <div class="item">
            <span class="item-title">Rust</span>
            <span class="item-desc">Target high-performance native back ends where control, safety, and efficiency matter.</span>
          </div>
          <div class="item">
            <span class="item-title">Static HTML / HTMX / JS</span>
            <span class="item-desc">Publish lightweight web front ends without dragging in a giant framework.</span>
          </div>
        </div>
      </div>

      <div class="footer-note">
        Powered by Blackrush LLC
      </div>
    </div>
  `;

  class SyndorelaBanner extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      // Check for notice options as attributes
      const topNotice = this.getAttribute('top-notice') || this.getAttribute('top_notice');
      const noticeDuration = this.getAttribute('notice-duration') || this.getAttribute('notice_duration');
      
      if (topNotice === '1' || topNotice === 'true') {
        const duration = noticeDuration !== null ? parseInt(noticeDuration, 10) : 10;
        showTopNotice(duration, this);
      }
    }
  }

  if (!customElements.get('syndorela-banner')) {
    customElements.define('syndorela-banner', SyndorelaBanner);
  }

  // Notice Management
  let noticeElement = null;
  let noticeTimeout = null;

  function showTopNotice(duration, bannerInstance) {
    if (noticeElement) return; // Only one notice at a time

    // Create style if not exists
    if (!document.getElementById('syndorela-notice-styles')) {
      const style = document.createElement('style');
      style.id = 'syndorela-notice-styles';
      style.textContent = `
        .syndorela-notice-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          transform: translateY(-100%);
          background: #1e293b;
          color: #f8fafc;
          z-index: 2147483647;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          line-height: 1.5;
          font-size: 14px;
        }
        .syndorela-notice-bar.active {
          transform: translateY(0);
        }
        .syndorela-notice-bar a {
          color: #60a5fa;
          text-decoration: underline;
          font-weight: 600;
          cursor: pointer;
        }
        .syndorela-notice-bar a:hover {
          color: #93c5fd;
        }
      `;
      document.head.appendChild(style);
    }

    noticeElement = document.createElement('div');
    noticeElement.className = 'syndorela-notice-bar';
    noticeElement.innerHTML = `
      <span>
        This website is part of the <a href="https://syndorela.com" target="_blank">Syndorela Eco-System</a> 
        Scroll down for more information or <a class="syndorela-scroll-link">Click Here</a>.
      </span>
    `;

    document.body.appendChild(noticeElement);

    // Scroll link logic
    const scrollLink = noticeElement.querySelector('.syndorela-scroll-link');
    scrollLink.onclick = (e) => {
      e.preventDefault();
      if (bannerInstance) {
        bannerInstance.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const firstBanner = document.querySelector('syndorela-banner');
        if (firstBanner) {
          firstBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    // Animate down
    setTimeout(() => {
      noticeElement.classList.add('active');
    }, 100);

    // Auto close
    if (duration > 0) {
      noticeTimeout = setTimeout(() => {
        closeTopNotice();
      }, duration * 1000);
    }
  }

  function closeTopNotice() {
    if (noticeElement) {
      noticeElement.classList.remove('active');
      setTimeout(() => {
        if (noticeElement && noticeElement.parentNode) {
          noticeElement.parentNode.removeChild(noticeElement);
        }
        noticeElement = null;
      }, 600);
    }
  }

  // Parse parameters from script URL
  const getScriptParams = () => {
    if (!thisScript || !thisScript.src) return {};
    
    try {
      const url = new URL(thisScript.src);
      return Object.fromEntries(url.searchParams.entries());
    } catch (e) {
      // Fallback for older browsers or relative URLs
      const params = {};
      const match = thisScript.src.match(/\?(.*)$/);
      if (match) {
        match[1].split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) params[key] = decodeURIComponent(value || '');
        });
      }
      return params;
    }
  };

  const params = getScriptParams();
  if (params.top_notice === '1' || params.top_notice === 'true') {
    const duration = params.notice_duration !== undefined ? parseInt(params.notice_duration, 10) : 10;
    // Delay slightly to ensure body exists if script is in head
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => showTopNotice(duration));
    } else {
      setTimeout(() => showTopNotice(duration), 100);
    }
  }

  // Auto-injection: If this script is included directly without any <syndorela-banner> 
  // tags on the page, we find the script tag and place the banner right after it.
  const doAutoInjection = () => {
    if (thisScript && (thisScript.src.includes('syndorela-banner.js') || thisScript.getAttribute('data-syndorela'))) {
      // Check if the user already placed the tag
      if (!document.querySelector('syndorela-banner')) {
        const banner = document.createElement('syndorela-banner');
        // Pass the top_notice params to the element if present in script URL
        if (params.top_notice === '1' || params.top_notice === 'true') {
          banner.setAttribute('top-notice', '1');
          if (params.notice_duration !== undefined) {
            banner.setAttribute('notice-duration', params.notice_duration);
          }
        }
        
        if (thisScript.parentNode && thisScript.parentNode.tagName !== 'HEAD') {
          thisScript.parentNode.insertBefore(banner, thisScript.nextSibling);
        } else {
          document.body.appendChild(banner);
        }
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doAutoInjection);
  } else {
    doAutoInjection();
  }
})();
