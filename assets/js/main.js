
const $ = (id) => document.getElementById(id);
const LANGUAGE_CONFIG = {
  en: { nativeName: 'English', locale: 'en-AU', dir: 'ltr' },
  fa: { nativeName: 'دری', locale: 'fa-AF', dir: 'rtl' },
  es: { nativeName: 'Español', locale: 'es-ES', dir: 'ltr' },
  zh: { nativeName: '中文（简体）', locale: 'zh-Hans-CN', dir: 'ltr' },
  ur: { nativeName: 'اردو', locale: 'ur-PK', dir: 'rtl' },
  ar: { nativeName: 'العربية', locale: 'ar', dir: 'rtl' },
  vi: { nativeName: 'Tiếng Việt', locale: 'vi-VN', dir: 'ltr' }
};
const SUPPORTED_LANGS = Object.keys(LANGUAGE_CONFIG);
const params = new URLSearchParams(window.location.search);
const urlLang = params.get('lang');
let currentLang = SUPPORTED_LANGS.includes(urlLang)
  ? urlLang
  : (SUPPORTED_LANGS.includes(localStorage.getItem('mortgagePlannerLanguage')) ? localStorage.getItem('mortgagePlannerLanguage') : 'en');
let I18N = { en: {} };
let localeMeta = { en: { ...LANGUAGE_CONFIG.en } };

function normalizeLocalePayload(lang, payload) {
  if (!payload || typeof payload !== 'object' || !payload.messages) {
    throw new Error(`Invalid locale payload for ${lang}`);
  }
  localeMeta[lang] = { ...LANGUAGE_CONFIG[lang], ...(payload.meta || {}) };
  I18N[lang] = payload.messages;
}

async function loadLocale(lang) {
  const response = await fetch(`assets/i18n/${lang}.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Could not load locale: ${lang}`);
  normalizeLocalePayload(lang, await response.json());
}

async function ensureLocale(lang) {
  if (!I18N.en || Object.keys(I18N.en).length === 0) await loadLocale('en');
  if (lang !== 'en' && (!I18N[lang] || Object.keys(I18N[lang]).length === 0)) {
    try {
      await loadLocale(lang);
    } catch (error) {
      console.warn(error);
      currentLang = 'en';
    }
  }
}


function t(key, vars = {}) {
  let value = I18N[currentLang]?.[key] ?? I18N.en?.[key] ?? key;
  if (typeof value !== 'string') return value;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

function isRTL() {
  return (localeMeta[currentLang]?.dir || LANGUAGE_CONFIG[currentLang]?.dir) === 'rtl';
}

function localeCode() {
  return localeMeta[currentLang]?.locale || LANGUAGE_CONFIG[currentLang]?.locale || 'en-AU';
}

function updateHreflangLinks() {
  const baseUrl = new URL(window.location.href);
  baseUrl.searchParams.delete('lang');
  const base = `${baseUrl.origin}${baseUrl.pathname}`;
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
    const hreflang = link.getAttribute('hreflang');
    const lang = hreflang === 'x-default'
      ? 'en'
      : Object.entries(LANGUAGE_CONFIG).find(([, config]) => config.locale.toLowerCase() === hreflang.toLowerCase() || config.locale.toLowerCase().startsWith(hreflang.toLowerCase()))?.[0];
    if (lang) link.href = `${base}?lang=${lang}`;
  });
}

function localNumber(value) {
  return new Intl.NumberFormat(localeCode(), { maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function setPlaceholder(id, value) {
  const el = $(id);
  if (el) el.placeholder = value;
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

const fmt = (n, d = 0) =>
  new Intl.NumberFormat(localeCode(), {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: d,
    minimumFractionDigits: d
  }).format(Number.isFinite(n) ? n : 0);

const monthFmt = () => new Intl.DateTimeFormat(localeCode(), { month: 'short', year: 'numeric' });

function setStaticText() {
  document.documentElement.lang = localeCode();
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRTL());
  document.title = t('docTitle');
  updateHreflangLinks();

  const langSelect = $('languageSelect');
  if (langSelect) langSelect.value = currentLang;

  setHTML('.header .brand-text', t('brand'));
  setText('headerDonationText', t('headerDonationText'));
  setText('navHome', t('navHome'));
  setText('navAbout', t('navAbout'));
  setText('navCalculator', t('navCalculator'));
  setText('navGuide', t('navGuide'));
  setText('navFaq', t('navFaq'));
  setText('navContact', t('navContact'));
  setHTML('.hero h1', t('heroTitle'));
  setHTML('.lead', t('heroLead'));
  const ctaPrimaryLabel = document.querySelector('#ctaPrimary span');
  const ctaSecondaryLabel = document.querySelector('#ctaSecondary span');
  if (ctaPrimaryLabel) ctaPrimaryLabel.textContent = t('ctaPrimary');
  if (ctaSecondaryLabel) ctaSecondaryLabel.textContent = t('ctaSecondary');

  const benefits = document.querySelectorAll('.benefit strong');
  [t('benefit1'), t('benefit2'), t('benefit3')].forEach((txt, i) => { if (benefits[i]) benefits[i].innerHTML = txt; });

  const statLabels = document.querySelectorAll('.stats-band .stat small');
  [t('statLoan'), t('statRate'), t('statTerm'), t('statFrequency'), t('statPayment')].forEach((txt, i) => {
    if (statLabels[i]) statLabels[i].textContent = txt;
  });

  const panels = document.querySelectorAll('.panel');
  if (panels[0]) {
    panels[0].querySelector('h2').textContent = t('calcTitle');
    panels[0].querySelector('.panel-sub').textContent = t('calcSub');
  }
  if (panels[1]) {
    panels[1].querySelector('h2').textContent = t('strategiesTitle');
    panels[1].querySelector('.panel-sub').textContent = t('strategiesSub');
  }

  const fields = document.querySelectorAll('.panel:first-child .field label');
  [t('loanStartDate'), t('currentLoanBalance'), t('interestRate'), t('amortizationPeriod'), t('repaymentFrequency')].forEach((txt, i) => {
    if (fields[i]) fields[i].textContent = txt;
  });

  const hint = document.querySelector('.field-hint');
  if (hint) hint.textContent = t('dateHint');

  setPlaceholder('startDate', t('datePlaceholder'));
  setPlaceholder('loanAmount', t('amountPlaceholder'));
  setPlaceholder('interestRate', t('ratePlaceholder'));
  setPlaceholder('offsetAmount', t('amountPlaceholder'));
  setPlaceholder('offsetGrowth', t('amountPlaceholder'));
  setPlaceholder('extraAmount', t('amountPlaceholder'));
  setPlaceholder('lumpSum', t('amountPlaceholder'));

  document.querySelectorAll('#loanTerm option').forEach(opt => opt.textContent = localNumber(opt.value) + ' ' + t('years'));
  document.querySelectorAll('#repaymentFrequency option, #offsetFrequency option, #extraFrequency option').forEach(opt => {
    opt.textContent = t(opt.value);
  });

  const strategies = document.querySelectorAll('.strategy');
  if (strategies[0]) {
    strategies[0].querySelector('h3').textContent = t('offsetTitle');
    strategies[0].querySelector('p').textContent = t('offsetDesc');
    strategies[0].querySelector('.use-check').lastChild.textContent = t('use');
    const labels = strategies[0].querySelectorAll('.field label');
    [t('currentOffset'), t('growOffsetBy'), t('growFrequency')].forEach((txt, i) => { if (labels[i]) labels[i].textContent = txt; });
  }
  if (strategies[1]) {
    strategies[1].querySelector('h3').textContent = t('extraTitle');
    strategies[1].querySelector('p').textContent = t('extraDesc');
    strategies[1].querySelector('.use-check').lastChild.textContent = t('use');
    const labels = strategies[1].querySelectorAll('.field label');
    [t('extraAmount'), t('howOften')].forEach((txt, i) => { if (labels[i]) labels[i].textContent = txt; });
  }
  if (strategies[2]) {
    strategies[2].querySelector('h3').textContent = t('lumpTitle');
    strategies[2].querySelector('p').textContent = t('lumpDesc');
    strategies[2].querySelector('.use-check').lastChild.textContent = t('use');
    const label = strategies[2].querySelector('.field label');
    if (label) label.textContent = t('lumpAmount');
  }

  const inputLabels = {
    startDate: t('loanStartDate'),
    loanAmount: t('currentLoanBalance'),
    interestRate: t('interestRate'),
    loanTerm: t('amortizationPeriod'),
    repaymentFrequency: t('repaymentFrequency'),
    offsetAmount: t('currentOffset'),
    offsetGrowth: t('growOffsetBy'),
    offsetFrequency: t('growFrequency'),
    extraAmount: t('extraAmount'),
    extraFrequency: t('howOften'),
    lumpSum: t('lumpAmount')
  };
  Object.entries(inputLabels).forEach(([id, label]) => {
    const el = $(id);
    if (el) {
      el.setAttribute('aria-label', label);
      el.setAttribute('title', label);
    }
  });

  const sec = document.querySelector('.section-title-row');
  if (sec) {
    sec.querySelector('h2').textContent = t('interestComparison');
    sec.querySelector('p').textContent = t('interestComparisonSub');
    sec.querySelector('.badge-soft').textContent = t('clearComparison');
  }

  const note = document.querySelector('.comparison-note');
  if (note) {
    note.querySelector('small').textContent = t('noStrategyBaseline');
    note.querySelector('p').textContent = t('baselineDesc');
  }

  const cards = document.querySelectorAll('.compare-card');
  const cardData = [
    [t('offsetOnly'), t('offsetOnlyDesc'), t('offsetCardP')],
    [t('extraOnly'), t('extraOnlyDesc'), t('extraCardP')],
    [t('lumpOnly'), t('lumpOnlyDesc'), t('lumpCardP')]
  ];
  cards.forEach((card, i) => {
    const titleSpan = card.querySelector('.compare-title span');
    const em = card.querySelector('.compare-title em');
    const p = card.querySelector(':scope > p');
    if (titleSpan) {
      const dot = titleSpan.querySelector('.dot');
      titleSpan.innerHTML = '';
      if (dot) titleSpan.appendChild(dot);
      titleSpan.appendChild(document.createTextNode(cardData[i][0]));
    }
    if (em) em.textContent = cardData[i][1];
    const rows = card.querySelectorAll('.result-row small');
    if (rows[0]) rows[0].textContent = t('interestPay');
    if (rows[1]) rows[1].textContent = t('interestSave');
    if (p) p.textContent = cardData[i][2];
  });

  const comboSmall = document.querySelectorAll('.combo-result small');
  [t('interestPayShort'), t('interestSave'), t('payoffTime'), t('newPayoffDate')].forEach((txt, i) => {
    if (comboSmall[i]) comboSmall[i].textContent = txt;
  });
  const comboPill = document.querySelector('.combo-pill');
  if (comboPill) comboPill.textContent = t('liveCombined');

  const chartTitle = document.querySelector('.chart-top h3');
  if (chartTitle) chartTitle.textContent = t('chartTitle');
  const legends = document.querySelectorAll('.legend span');
  [t('legendNoStrategy'), t('legendOffsetOnly'), t('legendAllSelected')].forEach((txt, i) => {
    if (legends[i]) {
      const dot = legends[i].querySelector('.dot');
      legends[i].innerHTML = '';
      if (dot) legends[i].appendChild(dot);
      legends[i].appendChild(document.createTextNode(txt));
    }
  });

  const payoffSmall = document.querySelectorAll('.payoff-cell small');
  [t('payoffNoStrategy'), t('payoffOffsetOnly'), t('payoffAllSelected'), t('timeSaved')].forEach((txt, i) => {
    if (payoffSmall[i]) payoffSmall[i].textContent = txt;
  });


  setText('monthlyTitle', t('monthlyBreakdownTitle'));
  setText('monthlySub', t('monthlyBreakdownSub'));
  setText('monthlyBadge', t('monthlyBreakdownBadge'));
  setText('monthlyRepaymentLabel', t('monthlyRepaymentAfter'));
  setText('monthlyRepaymentHint', t('monthlyRepaymentHint'));
  setText('monthlyInterestLabel', t('monthlyInterestPart'));
  setText('monthlyInterestHint', t('monthlyInterestHint'));
  setText('monthlyPrincipalLabel', t('monthlyPrincipalPart'));
  setText('monthlyPrincipalHint', t('monthlyPrincipalHint'));
  setText('monthlySavedLabel', t('monthlyInterestSaved'));
  setText('monthlySavedHint', t('monthlySavedHint'));


  setText('donateStep1Title', t('donateStep1Title'));
  setText('donateStep1Sub', t('donateStep1Sub'));
  setText('donateSecure', t('donateSecure'));
  setText('donateStep2Title', t('donateStep2Title'));
  setText('donateStep2Sub', t('donateStep2Sub'));
  setText('donateBankTitle', t('donateBankTitle'));
  setText('donateBankSub', t('donateBankSub'));
  setText('donateAccountNameLabel', t('donateAccountNameLabel'));
  setText('donateBsbLabel', t('donateBsbLabel'));
  setText('donateAccountNumberLabel', t('donateAccountNumberLabel'));
  setText('donateStep3Title', t('donateStep3Title'));
  setText('donateStep3Sub', t('donateStep3Sub'));
  setText('donateAmountLabel', t('donateAmountLabel'));
  setText('donateTotalLabel', t('donateTotalLabel'));

  setText('donateMethodSummaryLabel', t('donateMethodSummaryLabel'));


  setText('donatePayIdTitle', t('donatePayIdTitle'));
  setText('donatePayIdSub', t('donatePayIdSub'));
  setText('donateApplePayTitle', t('donateApplePayTitle'));
  setText('donateApplePaySub', t('donateApplePaySub'));
  setText('donateCreditCardTitle', t('donateCreditCardTitle'));
  setText('donateCreditCardSub', t('donateCreditCardSub'));
  setText('donatePaypalTitle', t('donatePaypalTitle'));
  setText('donatePaypalSub', t('donatePaypalSub'));
  setText('donateApplePayInfo', t('donateApplePayInfo'));
  setText('donateCreditCardInfo', t('donateCreditCardInfo'));
  setText('donatePaypalInfo', t('donatePaypalInfo'));


  setText('donateMethodLabel', t('donateMethodLabel'));
  localizeDonationMethodOptions();

  setText('copyDonationDetails', t('donateCopyButton'));
  setText('donateNote', t('donateNote'));

  const footerTitle = document.querySelector('.footer-title');
  const footerTagline = document.querySelector('.footer-tagline');
  if (footerTitle) footerTitle.textContent = t('brand');
  if (footerTagline) footerTagline.textContent = t('footerLine');
  const footerGroups = document.querySelectorAll('.footer-links > div');
  if (footerGroups[0]) {
    footerGroups[0].querySelector('h4').textContent = t('product');
    const a = footerGroups[0].querySelectorAll('a');
    if (a[0]) a[0].textContent = t('calculator');
    if (a[1]) a[1].textContent = t('strategiesTitle');
    if (a[2]) a[2].textContent = t('savedPlans');
  }
  if (footerGroups[1]) {
    footerGroups[1].querySelector('h4').textContent = t('resources');
    const a = footerGroups[1].querySelectorAll('a');
    if (a[0]) a[0].textContent = t('guides');
    if (a[1]) a[1].textContent = t('faqs');
    if (a[2]) a[2].textContent = t('glossary');
  }
  if (footerGroups[2]) {
    footerGroups[2].querySelector('h4').textContent = t('company');
    const a = footerGroups[2].querySelectorAll('a');
    if (a[0]) a[0].textContent = t('aboutUs');
    if (a[1]) a[1].textContent = t('contact');
    if (a[2]) a[2].textContent = t('privacy');
  }
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function monthsText(months) {
  months = Math.max(0, Math.round(months || 0));
  const y = Math.floor(months / 12);
  const r = months % 12;
  const yearWord = y === 1 ? t('yearSingular') : t('yearPlural');
  const monthWord = r === 1 ? t('monthSingular') : t('monthPlural');
  if (!y) return localNumber(r) + ' ' + monthWord;
  if (!r) return localNumber(y) + ' ' + yearWord;
  return localNumber(y) + ' ' + yearWord + ' ' + localNumber(r) + ' ' + monthWord;
}

function addMonths(date, months) {
  const base = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() + Math.round(months || 0));
  return d;
}

function periodsPerYear(frequency) {
  if (frequency === 'weekly') return 52;
  if (frequency === 'fortnightly') return 26;
  return 12;
}

function frequencyLabel(frequency) { return t(frequency); }

function parseStartDate(value) {
  if (!value) return new Date();
  const date = new Date(value + 'T00:00:00');
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function monthsBetween(startDate, endDate) {
  const a = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const b = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) months--;
  return Math.max(0, months);
}

function remainingYearsFromLoanStart(startDate, amortizationYears) {
  const totalMonths = Math.max(1, Math.round((amortizationYears || 30) * 12));
  const elapsedMonths = monthsBetween(startDate, new Date());
  const remainingMonths = clamp(totalMonths - elapsedMonths, 1, totalMonths);
  return remainingMonths / 12;
}

function repaymentAmount(balance, annualRate, years, frequency = 'monthly') {
  const ppy = periodsPerYear(frequency);
  const periods = Math.max(1, Math.round((years || 0) * ppy));
  const ratePerPeriod = (annualRate || 0) / 100 / ppy;
  if (!balance || balance <= 0) return 0;
  if (ratePerPeriod === 0) return balance / periods;
  return balance * ratePerPeriod / (1 - Math.pow(1 + ratePerPeriod, -periods));
}

function periodicAmount(amount, frequency, targetPeriodsPerYear) {
  if (!amount || amount <= 0) return 0;
  let sourcePeriodsPerYear = 12;
  if (frequency === 'weekly') sourcePeriodsPerYear = 52;
  else if (frequency === 'fortnightly') sourcePeriodsPerYear = 26;
  else if (frequency === 'yearly') sourcePeriodsPerYear = 1;
  return amount * sourcePeriodsPerYear / targetPeriodsPerYear;
}

function getData() {
  const startDate = parseStartDate($('startDate')?.value);
  const amortizationYears = +($('loanTerm')?.value || 30);
  const remainingYears = remainingYearsFromLoanStart(startDate, amortizationYears);
  return {
    principal: +($('loanAmount')?.value || 0),
    rate: +($('interestRate')?.value || 0),
    amortizationYears,
    years: remainingYears,
    repaymentFrequency: $('repaymentFrequency')?.value || 'monthly',
    start: startDate,
    projectionStart: new Date(),
    useOffset: !!$('useOffset')?.checked,
    offset: +($('offsetAmount')?.value || 0),
    offsetGrowth: +($('offsetGrowth')?.value || 0),
    offsetFrequency: $('offsetFrequency')?.value || 'monthly',
    useExtra: !!$('useExtra')?.checked,
    extra: +($('extraAmount')?.value || 0),
    extraFrequency: $('extraFrequency')?.value || 'monthly',
    useLump: !!$('useLump')?.checked,
    lump: +($('lumpSum')?.value || 0)
  };
}

function simulate({ principal, rate, years, repaymentFrequency = 'monthly', offset = 0, offsetGrowth = 0, offsetFrequency = 'monthly', extra = 0, extraFrequency = 'monthly', lump = 0, useOffset = true, useExtra = true, useLump = true }) {
  const ppy = periodsPerYear(repaymentFrequency);
  const ratePerPeriod = (rate || 0) / 100 / ppy;
  const standardPayment = repaymentAmount(principal, rate, years, repaymentFrequency);
  const extraPayment = useExtra ? periodicAmount(extra, extraFrequency, ppy) : 0;
  const offsetGrowthPerPeriod = useOffset ? periodicAmount(offsetGrowth, offsetFrequency, ppy) : 0;
  let balance = Math.max(0, principal || 0);
  let offsetBalance = useOffset ? Math.max(0, offset || 0) : 0;
  let totalInterest = 0;
  let period = 0;
  let lumpApplied = false;
  const points = [{ month: 0, balance }];
  const safetyLimit = Math.max(600, Math.round((years || 30) * ppy) + ppy * 50);

  while (balance > 0.5 && period < safetyLimit) {
    period++;
    if (useLump && !lumpApplied && lump > 0) {
      balance = Math.max(0, balance - lump);
      lumpApplied = true;
    }
    const interestBase = Math.max(0, balance - offsetBalance);
    const interest = interestBase * ratePerPeriod;
    totalInterest += interest;
    balance += interest;
    let payment = standardPayment;
    if (useExtra) payment += extraPayment;
    balance = Math.max(0, balance - payment);
    offsetBalance += offsetGrowthPerPeriod;
    const month = period * 12 / ppy;
    if (period % ppy === 0 || balance <= 0) points.push({ month, balance });
  }
  return { interest: totalInterest, months: period * 12 / ppy, payment: standardPayment, points };
}

function calculate() {
  const d = getData();
  const base = simulate({ ...d, useOffset: false, useExtra: false, useLump: false, offset: 0, extra: 0, lump: 0 });
  const offset = simulate({ ...d, useOffset: true, useExtra: false, useLump: false, extra: 0, lump: 0 });
  const extraOnly = simulate({ ...d, useOffset: false, useExtra: true, useLump: false, offset: 0, lump: 0 });
  const lumpOnly = simulate({ ...d, useOffset: false, useExtra: false, useLump: true, offset: 0, extra: 0 });
  const plan = simulate(d);
  return { d, base, offset, extraOnly, lumpOnly, plan, payment: base.payment };
}

function drawChart(base, offset, plan) {
  const canvas = $('chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const cssWidth = rect.width || 900;
  const cssHeight = rect.height || 330;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const pad = { l: 64, r: 24, t: 20, b: 46 };
  const chartW = cssWidth - pad.l - pad.r;
  const chartH = cssHeight - pad.t - pad.b;
  const allPoints = [...base.points, ...offset.points, ...plan.points];
  const maxBalance = Math.max(...allPoints.map(p => p.balance), 1);
  const maxMonths = Math.max(base.months, offset.months, plan.months, 1);
  const x = (month) => pad.l + chartW * (month / maxMonths);
  const y = (balance) => pad.t + chartH * (1 - balance / maxBalance);

  ctx.font = '14px Inter, Arial, sans-serif';
  ctx.strokeStyle = '#e6edf5';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#475569';
  for (let i = 0; i <= 4; i++) {
    const yy = pad.t + chartH * i / 4;
    ctx.beginPath();
    ctx.moveTo(pad.l, yy);
    ctx.lineTo(cssWidth - pad.r, yy);
    ctx.stroke();
    const value = maxBalance * (1 - i / 4);
    ctx.fillText('$' + Math.round(value / 1000) + 'k', 12, yy + 4);
  }

  function drawSeries(series, color, fillColor) {
    if (!series.points.length) return;
    ctx.beginPath();
    series.points.forEach((p, i) => {
      const xx = x(p.month), yy = y(p.balance);
      if (i === 0) ctx.moveTo(xx, yy);
      else ctx.lineTo(xx, yy);
    });
    if (fillColor) {
      const last = series.points[series.points.length - 1];
      ctx.lineTo(x(last.month), y(0));
      ctx.lineTo(x(0), y(0));
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, pad.t, 0, cssHeight - pad.b);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    ctx.beginPath();
    series.points.forEach((p, i) => {
      const xx = x(p.month), yy = y(p.balance);
      if (i === 0) ctx.moveTo(xx, yy);
      else ctx.lineTo(xx, yy);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  drawSeries(base, '#98a2b3', 'rgba(152,162,179,.16)');
  drawSeries(offset, '#2e7df6', 'rgba(46,125,246,.13)');
  drawSeries(plan, '#0aa06e', 'rgba(10,160,110,.13)');

  ctx.fillStyle = '#475569';
  const d = getData();
  for (let i = 0; i <= 5; i++) {
    const month = maxMonths * i / 5;
    const date = addMonths(d.projectionStart, month);
    ctx.fillText(localNumber(date.getFullYear()), x(month) - 16, cssHeight - 18);
  }
}


function monthlyBreakdown(d, base) {
  const monthlyRate = (d.rate || 0) / 100 / 12;
  const repaymentPpy = periodsPerYear(d.repaymentFrequency);
  const normalMonthlyRepayment = base.payment * repaymentPpy / 12;
  const extraMonthly = d.useExtra ? periodicAmount(d.extra, d.extraFrequency, 12) : 0;

  let strategyBalance = Math.max(0, d.principal || 0);
  if (d.useLump && d.lump > 0) {
    strategyBalance = Math.max(0, strategyBalance - d.lump);
  }

  const baselineInterest = Math.max(0, d.principal || 0) * monthlyRate;
  const strategyInterestBase = Math.max(0, strategyBalance - (d.useOffset ? d.offset : 0));
  const strategyInterest = strategyInterestBase * monthlyRate;
  const monthlyRepayment = normalMonthlyRepayment + extraMonthly;
  const principalPaid = Math.max(0, monthlyRepayment - strategyInterest);
  const interestSaved = Math.max(0, baselineInterest - strategyInterest);

  return { monthlyRepayment, strategyInterest, principalPaid, interestSaved };
}

function selectedStrategyText(d) {
  const parts = [];
  if (d.useOffset) parts.push(t('offset'));
  if (d.useExtra) parts.push(t('extraRepayment'));
  if (d.useLump) parts.push(t('oneOffLumpSum'));
  if (parts.length === 0) return { title: t('noStrategySelected'), description: t('noStrategySelectedDesc') };
  if (parts.length === 3) return { title: t('allSelectedStrategies'), description: t('allSelectedStrategiesDesc') };
  return { title: parts.join(' + '), description: t('selectedComboDesc') };
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function update() {
  setStaticText();
  const { d, base, offset, extraOnly, lumpOnly, plan, payment } = calculate();
  const offsetSaved = Math.max(0, base.interest - offset.interest);
  const extraSaved = Math.max(0, base.interest - extraOnly.interest);
  const lumpSaved = Math.max(0, base.interest - lumpOnly.interest);
  const timeSaved = Math.max(0, base.months - plan.months);

  setText('statLoan', fmt(d.principal));
  setText('statRate', d.rate.toFixed(3) + '%');
  setText('statTerm', localNumber(d.amortizationYears) + ' ' + t('years'));
  setText('statFrequency', frequencyLabel(d.repaymentFrequency));
  setText('statPayment', fmt(payment));


  const monthView = monthlyBreakdown(d, base);
  setText('monthlyRepayment', fmt(monthView.monthlyRepayment));
  setText('monthlyInterest', fmt(monthView.strategyInterest));
  setText('monthlyPrincipal', fmt(monthView.principalPaid));
  setText('monthlySaved', fmt(monthView.interestSaved));

  setText('baseInterest', fmt(base.interest));
  setText('offsetInterest', fmt(offset.interest));
  setText('offsetSaved', fmt(offsetSaved));
  setText('extraInterest', fmt(extraOnly.interest));
  setText('extraSaved', fmt(extraSaved));
  setText('lumpInterest', fmt(lumpOnly.interest));
  setText('lumpSaved', fmt(lumpSaved));

  setText('basePayoff', monthsText(base.months));
  setText('offsetPayoff', monthsText(offset.months));
  setText('planPayoff', monthsText(plan.months));
  setText('timeSaved', monthsText(timeSaved));
  setText('monthsSaved', t('paidOffMonthsSooner', { n: localNumber(Math.round(timeSaved)) }));

  setText('baseDate', monthFmt().format(addMonths(d.projectionStart, base.months)));
  setText('offsetDate', monthFmt().format(addMonths(d.projectionStart, offset.months)));
  setText('planDate', monthFmt().format(addMonths(d.projectionStart, plan.months)));

  const combo = selectedStrategyText(d);
  setText('comboTitle', combo.title);
  setText('comboDescription', combo.description);
  setText('comboInterest', fmt(plan.interest));
  setText('comboSaved', fmt(Math.max(0, base.interest - plan.interest)));
  setText('comboPayoff', monthsText(plan.months));
  setText('comboDate', monthFmt().format(addMonths(d.projectionStart, plan.months)));
  drawChart(base, offset, plan);
}



function localizeDonationMethodOptions() {
  const methodSelect = $('donationMethod');
  if (!methodSelect) return;
  const labels = {
    payid: t('donatePayIdTitle'),
    applepay: t('donateApplePayTitle'),
    creditcard: t('donateCreditCardTitle'),
    paypal: t('donatePaypalTitle')
  };
  [...methodSelect.options].forEach(option => {
    option.textContent = labels[option.value] || option.textContent;
  });
}




function setupDonationSection() {
  // Donation is now a single header button linking to Stripe.
}

document.addEventListener('DOMContentLoaded', async () => {
  await ensureLocale(currentLang);
  const langSelect = $('languageSelect');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', async () => {
      currentLang = langSelect.value;
      await ensureLocale(currentLang);
      localStorage.setItem('mortgagePlannerLanguage', currentLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', currentLang);
      window.history.replaceState({}, '', url);
      update();
    });
  }
  document.querySelectorAll('input, select').forEach(el => {
    if (el.id !== 'languageSelect') {
      el.addEventListener('input', update);
      el.addEventListener('change', update);
    }
  });
  window.addEventListener('resize', update);
  setupDonationSection();
  update();
});
