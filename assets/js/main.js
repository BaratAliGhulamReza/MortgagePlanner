
const $ = (id) => document.getElementById(id);
let currentLang = localStorage.getItem('mortgagePlannerLanguage') || 'en';

const I18N = {
  en: {
    docTitle: 'Mortgage Planner',
    brand: 'Mortgage Planner',
    savePlan: 'Save plan',
    heroTitle: 'Plan <span>smarter.</span><br>Pay off your mortgage sooner.',
    heroLead: 'See how extra payments and smart strategies can save you time and thousands in interest.',
    benefit1: 'Lower interest<br>costs',
    benefit2: 'Pay off your loan<br>sooner',
    benefit3: 'Build financial<br>freedom',
    statLoan: 'Current loan balance',
    statRate: 'Interest rate',
    statTerm: 'Amortization period',
    statFrequency: 'Repayment frequency',
    statPayment: 'Repayment',
    calcTitle: 'Mortgage calculator',
    calcSub: 'Enter your loan details to estimate payoff timing.',
    loanStartDate: 'Loan start date',
    dateHint: 'Day / Month / Year',
    currentLoanBalance: 'Current loan balance',
    interestRate: 'Interest rate',
    amortizationPeriod: 'Amortization period',
    repaymentFrequency: 'Repayment frequency',
    strategiesTitle: 'Strategy options',
    strategiesSub: 'Choose one or more options to compare strategies.',
    offsetTitle: 'Grow offset account',
    offsetDesc: 'Offset is linked to the loan and reduces interest charged.',
    use: 'Use',
    currentOffset: 'Current offset / redraw',
    growOffsetBy: 'Grow offset by',
    growFrequency: 'Grow frequency',
    extraTitle: 'Extra payment',
    extraDesc: 'Add an extra repayment weekly, fortnightly, monthly, or yearly.',
    extraAmount: 'Extra amount',
    howOften: 'How often',
    lumpTitle: 'One-off lump sum',
    lumpDesc: 'A single payment toward the home loan.',
    lumpAmount: 'Lump sum amount',
    interestComparison: 'Interest comparison',
    interestComparisonSub: 'See how each strategy performs on its own, then compare it with the live combined result from the options you select.',
    clearComparison: 'Clear side-by-side comparison',
    noStrategyBaseline: 'No strategy baseline',
    baselineDesc: 'This is the estimated interest you would pay if you kept the loan as-is, with no offset, no extra repayments, and no lump sum.',
    offsetOnly: 'Offset account only',
    offsetOnlyDesc: 'Based on your offset balance and offset growth.',
    extraOnly: 'Extra repayment only',
    extraOnlyDesc: 'Based on the extra repayment amount and frequency.',
    lumpOnly: 'One-off lump sum only',
    lumpOnlyDesc: 'Based on a single lump sum payment made now.',
    interestPay: 'Interest you pay',
    interestSave: 'Interest you save',
    offsetCardP: 'Shows how much interest is reduced by keeping money in offset against the loan.',
    extraCardP: 'Shows the interest saving from paying extra on top of the normal repayment.',
    lumpCardP: 'Shows the interest saving from putting one single payment into the loan. If the lump sum is $0, the saving will be $0.',
    liveCombined: 'Live combined result',
    interestPayShort: 'Interest you pay',
    payoffTime: 'Payoff time',
    newPayoffDate: 'New payoff date',
    chartTitle: 'Mortgage balance over time',
    legendNoStrategy: 'No strategy',
    legendOffsetOnly: 'Offset only',
    legendAllSelected: 'All selected strategies',
    payoffNoStrategy: 'Payoff time (no strategy)',
    payoffOffsetOnly: 'Payoff time (offset only)',
    payoffAllSelected: 'Payoff time (all selected)',
    timeSaved: 'Time saved',
    footerLine: 'Plan today. Enjoy tomorrow.',
    product: 'Product',
    calculator: 'Calculator',
    savedPlans: 'Saved plans',
    resources: 'Resources',
    guides: 'Guides',
    faqs: 'FAQs',
    glossary: 'Glossary',
    company: 'Company',
    aboutUs: 'About us',
    contact: 'Contact',
    privacy: 'Privacy',
    monthly: 'Monthly',
    fortnightly: 'Fortnightly',
    weekly: 'Weekly',
    yearly: 'Yearly',
    years: 'years',
    noStrategySelected: 'No strategy selected',
    noStrategySelectedDesc: 'Turn on one or more strategy options to see the combined result.',
    allSelectedStrategies: 'All selected strategies',
    allSelectedStrategiesDesc: 'This combines your offset account, extra repayment, and one-off lump sum together.',
    selectedComboDesc: 'This combines the selected strategy options currently turned on in the calculator.',
    offset: 'Offset',
    extraRepayment: 'Extra repayment',
    oneOffLumpSum: 'One-off lump sum',
    paidOffMonthsSooner: (n) => `Paid off ${n} months sooner`,
    monthSingular: 'month',
    monthPlural: 'months',
    yearSingular: 'year',
    yearPlural: 'years',
    datePlaceholder: 'Loan start date',
    zeroPlaceholder: '0',
    amountPlaceholder: 'Enter amount',
    ratePlaceholder: 'Enter rate',
    weeklyOption: 'Weekly',
    fortnightlyOption: 'Fortnightly',
    monthlyOption: 'Monthly',
    yearlyOption: 'Yearly'
  },
  fa: {
    docTitle: 'برنامه‌ریز وام خانه',
    brand: 'برنامه‌ریز وام خانه',
    savePlan: 'ذخیره پلان',
    heroTitle: 'هوشمندانه <span>پلان کنید.</span><br>وام خانه‌تان را زودتر پرداخت کنید.',
    heroLead: 'ببینید پرداخت‌های اضافی و راهکارهای هوشمند چطور می‌تواند زمان و هزاران دالر سود را برای شما کم کند.',
    benefit1: 'کاهش هزینه<br>سود',
    benefit2: 'پرداخت زودتر<br>وام',
    benefit3: 'ساختن آزادی<br>مالی',
    statLoan: 'باقی‌مانده فعلی وام',
    statRate: 'نرخ سود',
    statTerm: 'مدت بازپرداخت',
    statFrequency: 'تکرار پرداخت',
    statPayment: 'مبلغ پرداخت',
    calcTitle: 'محاسبه‌گر وام خانه',
    calcSub: 'جزئیات وام خود را وارد کنید تا زمان پرداخت کامل تخمین زده شود.',
    loanStartDate: 'تاریخ شروع وام',
    dateHint: 'روز / ماه / سال',
    currentLoanBalance: 'باقی‌مانده فعلی وام',
    interestRate: 'نرخ سود',
    amortizationPeriod: 'مدت بازپرداخت',
    repaymentFrequency: 'تکرار پرداخت',
    strategiesTitle: 'گزینه‌های راهکار',
    strategiesSub: 'یک یا چند گزینه را انتخاب کنید تا راهکارها مقایسه شوند.',
    offsetTitle: 'افزایش حساب آفست',
    offsetDesc: 'حساب آفست به وام وصل است و سود محاسبه‌شده را کم می‌کند.',
    use: 'استفاده',
    currentOffset: 'مبلغ فعلی آفست / برداشت مجدد',
    growOffsetBy: 'افزایش آفست به مقدار',
    growFrequency: 'تکرار افزایش',
    extraTitle: 'پرداخت اضافی',
    extraDesc: 'پرداخت اضافی را به‌صورت هفتگی، هر دو هفته، ماهانه یا سالانه اضافه کنید.',
    extraAmount: 'مبلغ اضافی',
    howOften: 'چند وقت یک‌بار',
    lumpTitle: 'پرداخت یک‌باره',
    lumpDesc: 'یک پرداخت یک‌باره برای کاهش اصل وام.',
    lumpAmount: 'مبلغ پرداخت یک‌باره',
    interestComparison: 'مقایسه سود',
    interestComparisonSub: 'هر راهکار را جداگانه ببینید، سپس نتیجه ترکیبی گزینه‌های انتخاب‌شده را مقایسه کنید.',
    clearComparison: 'مقایسه واضح کنار هم',
    noStrategyBaseline: 'حالت پایه بدون راهکار',
    baselineDesc: 'این مقدار سودی است که اگر وام را بدون آفست، بدون پرداخت اضافی و بدون پرداخت یک‌باره ادامه دهید، پرداخت می‌کنید.',
    offsetOnly: 'فقط حساب آفست',
    offsetOnlyDesc: 'بر اساس موجودی آفست و رشد آفست شما.',
    extraOnly: 'فقط پرداخت اضافی',
    extraOnlyDesc: 'بر اساس مبلغ پرداخت اضافی و تکرار آن.',
    lumpOnly: 'فقط پرداخت یک‌باره',
    lumpOnlyDesc: 'بر اساس یک پرداخت یک‌باره که اکنون انجام می‌شود.',
    interestPay: 'سودی که پرداخت می‌کنید',
    interestSave: 'سودی که صرفه‌جویی می‌کنید',
    offsetCardP: 'نشان می‌دهد نگهداشتن پول در آفست چقدر سود وام را کم می‌کند.',
    extraCardP: 'نشان می‌دهد پرداخت اضافی بالای پرداخت عادی چقدر سود را کم می‌کند.',
    lumpCardP: 'نشان می‌دهد یک پرداخت یک‌باره چقدر سود را کم می‌کند. اگر مبلغ $0 باشد، صرفه‌جویی هم $0 خواهد بود.',
    liveCombined: 'نتیجه ترکیبی زنده',
    interestPayShort: 'سودی که پرداخت می‌کنید',
    payoffTime: 'مدت پرداخت کامل',
    newPayoffDate: 'تاریخ جدید پرداخت کامل',
    chartTitle: 'باقی‌مانده وام در طول زمان',
    legendNoStrategy: 'بدون راهکار',
    legendOffsetOnly: 'فقط آفست',
    legendAllSelected: 'همه راهکارهای انتخاب‌شده',
    payoffNoStrategy: 'مدت پرداخت کامل (بدون راهکار)',
    payoffOffsetOnly: 'مدت پرداخت کامل (فقط آفست)',
    payoffAllSelected: 'مدت پرداخت کامل (گزینه‌های انتخاب‌شده)',
    timeSaved: 'زمان صرفه‌جویی‌شده',
    footerLine: 'امروز پلان کنید. فردا راحت‌تر باشید.',
    product: 'محصول',
    calculator: 'محاسبه‌گر',
    savedPlans: 'پلان‌های ذخیره‌شده',
    resources: 'منابع',
    guides: 'راهنماها',
    faqs: 'پرسش‌های رایج',
    glossary: 'واژه‌نامه',
    company: 'شرکت',
    aboutUs: 'درباره ما',
    contact: 'تماس',
    privacy: 'حریم خصوصی',
    monthly: 'ماهانه',
    fortnightly: 'هر دو هفته',
    weekly: 'هفتگی',
    yearly: 'سالانه',
    years: 'سال',
    noStrategySelected: 'هیچ راهکاری انتخاب نشده',
    noStrategySelectedDesc: 'یک یا چند گزینه راهکار را روشن کنید تا نتیجه ترکیبی را ببینید.',
    allSelectedStrategies: 'همه راهکارهای انتخاب‌شده',
    allSelectedStrategiesDesc: 'این نتیجه حساب آفست، پرداخت اضافی و پرداخت یک‌باره را با هم ترکیب می‌کند.',
    selectedComboDesc: 'این نتیجه گزینه‌های راهکاری را که در محاسبه‌گر روشن کرده‌اید با هم ترکیب می‌کند.',
    offset: 'آفست',
    extraRepayment: 'پرداخت اضافی',
    oneOffLumpSum: 'پرداخت یک‌باره',
    paidOffMonthsSooner: (n) => `${n} ماه زودتر پرداخت می‌شود`,
    monthSingular: 'ماه',
    monthPlural: 'ماه',
    yearSingular: 'سال',
    yearPlural: 'سال',
    datePlaceholder: 'روز / ماه / سال',
    zeroPlaceholder: '۰',
    amountPlaceholder: 'مبلغ را وارد کنید',
    ratePlaceholder: 'نرخ را وارد کنید',
    weeklyOption: 'هفتگی',
    fortnightlyOption: 'هر دو هفته',
    monthlyOption: 'ماهانه',
    yearlyOption: 'سالانه'
  }
};

function t(key) {
  return I18N[currentLang][key] ?? I18N.en[key] ?? key;
}

function localNumber(value) {
  const str = String(value);
  if (currentLang !== 'fa') return str;
  const map = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return str.replace(/\d/g, d => map[d]);
}

function localMoney(n, d = 0) {
  return fmt(n, d);
}

function setPlaceholder(id, value) {
  const el = $(id);
  if (el) el.placeholder = value;
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

function setStaticText() {
  document.documentElement.lang = currentLang === 'fa' ? 'fa' : 'en';
  document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  document.title = t('docTitle');

  const langSelect = $('languageSelect');
  if (langSelect) langSelect.value = currentLang;

  setHTML('.header .logo span', t('brand'));
  setHTML('.save-plan span', t('savePlan'));
  setHTML('.hero h1', t('heroTitle'));
  setHTML('.lead', t('heroLead'));

  const benefits = document.querySelectorAll('.benefit strong');
  if (benefits[0]) benefits[0].innerHTML = t('benefit1');
  if (benefits[1]) benefits[1].innerHTML = t('benefit2');
  if (benefits[2]) benefits[2].innerHTML = t('benefit3');

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
  setPlaceholder('loanAmount', currentLang === 'fa' ? t('amountPlaceholder') : '0');
  setPlaceholder('interestRate', currentLang === 'fa' ? t('ratePlaceholder') : '0');
  setPlaceholder('offsetAmount', currentLang === 'fa' ? t('amountPlaceholder') : '0');
  setPlaceholder('offsetGrowth', currentLang === 'fa' ? t('amountPlaceholder') : '0');
  setPlaceholder('extraAmount', currentLang === 'fa' ? t('amountPlaceholder') : '0');
  setPlaceholder('lumpSum', currentLang === 'fa' ? t('amountPlaceholder') : '0');

  const loanTermOptions = document.querySelectorAll('#loanTerm option');
  loanTermOptions.forEach(opt => opt.textContent = localNumber(opt.value) + ' ' + t('years'));

  const repaymentOptions = document.querySelectorAll('#repaymentFrequency option');
  repaymentOptions.forEach(opt => opt.textContent = t(opt.value));

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

  document.querySelectorAll('#offsetFrequency option, #extraFrequency option').forEach(opt => {
    opt.textContent = t(opt.value);
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

  const footer = document.querySelector('.footer-brand span');
  if (footer) footer.textContent = t('footerLine');
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

const fmt = (n, d = 0) =>
  new Intl.NumberFormat(currentLang === 'fa' ? 'fa-AF' : 'en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: d,
    minimumFractionDigits: d
  }).format(Number.isFinite(n) ? n : 0);

const monthFmt = () => new Intl.DateTimeFormat(currentLang === 'fa' ? 'fa-AF' : 'en-AU', { month: 'short', year: 'numeric' });

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

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

function frequencyLabel(frequency) {
  return t(frequency);
}

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

function simulate({
  principal,
  rate,
  years,
  repaymentFrequency = 'monthly',
  offset = 0,
  offsetGrowth = 0,
  offsetFrequency = 'monthly',
  extra = 0,
  extraFrequency = 'monthly',
  lump = 0,
  useOffset = true,
  useExtra = true,
  useLump = true
}) {
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
    if (period % ppy === 0 || balance <= 0) {
      points.push({ month, balance });
    }
  }

  return {
    interest: totalInterest,
    months: period * 12 / ppy,
    payment: standardPayment,
    points
  };
}

function calculate() {
  const d = getData();

  const base = simulate({
    ...d,
    useOffset: false,
    useExtra: false,
    useLump: false,
    offset: 0,
    extra: 0,
    lump: 0
  });

  const offset = simulate({
    ...d,
    useOffset: true,
    useExtra: false,
    useLump: false,
    extra: 0,
    lump: 0
  });

  const extraOnly = simulate({
    ...d,
    useOffset: false,
    useExtra: true,
    useLump: false,
    offset: 0,
    lump: 0
  });

  const lumpOnly = simulate({
    ...d,
    useOffset: false,
    useExtra: false,
    useLump: true,
    offset: 0,
    extra: 0
  });

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
      const xx = x(p.month);
      const yy = y(p.balance);
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
      const xx = x(p.month);
      const yy = y(p.balance);
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

function selectedStrategyText(d) {
  const parts = [];
  if (d.useOffset) parts.push(t('offset'));
  if (d.useExtra) parts.push(t('extraRepayment'));
  if (d.useLump) parts.push(t('oneOffLumpSum'));

  if (parts.length === 0) {
    return { title: t('noStrategySelected'), description: t('noStrategySelectedDesc') };
  }

  if (parts.length === 3) {
    return { title: t('allSelectedStrategies'), description: t('allSelectedStrategiesDesc') };
  }

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
  setText('monthsSaved', t('paidOffMonthsSooner')(localNumber(Math.round(timeSaved))));

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

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = $('languageSelect');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', () => {
      currentLang = langSelect.value;
      localStorage.setItem('mortgagePlannerLanguage', currentLang);
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
  update();
});
