
const $ = (id) => document.getElementById(id);
let currentLang = localStorage.getItem('mortgagePlannerLanguage') || 'en';
if (!['en','fa','zh','hi','ur','es'].includes(currentLang)) currentLang = 'en';

const I18N = {
  en: {
    docTitle: "Mortgage Planner",
    brand: "Mortgage Planner",
    savePlan: 'Save plan',
    heroTitle: "Plan <span>smarter.</span><br>Pay off your mortgage sooner.",
    heroLead: "Powerful planning tools and clear insights to help you save money and achieve financial freedom.",
    benefit1: "See your payoff date",
    benefit2: "Save thousands",
    benefit3: "Stay on track",
    statLoan: "Current loan balance",
    statRate: "Interest rate",
    statTerm: "Amortization period",
    statFrequency: "Repayment frequency",
    statPayment: "Repayment",
    calcTitle: "Mortgage calculator",
    calcSub: "Enter your loan details to estimate payoff timing.",
    loanStartDate: "Loan start date",
    dateHint: "Day / Month / Year",
    currentLoanBalance: "Current loan balance",
    interestRate: "Interest rate",
    amortizationPeriod: "Amortization period",
    repaymentFrequency: "Repayment frequency",
    strategiesTitle: "Strategy options",
    strategiesSub: "Choose one or more options to compare strategies.",
    offsetTitle: "Grow offset account",
    offsetDesc: "Reduces interest charged.",
    use: "Use",
    currentOffset: "Current offset / redraw",
    growOffsetBy: "Grow offset by",
    growFrequency: "Grow frequency",
    extraTitle: "Extra payment",
    extraDesc: "Pay extra toward the loan.",
    extraAmount: "Extra amount",
    howOften: "How often",
    lumpTitle: "One-off lump sum",
    lumpDesc: "A single extra payment.",
    lumpAmount: "Lump sum amount",
    interestComparison: 'Interest comparison',
    interestComparisonSub: "Compare interest paid and saved by each strategy.", then compare it with the live combined result from the options you select.',
    clearComparison: 'Clear side-by-side comparison',
    noStrategyBaseline: "No strategy baseline",
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
    payoffNoStrategy: "Pay-off date (no strategy)",
    payoffOffsetOnly: 'Payoff time (offset only)',
    payoffAllSelected: 'Payoff time (all selected)',
    timeSaved: "Time saved",
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
    monthly: "Monthly",
    fortnightly: "Fortnightly",
    weekly: "Weekly",
    yearly: "Yearly",
    years: "years",
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
    monthlyBreakdownTitle: "Monthly repayment breakdown",
    monthlyBreakdownSub: "Based on the strategy options currently selected.",
    monthlyBreakdownBadge: 'After selected strategy',
    monthlyRepaymentAfter: 'Repayment',
    monthlyRepaymentHint: '',
    monthlyInterestPart: 'This month to interest',
    monthlyInterestHint: 'After offset and lump sum are applied.',
    monthlyPrincipalPart: 'This month to principal',
    monthlyPrincipalHint: 'The part reducing your loan balance.',
    monthlyInterestSaved: 'Interest saved this month',
    monthlySavedHint: 'Compared with no strategy.',
    donateStep1Title: "Support this website",
    donateStep1Sub: "Your donation helps cover domain and maintenance costs.",
    donateSecure: "Payments are handled securely by Stripe. This website does not store card details.",
    donateStep2Title: "Choose amount and pay",
    donateStep2Sub: "Select your donation amount in the secure Stripe checkout.",
    donateBankTitle: 'Bank transfer',
    donateBankSub: 'Direct deposit',
    donateAccountNameLabel: 'Account name',
    donateBsbLabel: 'BSB',
    donateAccountNumberLabel: 'Account number',
    donateStep3Title: "Your donation",
    donateStep3Sub: "Thank you for your support.",
    donateAmountLabel: "Amount",
    donateTotalLabel: "Total",
    donateCopyButton: "Continue",
    donateCopiedButton: "Opening secure checkout",
    donateNote: "One-time donation • Secure Stripe checkout",
    donatePayIdTitle: "Pay ID",
    donatePayIdSub: "Fast bank payment",
    donateApplePayTitle: "Apple Pay",
    donateApplePaySub: "Wallet payment",
    donateCreditCardTitle: "Credit Card",
    donateCreditCardSub: "Card payment",
    donatePaypalTitle: "PayPal",
    donatePaypalSub: "Online payment",
    donateApplePayInfo: "Apple Pay can be connected once your payment processor is added.",
    donateCreditCardInfo: "Credit card payments can be connected once Stripe or another processor is added.",
    donatePaypalInfo: "PayPal can be connected once your PayPal donation link is added.",
    donateMethodLabel: "Payment method",
    donateMethodSummaryLabel: "Method",
    donateCardTitle: "Secure Stripe checkout",
    donateCardSub: "Choose $5, $10, $20, $50, or $100 in Stripe.",
    donateCardMethod: "Card",
    headerDonationText: "Support Us",
    navHome: "Home",
    navAbout: "About",
    navCalculator: "Calculator",
    navGuide: "Guide",
    navFaq: "FAQ",
    navContact: "Contact",
    ctaPrimary: "Get Started",
    ctaSecondary: "Learn How It Works",
    datePlaceholder: "Loan start date",
    amountPlaceholder: "0",
    ratePlaceholder: "0",
    monthlyRepaymentAfterStrategy: "Repayment",
    thisMonthInterest: "This month to interest",
    thisMonthPrincipal: "This month to principal",
    interestSavedThisMonth: "Interest saved this month",
    selectedStrategyPill: "After selected strategy",
    interestComparisonTitle: "Interest comparison",
    offsetOnlyTitle: "Offset account only",
    extraOnlyTitle: "Extra repayment only",
    lumpOnlyTitle: "One-off lump sum only",
    allSelectedTitle: "All selected strategies",
    interestYouPay: "Interest you pay",
    interestYouSave: "Interest you save",
    balanceChartTitle: "Mortgage balance over time",
    payoffSelected: "Pay-off date (selected)",
  fa: {
    docTitle: "برنامه‌ریز وام خانه",
    brand: "برنامه‌ریز وام خانه",
    savePlan: 'ذخیره پلان',
    heroTitle: "هوشمندانه <span>برنامه‌ریزی کنید.</span><br>وام خانه‌تان را زودتر پرداخت کنید.",
    heroLead: "ابزارهای ساده و روشن برای کمک به صرفه‌جویی، کاهش سود، و رسیدن زودتر به آزادی مالی.",
    benefit1: "تاریخ ختم وام را ببینید",
    benefit2: "هزاران دالر صرفه‌جویی کنید",
    benefit3: "در مسیر بمانید",
    statLoan: "باقی‌مانده وام",
    statRate: "نرخ سود",
    statTerm: "مدت بازپرداخت",
    statFrequency: "تکرار پرداخت",
    statPayment: "مبلغ پرداخت",
    calcTitle: "محاسبه‌گر وام خانه",
    calcSub: "جزئیات وام خود را وارد کنید تا زمان پرداخت کامل تخمین زده شود.",
    loanStartDate: "تاریخ شروع وام",
    dateHint: "روز / ماه / سال",
    currentLoanBalance: "باقی‌مانده فعلی وام",
    interestRate: "نرخ سود",
    amortizationPeriod: "مدت بازپرداخت",
    repaymentFrequency: "تکرار پرداخت",
    strategiesTitle: "گزینه‌های راهبردی",
    strategiesSub: "یک یا چند گزینه را انتخاب کنید تا راهبردها مقایسه شوند.",
    offsetTitle: "افزایش حساب آفست",
    offsetDesc: "سود پرداختی را کاهش می‌دهد.",
    use: "استفاده",
    currentOffset: "مبلغ فعلی آفست / ریدرا",
    growOffsetBy: "افزایش آفست به مقدار",
    growFrequency: "تکرار افزایش",
    extraTitle: "پرداخت اضافه",
    extraDesc: "مبلغ اضافه به اصل وام پرداخت می‌شود.",
    extraAmount: "مبلغ اضافه",
    howOften: "چند وقت یک‌بار",
    lumpTitle: "پرداخت یک‌باره",
    lumpDesc: "یک پرداخت اضافه و یک‌باره.",
    lumpAmount: "مبلغ پرداخت یک‌باره",
    interestComparison: 'مقایسه سود',
    interestComparisonSub: "مقدار سود پرداختی و صرفه‌جویی‌شده را برای هر راهبرد مقایسه کنید.",
    clearComparison: 'مقایسه واضح کنار هم',
    noStrategyBaseline: "بدون راهبرد",
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
    payoffNoStrategy: "تاریخ ختم وام بدون راهبرد",
    payoffOffsetOnly: 'مدت پرداخت کامل (فقط آفست)',
    payoffAllSelected: 'مدت پرداخت کامل (گزینه‌های انتخاب‌شده)',
    timeSaved: "زمان صرفه‌جویی‌شده",
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
    monthly: "ماهانه",
    fortnightly: "هر دو هفته",
    weekly: "هفتگی",
    yearly: "سالانه",
    years: "سال",
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
    monthlyBreakdownTitle: "جزئیات پرداخت ماهانه",
    monthlyBreakdownSub: "بر اساس گزینه‌های راهبردی انتخاب‌شده.",
    monthlyBreakdownBadge: 'بعد از راهکار انتخاب\u200cشده',
    monthlyRepaymentAfter: 'پرداخت',
    monthlyRepaymentHint: 'پرداخت عادی به اضافه پرداخت\u200cهای اضافی انتخاب\u200cشده.',
    monthlyInterestPart: 'سهم سود در این ماه',
    monthlyInterestHint: 'بعد از اعمال آفست و پرداخت یک\u200cباره.',
    monthlyPrincipalPart: 'سهم اصل وام در این ماه',
    monthlyPrincipalHint: 'بخشی که باقی\u200cمانده وام را کم می\u200cکند.',
    monthlyInterestSaved: 'سود صرفه\u200cجویی\u200cشده در این ماه',
    monthlySavedHint: 'در مقایسه با حالت بدون راهکار.',
    donateStep1Title: "حمایت از این وبسایت",
    donateStep1Sub: "کمک شما به پرداخت هزینه دامنه و نگهداری کمک می‌کند.",
    donateSecure: "پرداخت‌ها به‌صورت امن توسط Stripe انجام می‌شود. این وبسایت جزئیات کارت را ذخیره نمی‌کند.",
    donateStep2Title: "مبلغ را انتخاب و پرداخت کنید",
    donateStep2Sub: "مبلغ کمک را در پرداخت امن Stripe انتخاب کنید.",
    donateBankTitle: 'انتقال بانکی',
    donateBankSub: 'واریز مستقیم',
    donateAccountNameLabel: 'نام حساب',
    donateBsbLabel: 'BSB',
    donateAccountNumberLabel: 'شماره حساب',
    donateStep3Title: "کمک شما",
    donateStep3Sub: "تشکر از حمایت شما.",
    donateAmountLabel: "مبلغ",
    donateTotalLabel: "جمع کل",
    donateCopyButton: "ادامه",
    donateCopiedButton: "در حال بازکردن پرداخت امن",
    donateNote: "کمک یک‌باره • پرداخت امن Stripe",
    donatePayIdTitle: "Pay ID",
    donatePayIdSub: "پرداخت سریع بانکی",
    donateApplePayTitle: "Apple Pay",
    donateApplePaySub: "پرداخت کیف پول",
    donateCreditCardTitle: "کارت اعتباری",
    donateCreditCardSub: "پرداخت کارتی",
    donatePaypalTitle: "PayPal",
    donatePaypalSub: "پرداخت آنلاین",
    donateApplePayInfo: "پس از اضافه‌شدن درگاه پرداخت، Apple Pay قابل اتصال خواهد بود.",
    donateCreditCardInfo: "پرداخت کارت اعتباری پس از اضافه‌شدن Stripe یا درگاه مشابه قابل اتصال خواهد بود.",
    donatePaypalInfo: "پس از اضافه‌شدن لینک کمک PayPal، PayPal قابل اتصال خواهد بود.",
    donateMethodLabel: "روش پرداخت",
    donateMethodSummaryLabel: "روش",
    donateCardTitle: "پرداخت امن Stripe",
    donateCardSub: "در Stripe مبلغ $5، $10، $20، $50 یا $100 را انتخاب کنید.",
    donateCardMethod: "کارت",
    headerDonationText: "حمایت کنید",
    navHome: "خانه",
    navAbout: "درباره",
    navCalculator: "محاسبه‌گر",
    navGuide: "راهنما",
    navFaq: "پرسش‌ها",
    navContact: "تماس",
    ctaPrimary: "شروع کنید",
    ctaSecondary: "چگونه کار می‌کند",
    datePlaceholder: "تاریخ شروع وام",
    amountPlaceholder: "۰",
    ratePlaceholder: "۰",
    monthlyRepaymentAfterStrategy: "مبلغ پرداخت",
    thisMonthInterest: "سود این ماه",
    thisMonthPrincipal: "اصل وام این ماه",
    interestSavedThisMonth: "سود صرفه‌جویی‌شده این ماه",
    selectedStrategyPill: "پس از راهبرد انتخاب‌شده",
    interestComparisonTitle: "مقایسه سود",
    offsetOnlyTitle: "فقط حساب آفست",
    extraOnlyTitle: "فقط پرداخت اضافه",
    lumpOnlyTitle: "فقط پرداخت یک‌باره",
    allSelectedTitle: "همه راهبردهای انتخاب‌شده",
    interestYouPay: "سودی که می‌پردازید",
    interestYouSave: "سودی که صرفه‌جویی می‌کنید",
    balanceChartTitle: "باقی‌مانده وام در گذر زمان",
    payoffSelected: "تاریخ ختم وام با راهبرد انتخاب‌شده",
  hi: {
    docTitle: 'मॉर्गेज प्लानर',
    brand: 'मॉर्गेज प्लानर',
    savePlan: 'प्लान सेव करें',
    heroTitle: 'बेहतर <span>योजना बनाएं.</span><br>अपना मॉर्गेज जल्दी चुकाएं.',
    heroLead: "शक्तिशाली योजना उपकरण और स्पष्ट जानकारी जो आपको पैसे बचाने और वित्तीय स्वतंत्रता पाने में मदद करें।",
    benefit1: "अपनी payoff date देखें",
    benefit2: "हज़ारों बचाएँ",
    benefit3: "ट्रैक पर रहें",
    statLoan: 'वर्तमान लोन बैलेंस',
    statRate: 'ब्याज दर',
    statTerm: 'अमोर्टाइजेशन अवधि',
    statFrequency: 'भुगतान आवृत्ति',
    statPayment: 'भुगतान',
    calcTitle: 'मॉर्गेज कैलकुलेटर',
    calcSub: 'भुगतान समय का अनुमान लगाने के लिए अपने लोन विवरण दर्ज करें.',
    loanStartDate: 'लोन शुरू होने की तारीख',
    dateHint: 'दिन / महीना / साल',
    currentLoanBalance: 'वर्तमान लोन बैलेंस',
    interestRate: 'ब्याज दर',
    amortizationPeriod: 'अमोर्टाइजेशन अवधि',
    repaymentFrequency: 'भुगतान आवृत्ति',
    strategiesTitle: 'रणनीति विकल्प',
    strategiesSub: 'रणनीतियों की तुलना करने के लिए एक या अधिक विकल्प चुनें.',
    offsetTitle: 'ऑफसेट खाता बढ़ाएं',
    offsetDesc: 'ब्याज कम करता है.',
    use: 'उपयोग करें',
    currentOffset: 'वर्तमान ऑफसेट / रीड्रॉ',
    growOffsetBy: 'ऑफसेट बढ़ाएं',
    growFrequency: 'वृद्धि आवृत्ति',
    extraTitle: 'अतिरिक्त भुगतान',
    extraDesc: 'अतिरिक्त भुगतान करें.',
    extraAmount: 'अतिरिक्त राशि',
    howOften: 'कितनी बार',
    lumpTitle: 'एकमुश्त भुगतान',
    lumpDesc: 'लोन घटाने के लिए एक भुगतान.',
    lumpAmount: 'एकमुश्त राशि',
    interestComparison: 'ब्याज तुलना',
    interestComparisonSub: 'हर रणनीति को अलग-अलग देखें, फिर चुने गए विकल्पों के संयुक्त परिणाम से तुलना करें.',
    clearComparison: 'स्पष्ट साथ-साथ तुलना',
    noStrategyBaseline: 'बिना रणनीति आधार',
    baselineDesc: 'यह अनुमानित ब्याज है जो आप बिना ऑफसेट, बिना अतिरिक्त भुगतान और बिना एकमुश्त भुगतान के देंगे.',
    offsetOnly: 'केवल ऑफसेट खाता',
    offsetOnlyDesc: 'आपके ऑफसेट बैलेंस और वृद्धि के आधार पर.',
    extraOnly: 'केवल अतिरिक्त भुगतान',
    extraOnlyDesc: 'अतिरिक्त भुगतान राशि और आवृत्ति के आधार पर.',
    lumpOnly: 'केवल एकमुश्त भुगतान',
    lumpOnlyDesc: 'अभी किए गए एक बार के भुगतान के आधार पर.',
    interestPay: 'आप जो ब्याज देंगे',
    interestSave: 'आप जो ब्याज बचाएंगे',
    offsetCardP: 'दिखाता है कि ऑफसेट में पैसा रखने से लोन ब्याज कितना कम होता है.',
    extraCardP: 'दिखाता है कि सामान्य भुगतान के ऊपर अतिरिक्त भुगतान करने से कितनी बचत होती है.',
    lumpCardP: 'दिखाता है कि एकमुश्त भुगतान से कितनी ब्याज बचत होती है. यदि राशि $0 है, बचत $0 होगी.',
    liveCombined: 'लाइव संयुक्त परिणाम',
    interestPayShort: 'ब्याज भुगतान',
    payoffTime: 'चुकाने का समय',
    newPayoffDate: 'नई भुगतान समाप्ति तारीख',
    chartTitle: 'समय के साथ मॉर्गेज बैलेंस',
    legendNoStrategy: 'कोई रणनीति नहीं',
    legendOffsetOnly: 'केवल ऑफसेट',
    legendAllSelected: 'सभी चुनी गई रणनीतियाँ',
    payoffNoStrategy: 'भुगतान समय (बिना रणनीति)',
    payoffOffsetOnly: 'भुगतान समय (केवल ऑफसेट)',
    payoffAllSelected: 'भुगतान समय (चुने गए विकल्प)',
    timeSaved: 'बचा हुआ समय',
    footerLine: 'आज योजना बनाएं. कल बेहतर जिएं.',
    product: 'प्रोडक्ट',
    calculator: 'कैलकुलेटर',
    savedPlans: 'सेव किए गए प्लान',
    resources: 'संसाधन',
    guides: 'गाइड',
    faqs: 'FAQ',
    glossary: 'शब्दावली',
    company: 'कंपनी',
    aboutUs: 'हमारे बारे में',
    contact: 'संपर्क',
    privacy: 'गोपनीयता',
    monthly: 'मासिक',
    fortnightly: 'पाक्षिक',
    weekly: 'साप्ताहिक',
    yearly: 'वार्षिक',
    years: 'साल',
    noStrategySelected: 'कोई रणनीति चुनी नहीं गई',
    noStrategySelectedDesc: 'संयुक्त परिणाम देखने के लिए एक या अधिक रणनीति विकल्प चालू करें.',
    allSelectedStrategies: 'सभी चुनी गई रणनीतियाँ',
    allSelectedStrategiesDesc: 'यह आपके ऑफसेट खाते, अतिरिक्त भुगतान और एकमुश्त भुगतान को साथ जोड़ता है.',
    selectedComboDesc: 'यह कैलकुलेटर में चालू चुने गए रणनीति विकल्पों को जोड़ता है.',
    offset: 'ऑफसेट',
    extraRepayment: 'अतिरिक्त भुगतान',
    oneOffLumpSum: 'एकमुश्त भुगतान',
    paidOffMonthsSooner: (n) => `${n} महीने जल्दी चुकाया जाएगा`,
    monthSingular: 'महीना',
    monthPlural: 'महीने',
    yearSingular: 'साल',
    yearPlural: 'साल',
    monthlyBreakdownTitle: 'मासिक भुगतान विवरण',
    monthlyBreakdownSub: 'वर्तमान में चुनी गई रणनीति विकल्पों के आधार पर.',
    monthlyBreakdownBadge: 'चुनी गई रणनीति के बाद',
    monthlyRepaymentAfter: 'भुगतान',
    monthlyRepaymentHint: '',
    monthlyInterestPart: 'इस महीने ब्याज में',
    monthlyInterestHint: 'ऑफसेट और एकमुश्त भुगतान लागू होने के बाद.',
    monthlyPrincipalPart: 'इस महीने मूलधन में',
    monthlyPrincipalHint: 'वह हिस्सा जो लोन बैलेंस कम करता है.',
    monthlyInterestSaved: 'इस महीने बचा ब्याज',
    monthlySavedHint: 'बिना रणनीति की तुलना में.',
    donateStep1Title: "इस वेबसाइट को सपोर्ट करें",
    donateStep1Sub: "आपका दान डोमेन और रखरखाव लागत में मदद करता है.",
    donateSecure: "भुगतान Stripe द्वारा सुरक्षित रूप से संभाला जाता है. यह वेबसाइट कार्ड विवरण संग्रहीत नहीं करती.",
    donateStep2Title: "राशि चुनें और भुगतान करें",
    donateStep2Sub: "सुरक्षित Stripe checkout में अपनी दान राशि चुनें.",
    donateBankTitle: 'बैंक ट्रांसफर',
    donateBankSub: 'डायरेक्ट डिपॉजिट',
    donateAccountNameLabel: 'खाता नाम',
    donateBsbLabel: 'BSB',
    donateAccountNumberLabel: 'खाता नंबर',
    donateStep3Title: 'आपका दान',
    donateStep3Sub: 'आपके समर्थन के लिए धन्यवाद.',
    donateAmountLabel: 'राशि',
    donateTotalLabel: 'कुल',
    donateCopyButton: "जारी रखें",
    donateCopiedButton: "सुरक्षित भुगतान खुल रहा है",
    donateNote: "एक बार का दान • सुरक्षित Stripe checkout",
    donatePayIdTitle: "Pay ID",
    donatePayIdSub: "तेज़ बैंक भुगतान",
    donateApplePayTitle: "Apple Pay",
    donateApplePaySub: "वॉलेट भुगतान",
    donateCreditCardTitle: "क्रेडिट कार्ड",
    donateCreditCardSub: "कार्ड भुगतान",
    donatePaypalTitle: "PayPal",
    donatePaypalSub: "ऑनलाइन भुगतान",
    donateApplePayInfo: "जब आपका पेमेंट प्रोसेसर जोड़ा जाएगा तब Apple Pay जोड़ा जा सकेगा.",
    donateCreditCardInfo: "जब Stripe या कोई अन्य प्रोसेसर जोड़ा जाएगा तब क्रेडिट कार्ड पेमेंट जोड़ा जा सकेगा.",
    donatePaypalInfo: "जब आपका PayPal donation link जोड़ा जाएगा तब PayPal जोड़ा जा सकेगा.",
    donateMethodLabel: "भुगतान तरीका",
    donateMethodSummaryLabel: "तरीका",
    donateCardTitle: "सुरक्षित Stripe checkout",
    donateCardSub: "Stripe में $5, $10, $20, $50 या $100 चुनें.",
    donateCardMethod: "कार्ड",
    headerDonationText: "सहयोग करें",
    navHome: "होम",
    navAbout: "परिचय",
    navCalculator: "कैलकुलेटर",
    navGuide: "गाइड",
    navFaq: "सामान्य प्रश्न",
    navContact: "संपर्क",
    ctaPrimary: "शुरू करें",
    ctaSecondary: "यह कैसे काम करता है",
    datePlaceholder: 'दिन / महीना / साल',
    amountPlaceholder: 'राशि दर्ज करें',
    ratePlaceholder: 'दर दर्ज करें'
  },
  ur: {
    docTitle: 'مورگیج پلانر',
    brand: 'مورگیج پلانر',
    savePlan: 'پلان محفوظ کریں',
    heroTitle: '<span class="rtl-hero-line">بہتر <span class="hero-highlight">منصوبہ بنائیں.</span></span><span class="rtl-hero-line">اپنا مورگیج</span><span class="rtl-hero-line">جلدی ادا کریں.</span>',
    heroLead: "طاقتور planning tools اور واضح معلومات جو آپ کو پیسے بچانے اور مالی آزادی حاصل کرنے میں مدد دیں۔",
    benefit1: "ادائیگی ختم ہونے کی تاریخ دیکھیں",
    benefit2: "ہزاروں بچائیں",
    benefit3: "ٹریک پر رہیں",
    statLoan: 'موجودہ قرض بیلنس',
    statRate: 'سود کی شرح',
    statTerm: 'ادائیگی کی مدت',
    statFrequency: 'ادائیگی کی فریکوئنسی',
    statPayment: 'ادائیگی',
    calcTitle: 'مورگیج کیلکولیٹر',
    calcSub: 'ادائیگی کا وقت اندازہ کرنے کے لیے قرض کی تفصیلات درج کریں.',
    loanStartDate: 'قرض شروع ہونے کی تاریخ',
    dateHint: 'دن / مہینہ / سال',
    currentLoanBalance: 'موجودہ قرض بیلنس',
    interestRate: 'سود کی شرح',
    amortizationPeriod: 'ادائیگی کی مدت',
    repaymentFrequency: 'ادائیگی کی فریکوئنسی',
    strategiesTitle: 'حکمت عملی کے اختیارات',
    strategiesSub: 'حکمت عملیوں کا موازنہ کرنے کے لیے ایک یا زیادہ اختیارات منتخب کریں.',
    offsetTitle: 'آفسیٹ اکاؤنٹ بڑھائیں',
    offsetDesc: 'سود کم کرتا ہے.',
    use: 'استعمال کریں',
    currentOffset: 'موجودہ آفسیٹ / ری ڈرا',
    growOffsetBy: 'آفسیٹ میں اضافہ',
    growFrequency: 'اضافہ کی فریکوئنسی',
    extraTitle: 'اضافی ادائیگی',
    extraDesc: 'اضافی ادائیگی کریں.',
    extraAmount: 'اضافی رقم',
    howOften: 'کتنی بار',
    lumpTitle: 'ایک بار کی رقم',
    lumpDesc: 'قرض کم کرنے کی ایک ادائیگی.',
    lumpAmount: 'ایک بار کی رقم',
    interestComparison: 'سود کا موازنہ',
    interestComparisonSub: 'ہر حکمت عملی کو الگ دیکھیں، پھر منتخب اختیارات کے مشترکہ نتیجے سے موازنہ کریں.',
    clearComparison: 'واضح ساتھ ساتھ موازنہ',
    noStrategyBaseline: 'بغیر حکمت عملی بنیاد',
    baselineDesc: 'یہ اندازہ شدہ سود ہے جو آپ بغیر آفسیٹ، بغیر اضافی ادائیگی اور بغیر ایک بار کی رقم کے ادا کریں گے.',
    offsetOnly: 'صرف آفسیٹ اکاؤنٹ',
    offsetOnlyDesc: 'آپ کے آفسیٹ بیلنس اور آفسیٹ گروتھ کی بنیاد پر.',
    extraOnly: 'صرف اضافی ادائیگی',
    extraOnlyDesc: 'اضافی ادائیگی کی رقم اور فریکوئنسی کی بنیاد پر.',
    lumpOnly: 'صرف ایک بار کی رقم',
    lumpOnlyDesc: 'ابھی کی گئی ایک بار کی ادائیگی کی بنیاد پر.',
    interestPay: 'آپ جو سود ادا کریں گے',
    interestSave: 'آپ جو سود بچائیں گے',
    offsetCardP: 'دکھاتا ہے کہ آفسیٹ میں رقم رکھنے سے قرض کا سود کتنا کم ہوتا ہے.',
    extraCardP: 'دکھاتا ہے کہ عام ادائیگی کے علاوہ اضافی ادائیگی سے کتنی بچت ہوتی ہے.',
    lumpCardP: 'دکھاتا ہے کہ ایک بار کی ادائیگی سے کتنی سود بچت ہوتی ہے. اگر رقم $0 ہے تو بچت $0 ہوگی.',
    liveCombined: 'لائیو مشترکہ نتیجہ',
    interestPayShort: 'سود کی ادائیگی',
    payoffTime: 'ادائیگی کا وقت',
    newPayoffDate: 'نئی ادائیگی مکمل تاریخ',
    chartTitle: 'وقت کے ساتھ مورگیج بیلنس',
    legendNoStrategy: 'کوئی حکمت عملی نہیں',
    legendOffsetOnly: 'صرف آفسیٹ',
    legendAllSelected: 'تمام منتخب حکمت عملیاں',
    payoffNoStrategy: 'ادائیگی کا وقت (بغیر حکمت عملی)',
    payoffOffsetOnly: 'ادائیگی کا وقت (صرف آفسیٹ)',
    payoffAllSelected: 'ادائیگی کا وقت (منتخب اختیارات)',
    timeSaved: 'بچایا گیا وقت',
    footerLine: 'آج منصوبہ بنائیں. کل بہتر رہیں.',
    product: 'پروڈکٹ',
    calculator: 'کیلکولیٹر',
    savedPlans: 'محفوظ پلانز',
    resources: 'وسائل',
    guides: 'گائیڈز',
    faqs: 'عمومی سوالات',
    glossary: 'لغت',
    company: 'کمپنی',
    aboutUs: 'ہمارے بارے میں',
    contact: 'رابطہ',
    privacy: 'پرائیویسی',
    monthly: 'ماہانہ',
    fortnightly: 'پندرہ روزہ',
    weekly: 'ہفتہ وار',
    yearly: 'سالانہ',
    years: 'سال',
    noStrategySelected: 'کوئی حکمت عملی منتخب نہیں',
    noStrategySelectedDesc: 'مشترکہ نتیجہ دیکھنے کے لیے ایک یا زیادہ حکمت عملی کے اختیارات آن کریں.',
    allSelectedStrategies: 'تمام منتخب حکمت عملیاں',
    allSelectedStrategiesDesc: 'یہ آپ کے آفسیٹ اکاؤنٹ، اضافی ادائیگی اور ایک بار کی رقم کو اکٹھا کرتا ہے.',
    selectedComboDesc: 'یہ کیلکولیٹر میں آن منتخب حکمت عملیوں کو اکٹھا کرتا ہے.',
    offset: 'آفسیٹ',
    extraRepayment: 'اضافی ادائیگی',
    oneOffLumpSum: 'ایک بار کی رقم',
    paidOffMonthsSooner: (n) => `${n} ماہ پہلے ادا ہوگا`,
    monthSingular: 'ماہ',
    monthPlural: 'ماہ',
    yearSingular: 'سال',
    yearPlural: 'سال',
    monthlyBreakdownTitle: 'ماہانہ ادائیگی کی تفصیل',
    monthlyBreakdownSub: 'اس وقت منتخب حکمت عملی کے اختیارات کی بنیاد پر.',
    monthlyBreakdownBadge: 'منتخب حکمت عملی کے بعد',
    monthlyRepaymentAfter: 'ادائیگی',
    monthlyRepaymentHint: '',
    monthlyInterestPart: 'اس ماہ سود میں',
    monthlyInterestHint: 'آفسیٹ اور ایک بار کی رقم لاگو ہونے کے بعد.',
    monthlyPrincipalPart: 'اس ماہ اصل رقم میں',
    monthlyPrincipalHint: 'وہ حصہ جو قرض کا بیلنس کم کرتا ہے.',
    monthlyInterestSaved: 'اس ماہ بچا ہوا سود',
    monthlySavedHint: 'بغیر حکمت عملی کے مقابلے میں.',
    donateStep1Title: "اس ویب سائٹ کو سپورٹ کریں",
    donateStep1Sub: "آپ کی donation domain اور maintenance cost میں مدد دیتی ہے۔",
    donateSecure: "ادائیگیاں Stripe کے ذریعے محفوظ طریقے سے ہوتی ہیں. یہ ویب سائٹ card details محفوظ نہیں کرتی۔",
    donateStep2Title: "رقم منتخب کریں اور ادا کریں",
    donateStep2Sub: "محفوظ Stripe checkout میں donation amount منتخب کریں۔",
    donateBankTitle: 'بینک ٹرانسفر',
    donateBankSub: 'ڈائریکٹ ڈپازٹ',
    donateAccountNameLabel: 'اکاؤنٹ نام',
    donateBsbLabel: 'BSB',
    donateAccountNumberLabel: 'اکاؤنٹ نمبر',
    donateStep3Title: 'آپ کی donation',
    donateStep3Sub: 'آپ کے تعاون کا شکریہ.',
    donateAmountLabel: 'رقم',
    donateTotalLabel: 'کل',
    donateCopyButton: "جاری رکھیں",
    donateCopiedButton: "محفوظ checkout کھل رہا ہے",
    donateNote: "ایک بار کی donation • محفوظ Stripe checkout",
    donatePayIdTitle: "Pay ID",
    donatePayIdSub: "تیز بینک ادائیگی",
    donateApplePayTitle: "Apple Pay",
    donateApplePaySub: "والیٹ ادائیگی",
    donateCreditCardTitle: "کریڈٹ کارڈ",
    donateCreditCardSub: "کارڈ ادائیگی",
    donatePaypalTitle: "PayPal",
    donatePaypalSub: "آن لائن ادائیگی",
    donateApplePayInfo: "جب آپ کا payment processor شامل ہوگا تب Apple Pay جوڑا جا سکے گا۔",
    donateCreditCardInfo: "جب Stripe یا کوئی اور processor شامل ہوگا تب credit card payment جوڑی جا سکے گی۔",
    donatePaypalInfo: "جب آپ کا PayPal donation link شامل ہوگا تب PayPal جوڑا جا سکے گا۔",
    donateMethodLabel: "ادائیگی کا طریقہ",
    donateMethodSummaryLabel: "طریقہ",
    donateCardTitle: "محفوظ Stripe checkout",
    donateCardSub: "Stripe میں $5، $10، $20، $50 یا $100 منتخب کریں۔",
    donateCardMethod: "کارڈ",
    headerDonationText: "ہماری مدد کریں",
    navHome: "ہوم",
    navAbout: "تعارف",
    navCalculator: "کیلکولیٹر",
    navGuide: "گائیڈ",
    navFaq: "سوالات",
    navContact: "رابطہ",
    ctaPrimary: "شروع کریں",
    ctaSecondary: "یہ کیسے کام کرتا ہے",
    datePlaceholder: 'دن / مہینہ / سال',
    amountPlaceholder: 'رقم درج کریں',
    ratePlaceholder: 'شرح درج کریں'
  },
  zh: {
    docTitle: '房贷规划器',
    brand: '房贷规划器',
    savePlan: '保存计划',
    heroTitle: '更聪明地<span>规划。</span><br>更快还清房贷。',
    heroLead: "强大的规划工具和清晰的洞察，帮助你省钱并实现财务自由。",
    benefit1: "查看还清日期",
    benefit2: "节省数千元",
    benefit3: "保持进度",
    statLoan: '当前贷款余额',
    statRate: '利率',
    statTerm: '摊还期限',
    statFrequency: '还款频率',
    statPayment: '还款额',
    calcTitle: '房贷计算器',
    calcSub: '输入贷款信息，估算还清时间。',
    loanStartDate: '贷款开始日期',
    dateHint: '日 / 月 / 年',
    currentLoanBalance: '当前贷款余额',
    interestRate: '利率',
    amortizationPeriod: '摊还期限',
    repaymentFrequency: '还款频率',
    strategiesTitle: '策略选项',
    strategiesSub: '选择一个或多个选项来比较策略。',
    offsetTitle: '增加抵消账户',
    offsetDesc: '减少利息。',
    use: '使用',
    currentOffset: '当前抵消 / redraw',
    growOffsetBy: '抵消账户增加',
    growFrequency: '增加频率',
    extraTitle: '额外还款',
    extraDesc: '增加额外还款。',
    extraAmount: '额外金额',
    howOften: '频率',
    lumpTitle: '一次性还款',
    lumpDesc: '一次付款减少贷款。',
    lumpAmount: '一次性金额',
    interestComparison: '利息比较',
    interestComparisonSub: '单独查看每个策略，再与所选选项的组合结果比较。',
    clearComparison: '清晰并排比较',
    noStrategyBaseline: '无策略基准',
    baselineDesc: '这是在没有抵消账户、额外还款和一次性还款时预计需要支付的利息。',
    offsetOnly: '仅抵消账户',
    offsetOnlyDesc: '基于你的抵消账户余额和增长。',
    extraOnly: '仅额外还款',
    extraOnlyDesc: '基于额外还款金额和频率。',
    lumpOnly: '仅一次性还款',
    lumpOnlyDesc: '基于现在进行的一次性付款。',
    interestPay: '你支付的利息',
    interestSave: '你节省的利息',
    offsetCardP: '显示把资金放在抵消账户中可减少多少贷款利息。',
    extraCardP: '显示在正常还款之外额外还款能节省多少利息。',
    lumpCardP: '显示一次性还款能节省多少利息。如果金额为 $0，节省为 $0。',
    liveCombined: '实时组合结果',
    interestPayShort: '支付利息',
    payoffTime: '还清时间',
    newPayoffDate: '新的还清日期',
    chartTitle: '房贷余额随时间变化',
    legendNoStrategy: '无策略',
    legendOffsetOnly: '仅抵消',
    legendAllSelected: '所有已选策略',
    payoffNoStrategy: '还清时间（无策略）',
    payoffOffsetOnly: '还清时间（仅抵消）',
    payoffAllSelected: '还清时间（已选选项）',
    timeSaved: '节省时间',
    footerLine: '今天规划，明天更轻松。',
    product: '产品',
    calculator: '计算器',
    savedPlans: '已保存计划',
    resources: '资源',
    guides: '指南',
    faqs: '常见问题',
    glossary: '术语表',
    company: '公司',
    aboutUs: '关于我们',
    contact: '联系',
    privacy: '隐私',
    monthly: '每月',
    fortnightly: '每两周',
    weekly: '每周',
    yearly: '每年',
    years: '年',
    noStrategySelected: '未选择策略',
    noStrategySelectedDesc: '开启一个或多个策略选项以查看组合结果。',
    allSelectedStrategies: '所有已选策略',
    allSelectedStrategiesDesc: '这会组合你的抵消账户、额外还款和一次性还款。',
    selectedComboDesc: '这会组合计算器中当前开启的策略选项。',
    offset: '抵消',
    extraRepayment: '额外还款',
    oneOffLumpSum: '一次性还款',
    paidOffMonthsSooner: (n) => `提前 ${n} 个月还清`,
    monthSingular: '个月',
    monthPlural: '个月',
    yearSingular: '年',
    yearPlural: '年',
    monthlyBreakdownTitle: '每月还款明细',
    monthlyBreakdownSub: '基于当前选择的策略选项。',
    monthlyBreakdownBadge: '应用所选策略后',
    monthlyRepaymentAfter: '还款',
    monthlyRepaymentHint: '',
    monthlyInterestPart: '本月支付利息',
    monthlyInterestHint: '应用抵消账户和一次性还款后。',
    monthlyPrincipalPart: '本月偿还本金',
    monthlyPrincipalHint: '用于减少贷款余额的部分。',
    monthlyInterestSaved: '本月节省利息',
    monthlySavedHint: '与无策略相比。',
    donateStep1Title: "支持本网站",
    donateStep1Sub: "你的捐助有助于支付域名和维护费用。",
    donateSecure: "付款由 Stripe 安全处理。本网站不会存储银行卡信息。",
    donateStep2Title: "选择金额并付款",
    donateStep2Sub: "在安全的 Stripe 结账中选择捐助金额。",
    donateBankTitle: '银行转账',
    donateBankSub: '直接存款',
    donateAccountNameLabel: '账户名',
    donateBsbLabel: 'BSB',
    donateAccountNumberLabel: '账号',
    donateStep3Title: '你的捐助',
    donateStep3Sub: '感谢你的支持。',
    donateAmountLabel: '金额',
    donateTotalLabel: '总计',
    donateCopyButton: "继续",
    donateCopiedButton: "正在打开安全结账",
    donateNote: "一次性捐助 • 安全 Stripe 结账",
    donatePayIdTitle: "Pay ID",
    donatePayIdSub: "快速银行付款",
    donateApplePayTitle: "Apple Pay",
    donateApplePaySub: "钱包付款",
    donateCreditCardTitle: "信用卡",
    donateCreditCardSub: "银行卡付款",
    donatePaypalTitle: "PayPal",
    donatePaypalSub: "在线付款",
    donateApplePayInfo: "添加支付处理器后即可连接 Apple Pay。",
    donateCreditCardInfo: "添加 Stripe 或其他处理器后即可连接信用卡付款。",
    donatePaypalInfo: "添加 PayPal 捐助链接后即可连接 PayPal。",
    donateMethodLabel: "付款方式",
    donateMethodSummaryLabel: "方式",
    donateCardTitle: "安全 Stripe 结账",
    donateCardSub: "在 Stripe 中选择 $5、$10、$20、$50 或 $100。",
    donateCardMethod: "银行卡",
    headerDonationText: "支持我们",
    navHome: "首页",
    navAbout: "关于",
    navCalculator: "计算器",
    navGuide: "指南",
    navFaq: "常见问题",
    navContact: "联系",
    ctaPrimary: "开始使用",
    ctaSecondary: "了解如何运作",
    datePlaceholder: '日 / 月 / 年',
    amountPlaceholder: '输入金额',
    ratePlaceholder: '输入利率'
  },
  es: {
    docTitle: 'Planificador de hipoteca',
    brand: 'Planificador de hipoteca',
    savePlan: 'Guardar plan',
    heroTitle: 'Planifica <span>mejor.</span><br>Paga tu hipoteca antes.',
    heroLead: "Herramientas potentes y claridad para ayudarte a ahorrar dinero y lograr libertad financiera.",
    benefit1: "Mira tu fecha de pago final",
    benefit2: "Ahorra miles",
    benefit3: "Mantente al día",
    statLoan: 'Saldo actual del préstamo',
    statRate: 'Tasa de interés',
    statTerm: 'Período de amortización',
    statFrequency: 'Frecuencia de pago',
    statPayment: 'Pago',
    calcTitle: 'Calculadora hipotecaria',
    calcSub: 'Ingresa los detalles de tu préstamo para estimar cuándo lo pagarás.',
    loanStartDate: 'Fecha de inicio del préstamo',
    dateHint: 'Día / Mes / Año',
    currentLoanBalance: 'Saldo actual del préstamo',
    interestRate: 'Tasa de interés',
    amortizationPeriod: 'Período de amortización',
    repaymentFrequency: 'Frecuencia de pago',
    strategiesTitle: 'Opciones de estrategia',
    strategiesSub: 'Elige una o más opciones para comparar estrategias.',
    offsetTitle: 'Aumentar cuenta offset',
    offsetDesc: 'Reduce el interés cobrado.',
    use: 'Usar',
    currentOffset: 'Offset / redraw actual',
    growOffsetBy: 'Aumentar offset en',
    growFrequency: 'Frecuencia de aumento',
    extraTitle: 'Pago extra',
    extraDesc: 'Agrega pagos extra.',
    extraAmount: 'Monto extra',
    howOften: 'Frecuencia',
    lumpTitle: 'Pago único',
    lumpDesc: 'Un pago para reducir el préstamo.',
    lumpAmount: 'Monto del pago único',
    interestComparison: 'Comparación de intereses',
    interestComparisonSub: 'Mira cada estrategia por separado y compárala con el resultado combinado de las opciones seleccionadas.',
    clearComparison: 'Comparación clara lado a lado',
    noStrategyBaseline: 'Base sin estrategia',
    baselineDesc: 'Este es el interés estimado que pagarías si mantienes el préstamo igual, sin offset, sin pagos extra y sin pago único.',
    offsetOnly: 'Solo cuenta offset',
    offsetOnlyDesc: 'Basado en tu saldo offset y su crecimiento.',
    extraOnly: 'Solo pago extra',
    extraOnlyDesc: 'Basado en el monto extra y la frecuencia.',
    lumpOnly: 'Solo pago único',
    lumpOnlyDesc: 'Basado en un pago único realizado ahora.',
    interestPay: 'Interés que pagas',
    interestSave: 'Interés que ahorras',
    offsetCardP: 'Muestra cuánto se reduce el interés al mantener dinero en la cuenta offset.',
    extraCardP: 'Muestra el ahorro de intereses al pagar extra además del pago normal.',
    lumpCardP: 'Muestra el ahorro de intereses de un pago único. Si el monto es $0, el ahorro será $0.',
    liveCombined: 'Resultado combinado en vivo',
    interestPayShort: 'Interés que pagas',
    payoffTime: 'Tiempo para pagar',
    newPayoffDate: 'Nueva fecha de pago final',
    chartTitle: 'Saldo de la hipoteca en el tiempo',
    legendNoStrategy: 'Sin estrategia',
    legendOffsetOnly: 'Solo offset',
    legendAllSelected: 'Todas las estrategias seleccionadas',
    payoffNoStrategy: 'Tiempo de pago (sin estrategia)',
    payoffOffsetOnly: 'Tiempo de pago (solo offset)',
    payoffAllSelected: 'Tiempo de pago (seleccionadas)',
    timeSaved: 'Tiempo ahorrado',
    footerLine: 'Planifica hoy. Disfruta mañana.',
    product: 'Producto',
    calculator: 'Calculadora',
    savedPlans: 'Planes guardados',
    resources: 'Recursos',
    guides: 'Guías',
    faqs: 'Preguntas frecuentes',
    glossary: 'Glosario',
    company: 'Empresa',
    aboutUs: 'Sobre nosotros',
    contact: 'Contacto',
    privacy: 'Privacidad',
    monthly: 'Mensual',
    fortnightly: 'Quincenal',
    weekly: 'Semanal',
    yearly: 'Anual',
    years: 'años',
    noStrategySelected: 'Ninguna estrategia seleccionada',
    noStrategySelectedDesc: 'Activa una o más estrategias para ver el resultado combinado.',
    allSelectedStrategies: 'Todas las estrategias seleccionadas',
    allSelectedStrategiesDesc: 'Combina tu cuenta offset, pago extra y pago único.',
    selectedComboDesc: 'Combina las estrategias actualmente activadas en la calculadora.',
    offset: 'Offset',
    extraRepayment: 'Pago extra',
    oneOffLumpSum: 'Pago único',
    paidOffMonthsSooner: (n) => `Pagado ${n} meses antes`,
    monthSingular: 'mes',
    monthPlural: 'meses',
    yearSingular: 'año',
    yearPlural: 'años',
    monthlyBreakdownTitle: 'Desglose del pago mensual',
    monthlyBreakdownSub: 'Basado en las estrategias seleccionadas actualmente.',
    monthlyBreakdownBadge: 'Después de la estrategia seleccionada',
    monthlyRepaymentAfter: 'Pago',
    monthlyRepaymentHint: '',
    monthlyInterestPart: 'Este mes a intereses',
    monthlyInterestHint: 'Después de aplicar offset y pago único.',
    monthlyPrincipalPart: 'Este mes a capital',
    monthlyPrincipalHint: 'La parte que reduce el saldo del préstamo.',
    monthlyInterestSaved: 'Interés ahorrado este mes',
    monthlySavedHint: 'Comparado con no usar estrategia.',
    donateStep1Title: "Apoya este sitio web",
    donateStep1Sub: "Tu donación ayuda a cubrir los costos del dominio y mantenimiento.",
    donateSecure: "Los pagos se procesan de forma segura con Stripe. Este sitio no guarda datos de tarjetas.",
    donateStep2Title: "Elige monto y paga",
    donateStep2Sub: "Selecciona tu monto en el pago seguro de Stripe.",
    donateBankTitle: 'Transferencia bancaria',
    donateBankSub: 'Depósito directo',
    donateAccountNameLabel: 'Nombre de cuenta',
    donateBsbLabel: 'BSB',
    donateAccountNumberLabel: 'Número de cuenta',
    donateStep3Title: 'Tu donación',
    donateStep3Sub: 'Gracias por tu apoyo.',
    donateAmountLabel: 'Monto',
    donateTotalLabel: 'Total',
    donateCopyButton: "Continuar",
    donateCopiedButton: "Abriendo pago seguro",
    donateNote: "Donación única • Pago seguro de Stripe",
    donatePayIdTitle: "Pay ID",
    donatePayIdSub: "Pago bancario rápido",
    donateApplePayTitle: "Apple Pay",
    donateApplePaySub: "Pago con billetera",
    donateCreditCardTitle: "Tarjeta de crédito",
    donateCreditCardSub: "Pago con tarjeta",
    donatePaypalTitle: "PayPal",
    donatePaypalSub: "Pago en línea",
    donateApplePayInfo: "Apple Pay se puede conectar una vez que agregues tu procesador de pagos.",
    donateCreditCardInfo: "Los pagos con tarjeta se pueden conectar una vez que agregues Stripe u otro procesador.",
    donatePaypalInfo: "PayPal se puede conectar una vez que agregues tu enlace de donación de PayPal.",
    donateMethodLabel: "Método de pago",
    donateMethodSummaryLabel: "Método",
    donateCardTitle: "Pago seguro de Stripe",
    donateCardSub: "Elige $5, $10, $20, $50 o $100 en Stripe.",
    donateCardMethod: "Tarjeta",
    headerDonationText: "Apóyanos",
    navHome: "Inicio",
    navAbout: "Acerca de",
    navCalculator: "Calculadora",
    navGuide: "Guía",
    navFaq: "Preguntas",
    navContact: "Contacto",
    ctaPrimary: "Comenzar",
    ctaSecondary: "Cómo funciona",
    datePlaceholder: 'Día / Mes / Año',
    amountPlaceholder: 'Ingresa monto',
    ratePlaceholder: 'Ingresa tasa'
  }
};

const RTL_LANGS = ['fa', 'ur'];

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function isRTL() {
  return RTL_LANGS.includes(currentLang);
}

function localeCode() {
  const map = { en:'en-AU', fa:'fa-AF', hi:'hi-IN', ur:'ur-PK', zh:'zh-CN', es:'es-ES' };
  return map[currentLang] || 'en-AU';
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


function setTextBySelector(selector, value) {
  const el = document.querySelector(selector);
  if (el && value != null) el.textContent = value;
}

function setStaticText() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRTL());
  document.title = t('docTitle');

  const langSelect = $('languageSelect');
  if (langSelect) langSelect.value = currentLang;

  setHTML('.header .brand-text', t('brand'));
  setText('headerDonationText', t('headerDonationText') || t('support') || 'Support Us');
  setText('navHome', t('navHome'));
  setText('navAbout', t('navAbout'));
  setText('navCalculator', t('navCalculator'));
  setText('navGuide', t('navGuide'));
  setText('navFaq', t('navFaq'));
  setText('navContact', t('navContact'));
  setHTML('.hero-overlay-copy h1', t('heroTitle'));
  setHTML('.hero-overlay-copy .lead', t('heroLead'));
  const ctaPrimaryText = document.querySelector('#ctaPrimary span'); if (ctaPrimaryText) ctaPrimaryText.textContent = t('ctaPrimary');
  const ctaSecondaryText = document.querySelector('#ctaSecondary span'); if (ctaSecondaryText) ctaSecondaryText.textContent = t('ctaSecondary');

  const benefits = document.querySelectorAll('.benefit strong');
  [t('benefit1'), t('benefit2'), t('benefit3')].forEach((txt, i) => { if (benefits[i]) benefits[i].innerHTML = txt; });

  setTextBySelector('.footer-title', t('brand'));
  setTextBySelector('.footer-tagline', currentLang === 'fa' ? 'امروز برنامه‌ریزی کنید. فردا آسوده‌تر باشید.' : currentLang === 'ur' ? 'آج منصوبہ بنائیں۔ کل بہتر گزاریں۔' : currentLang === 'zh' ? '今天规划，明天更轻松。' : currentLang === 'hi' ? 'आज योजना बनाएं। कल बेहतर जिएं।' : currentLang === 'es' ? 'Planifica hoy. Disfruta mañana.' : 'Plan today. Enjoy tomorrow.');

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
  setupDonationSection();
  update();
});

