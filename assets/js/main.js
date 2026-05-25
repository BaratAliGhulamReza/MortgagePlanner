const $ = (id) => document.getElementById(id);
const FORMAT_LOCALE = 'en-AU';

function localeCode() {
  return FORMAT_LOCALE;
}

function localNumber(value) {
  return new Intl.NumberFormat(localeCode(), { maximumFractionDigits: 0 }).format(Number(value) || 0);
}


const fmt = (n, d = 0) =>
  new Intl.NumberFormat(localeCode(), {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: d,
    minimumFractionDigits: d
  }).format(Number.isFinite(n) ? n : 0);

const monthFmt = () => new Intl.DateTimeFormat(localeCode(), { month: 'short', year: 'numeric' });



function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function monthsText(months) {
  months = Math.max(0, Math.round(months || 0));
  const y = Math.floor(months / 12);
  const r = months % 12;
  const yearWord = y === 1 ? 'year' : 'years';
  const monthWord = r === 1 ? 'month' : 'months';
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
  return { weekly: 'Weekly', fortnightly: 'Fortnightly', monthly: 'Monthly', yearly: 'Yearly' }[frequency] || frequency;
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


function targetGoalData() {
  const years = clamp(+($('targetPayoffYears')?.value || 6), 1, 40);
  const frequency = $('targetExtraFrequency')?.value || 'monthly';
  return { years, frequency, months: years * 12 };
}

function paymentPerTargetFrequency(payment, sourceFrequency, targetFrequency) {
  const yearlyAmount = (payment || 0) * periodsPerYear(sourceFrequency);
  return yearlyAmount / periodsPerYear(targetFrequency);
}

function simulateTargetPlan(d, extraAmount, extraFrequency) {
  return simulate({
    ...d,
    useExtra: true,
    extra: extraAmount,
    extraFrequency,
    useOffset: d.useOffset,
    useLump: d.useLump
  });
}

function requiredExtraForTarget(d, base, target) {
  if (!d.principal || d.principal <= 0 || !Number.isFinite(target.months) || target.months <= 0) {
    return { extra: 0, plan: base, achievable: false, reason: 'Enter a valid current loan balance and payoff goal.' };
  }

  const planWithCurrentOffsetAndLump = simulateTargetPlan(d, 0, target.frequency);
  if (planWithCurrentOffsetAndLump.months <= target.months + 0.05) {
    return { extra: 0, plan: planWithCurrentOffsetAndLump, achievable: true, reason: '' };
  }

  let low = 0;
  let high = 100;
  let highPlan = simulateTargetPlan(d, high, target.frequency);
  const maxExtraPerPeriod = 1000000;

  while (highPlan.months > target.months && high < maxExtraPerPeriod) {
    high *= 2;
    highPlan = simulateTargetPlan(d, high, target.frequency);
  }

  if (highPlan.months > target.months) {
    return {
      extra: high,
      plan: highPlan,
      achievable: false,
      reason: 'The goal may be unrealistic with the current inputs. Try a longer target or review the loan balance and rate.'
    };
  }

  for (let i = 0; i < 44; i++) {
    const mid = (low + high) / 2;
    const midPlan = simulateTargetPlan(d, mid, target.frequency);
    if (midPlan.months <= target.months) high = mid;
    else low = mid;
  }

  const extra = Math.ceil(high);
  return { extra, plan: simulateTargetPlan(d, extra, target.frequency), achievable: true, reason: '' };
}

function updateTargetGoalStrategy(d, base) {
  const target = targetGoalData();
  const result = requiredExtraForTarget(d, base, target);
  const normalPerTargetFrequency = paymentPerTargetFrequency(base.payment, d.repaymentFrequency, target.frequency);
  const totalTargetPayment = normalPerTargetFrequency + result.extra;
  const targetDate = addMonths(d.projectionStart, result.plan.months);
  const totalInterestSaved = Math.max(0, base.interest - result.plan.interest);

  setText('targetExtraNeeded', fmt(result.extra));
  setText('targetExtraHint', result.extra > 0 ? frequencyLabel(target.frequency) + ' extra repayment on top of your normal repayment.' : 'Your current selected offset/lump settings already meet this goal.');
  setText('targetTotalPayment', fmt(totalTargetPayment));
  setText('targetTotalHint', frequencyLabel(target.frequency) + ' target amount including the normal repayment.');
  setText('targetPayoffDate', monthFmt().format(targetDate));
  setText('targetPayoffTime', 'About ' + monthsText(result.plan.months));

}


function selectedStrategyText(d) {
  const parts = [];
  if (d.useOffset) parts.push('Offset');
  if (d.useExtra) parts.push('Extra repayment');
  if (d.useLump) parts.push('One-off lump sum');
  if (parts.length === 0) {
    return {
      title: 'No strategy selected',
      description: 'Turn on offset, extra repayments, or lump sum to compare a strategy.'
    };
  }
  if (parts.length === 3) {
    return {
      title: 'All selected strategies',
      description: 'This combines the strategy options currently turned on in the calculator.'
    };
  }
  return {
    title: parts.join(' + '),
    description: 'This compares the selected strategy combination against the no-strategy baseline.'
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
  setText('statTerm', localNumber(d.amortizationYears) + ' years');
  setText('statFrequency', frequencyLabel(d.repaymentFrequency));
  setText('statPayment', fmt(payment));


  const monthView = monthlyBreakdown(d, base);
  setText('monthlyRepayment', fmt(monthView.monthlyRepayment));
  setText('monthlyInterest', fmt(monthView.strategyInterest));
  setText('monthlyPrincipal', fmt(monthView.principalPaid));
  setText('monthlySaved', fmt(monthView.interestSaved));

  updateTargetGoalStrategy(d, base);

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
  setText('monthsSaved', 'Paid off ' + localNumber(Math.round(timeSaved)) + ' months sooner');

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



const OFFICIAL_SUPPORT_URL = 'https://buy.stripe.com/dRm00j0Dp30P5CSe8PgMw00';
const OFFICIAL_SUPPORT_ORIGIN = 'https://buy.stripe.com';

function setupDonationSection() {
  const button = $('headerDonationButton');
  if (!button) return;

  // Keep the support button locked to the official Stripe Payment Link.
  button.href = OFFICIAL_SUPPORT_URL;
  button.target = '_blank';
  button.rel = 'noopener noreferrer nofollow';
  button.referrerPolicy = 'no-referrer';

  button.addEventListener('click', (event) => {
    let url;
    try {
      url = new URL(button.href, window.location.href);
    } catch (_) {
      event.preventDefault();
      window.alert('For safety, the support link is temporarily unavailable.');
      return;
    }

    if (url.origin !== OFFICIAL_SUPPORT_ORIGIN || url.href !== OFFICIAL_SUPPORT_URL) {
      event.preventDefault();
      window.alert('For safety, the support link is temporarily unavailable.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  window.addEventListener('resize', update);
  setupDonationSection();
  update();
});
