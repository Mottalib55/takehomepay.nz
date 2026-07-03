# Validation — takehomepay.nz

## Sources

- [Inland Revenue (IRD)](https://www.ird.govt.nz)
- [Employment New Zealand](https://www.employment.govt.nz)

---

## Test Case 1: Median salary, KiwiSaver 3%

**Input:** Gross $60,000, KiwiSaver 3%, tax code M, no student loan
**Expected:**
- PAYE: $14,000 x 10.5% + $20,000 x 17.5% + $14,000 x 30% + $12,000 x 33% = ~$13,130
- ACC levy: ~$960
- KiwiSaver: $1,800
- **Net: ~$44,110**

**Source:** ird.govt.nz PAYE tables 2025-2026

### Test Case 2: Higher salary with student loan

**Input:** Gross $90,000, KiwiSaver 4%, student loan
**Expected:**
- Student loan: ($90,000 - $22,828) x 12% = ~$8,061
- **Student loan significantly reduces take-home**

### Test Case 3: KiwiSaver rate comparison at $70,000

**Input:** Gross $70,000, compare 3% vs 6% vs 10%
**Verification:**
- 3%: $2,100 employee, employer 3% ($2,100)
- 10%: $7,000 employee, employer still 3% ($2,100)
- **Higher rate = lower take-home but better retirement savings**

---

## Build status

- **Build:** 30 pages, 0 errors
- **Tests:** 25/25 passed
- **Sitemap:** auto-generated (sitemap-index.xml)

## Page inventory (30 pages)

| Category | Count | Details |
|---|---|---|
| Home + legal | 3 | index, legal, privacy |
| Tool pages | 1 | faq |
| Guides index | 1 | /guides/ |
| Guide articles | 8 | paye-tax-nz, kiwisaver-guide, student-loan-repayment-nz, acc-levy, tax-codes-nz, secondary-income-tax, first-job-new-zealand, nz-vs-australia-salary |
| Salary pages | 12 | salary-[amount] (30000 through 200000) |
| KiwiSaver pages | 5 | kiwisaver-[rate] (3-percent through 10-percent) |

## Components

- SalaryCalculator.tsx (NZ PAYE/ACC/KiwiSaver/student loan calculator)

## Data files

- tax-rates-2026.ts — PAYE brackets, ACC levy, KiwiSaver rates, student loan threshold
- salaries-data.ts — 12 salary entries with pre-calculated examples
- kiwisaver-data.ts — 5 KiwiSaver rate entries

## Quality gates

- [x] Build passes (30 pages, 0 errors)
- [x] Tests pass (25/25)
- [x] Sitemap generated
- [x] Schema.org on every page (WebApplication, FAQPage, BreadcrumbList)
- [x] Analytics: Plausible + GA4 placeholder
- [x] robots.txt present
- [x] llms.txt present
- [x] All guide pages > 1500 words
- [x] Disclaimer in footer
- [x] Mobile-responsive navigation (hamburger menu)
- [x] Internal cross-linking between tools and guides
