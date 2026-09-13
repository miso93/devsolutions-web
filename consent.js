const GA_MEASUREMENT_ID = ''; // TODO: doplniť napr. 'G-XXXXXXXXXX' po založení Google Analytics
const CONSENT_KEY = 'cookie-consent';

function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  window.gtag = gtag;
}

function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

function setConsent(analytics) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, timestamp: Date.now() }));
}

function showBanner() {
  if (document.getElementById('cookieBanner')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Súhlas s cookies');
  banner.innerHTML = `
    <p>Používame cookies na analýzu návštevnosti. Viac v <a href="ochrana-osobnych-udajov.html">zásadách ochrany osobných údajov</a>.</p>
    <div class="cookie-banner-actions">
      <button type="button" id="cookieReject" class="btn-cookie-secondary">Odmietnuť</button>
      <button type="button" id="cookieAccept" class="btn-cookie-primary">Prijať</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookieAccept').addEventListener('click', () => {
    setConsent(true);
    banner.remove();
    loadGoogleAnalytics();
  });

  document.getElementById('cookieReject').addEventListener('click', () => {
    setConsent(false);
    banner.remove();
  });
}

document.querySelectorAll('.cookie-settings-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showBanner();
  });
});

const existingConsent = getConsent();
if (existingConsent === null) {
  showBanner();
} else if (existingConsent.analytics) {
  loadGoogleAnalytics();
}
