const $ = (id) => document.getElementById(id);

const fmt = (n, d = 0) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: d,
    minimumFractionDigits: d
  }).format(Number.isFinite(n) ? n : 0);

const monthFmt = new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric' });

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function monthsText(months) {
  months = Math.max(0, Math.round(months || 0));
  const y = Math.floor(months / 12);
  const r = months % 12;
  if (!y) return r + ' month' + (r === 1 ? '' : 's');
  if (!r) return y + ' year' + (y === 1 ? '' : 's');
  return y + ' years ' + r + ' month' + (r === 1 ? '' : 's');
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
  if (frequency === 'weekly') return 'Weekly';
  if (frequency === 'fortnightly') return 'Fortnightly';
  return 'Monthly';
}

function parseStartDate(value) {
  if (!value) return new Date();
  const date = new Date(value + 'T00:00:00');
  return Number.isNaN(date.getTime()) ? new Date('2024-06-01T00:00:00') : date;
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
    startAfterYears: 0,

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
    ctx.fillText(String(date.getFullYear()), x(month) - 16, cssHeight - 18);
  }
}


function selectedStrategyText(d) {
  const parts = [];
  if (d.useOffset) parts.push('Offset');
  if (d.useExtra) parts.push('Extra repayment');
  if (d.useLump) parts.push('One-off lump sum');

  if (parts.length === 0) {
    return {
      title: 'No strategy selected',
      description: 'Turn on one or more strategy options to see the combined result.'
    };
  }

  if (parts.length === 3) {
    return {
      title: 'All selected strategies',
      description: 'This combines your offset account, extra repayment, and one-off lump sum together.'
    };
  }

  return {
    title: parts.join(' + '),
    description: 'This combines the selected strategy options currently turned on in the calculator.'
  };
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function update() {
  const { d, base, offset, extraOnly, lumpOnly, plan, payment } = calculate();

  const offsetSaved = Math.max(0, base.interest - offset.interest);
  const extraSaved = Math.max(0, base.interest - extraOnly.interest);
  const lumpSaved = Math.max(0, base.interest - lumpOnly.interest);
  const timeSaved = Math.max(0, base.months - plan.months);

  setText('statLoan', fmt(d.principal));
  setText('statRate', d.rate.toFixed(3) + '%');
  setText('statTerm', d.amortizationYears + ' years');
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
  setText('monthsSaved', 'Paid off ' + Math.round(timeSaved) + ' months sooner');

  setText('baseDate', monthFmt.format(addMonths(d.projectionStart, base.months)));
  setText('offsetDate', monthFmt.format(addMonths(d.projectionStart, offset.months)));
  setText('planDate', monthFmt.format(addMonths(d.projectionStart, plan.months)));

  const combo = selectedStrategyText(d);
  setText('comboTitle', combo.title);
  setText('comboDescription', combo.description);
  setText('comboInterest', fmt(plan.interest));
  setText('comboSaved', fmt(Math.max(0, base.interest - plan.interest)));
  setText('comboPayoff', monthsText(plan.months));
  setText('comboDate', monthFmt.format(addMonths(d.projectionStart, plan.months)));

  drawChart(base, offset, plan);
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', update);
  el.addEventListener('change', update);
});

window.addEventListener('resize', update);
window.addEventListener('load', update);
update();