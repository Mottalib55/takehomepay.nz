# TakeHomePay.nz — Validation Document

## Project Overview
New Zealand salary calculator website for the 2025-2026 tax year (1 April 2025 – 31 March 2026).

## Tech Stack
- **Framework**: Astro 5+ with static site generation
- **UI**: React 19 with interactive calculator component
- **Styling**: Tailwind CSS v4 via @tailwindcss/vite plugin
- **Testing**: Vitest with 12+ unit tests
- **Language**: TypeScript (strict mode)

## Tax Rates & Data Sources

### PAYE Income Tax Brackets (2025-2026)
| Bracket | Rate |
|---------|------|
| $0 – $15,600 | 10.5% |
| $15,601 – $53,500 | 17.5% |
| $53,501 – $78,100 | 30.0% |
| $78,101 – $180,000 | 33.0% |
| $180,001+ | 39.0% |

Source: [IRD - Tax rates for individuals](https://www.ird.govt.nz/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/tax-rates-for-individuals)

### ACC Earner's Levy
- Rate: 1.60% of liable earnings
- Maximum liable earnings: ~$142,283/year
- Source: [ACC Levy rates](https://www.acc.co.nz/about-us/levy-rates/)

### KiwiSaver
- Employee rates: 3%, 4%, 6%, 8%, or 10%
- Employer minimum: 3%
- Source: [KiwiSaver contribution rates](https://www.ird.govt.nz/kiwisaver/kiwisaver-employers/employer-contributions)

### Student Loan Repayments
- Rate: 12% on income above threshold
- Annual threshold: $22,828
- Source: [IRD Student Loans](https://www.ird.govt.nz/student-loans/repaying)

### Independent Earner Tax Credit (IETC)
- Amount: $520/year
- Income range: $24,000 – $48,000
- Abatement: 13c/$1 above $44,000
- Source: [IRD IETC](https://www.ird.govt.nz/income-tax/income-tax-for-individuals/individual-tax-credits/independent-earner-tax-credit)

### Minimum Wage
- Adult rate: $23.15/hour
- Source: [Employment NZ](https://www.employment.govt.nz/hours-and-wages/pay/minimum-wage/)

## Test Coverage
- PAYE calculation across all 5 brackets
- Zero and negative income edge cases
- ACC levy calculation and cap verification
- KiwiSaver employee and employer contributions at multiple rates
- Student loan repayment threshold and calculation
- IETC full credit, abatement, and out-of-range
- Marginal tax rate determination
- Full salary integration tests (resident vs non-resident, with/without student loan)

## Pages
1. **/** — Home page with interactive calculator and 1500+ words of educational content
2. **/faq/** — Frequently asked questions about NZ tax and salary
3. **/legal/** — Legal disclaimer
4. **/privacy/** — Privacy policy

## Build & Deploy
```bash
npm install
npm test        # Run Vitest test suite
npm run build   # Astro static build to dist/
```

## Validation Checklist
- [x] All PAYE brackets match IRD published rates
- [x] ACC levy rate and cap are current
- [x] KiwiSaver rates match available options
- [x] Student loan threshold and rate are current
- [x] IETC amount and abatement rules are correct
- [x] Minimum wage is current
- [x] Progressive tax calculation is mathematically correct
- [x] 12+ unit tests pass
- [x] All pages render correctly
- [x] Calculator provides annual/monthly/fortnightly/weekly views
- [x] Responsive design works on mobile and desktop
