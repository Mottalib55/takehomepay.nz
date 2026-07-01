/**
 * New Zealand Tax Rates & Deduction Data for the 2025-2026 Tax Year
 * Tax year: 1 April 2025 – 31 March 2026
 *
 * Source: Inland Revenue Department (IRD) New Zealand
 */

/** PAYE Income Tax Brackets */
export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const PAYE_BRACKETS: TaxBracket[] = [
  { min: 0, max: 15_600, rate: 0.105 },
  { min: 15_600, max: 53_500, rate: 0.175 },
  { min: 53_500, max: 78_100, rate: 0.30 },
  { min: 78_100, max: 180_000, rate: 0.33 },
  { min: 180_000, max: Infinity, rate: 0.39 },
];

/** ACC Earner's Levy */
export const ACC_EARNER_LEVY_RATE = 0.016; // 1.60%
export const ACC_EARNER_LEVY_MAX_EARNINGS = 142_283; // Maximum liable earnings

/** KiwiSaver contribution rates available to employees */
export const KIWISAVER_EMPLOYEE_RATES = [0.03, 0.04, 0.06, 0.08, 0.10] as const;
export type KiwiSaverRate = (typeof KIWISAVER_EMPLOYEE_RATES)[number];

/** Employer minimum contribution rate */
export const KIWISAVER_EMPLOYER_MIN_RATE = 0.03; // 3%

/** Employer Superannuation Contribution Tax (ESCT) rates */
export interface ESCTBracket {
  min: number;
  max: number;
  rate: number;
}

export const ESCT_BRACKETS: ESCTBracket[] = [
  { min: 0, max: 16_800, rate: 0.105 },
  { min: 16_800, max: 57_600, rate: 0.175 },
  { min: 57_600, max: 84_000, rate: 0.30 },
  { min: 84_000, max: Infinity, rate: 0.33 },
];

/** Student Loan Repayment */
export const STUDENT_LOAN_REPAYMENT_RATE = 0.12; // 12%
export const STUDENT_LOAN_THRESHOLD = 22_828; // Annual repayment threshold

/** Independent Earner Tax Credit (IETC) */
export const IETC_AMOUNT = 520; // $520 per year
export const IETC_MIN_INCOME = 24_000;
export const IETC_MAX_INCOME = 48_000;
export const IETC_ABATEMENT_START = 44_000;
export const IETC_ABATEMENT_RATE = 0.13; // 13 cents per dollar over $44,000

/** Minimum Wage */
export const MINIMUM_WAGE_HOURLY = 23.15;
export const STANDARD_HOURS_PER_WEEK = 40;
export const WEEKS_PER_YEAR = 52;
export const FORTNIGHTS_PER_YEAR = 26;
export const MONTHS_PER_YEAR = 12;

/** Working for Families Tax Credits (summary rates) */
export interface WFFCRate {
  type: string;
  description: string;
  maxWeeklyAmount: number;
  abatementThreshold: number;
  abatementRate: number;
}

export const WORKING_FOR_FAMILIES: WFFCRate[] = [
  {
    type: "FTC",
    description: "Family Tax Credit - first child (0-15)",
    maxWeeklyAmount: 127.73,
    abatementThreshold: 42_700,
    abatementRate: 0.27,
  },
  {
    type: "FTC_SUBSEQUENT",
    description: "Family Tax Credit - subsequent children (0-15)",
    maxWeeklyAmount: 104.08,
    abatementThreshold: 42_700,
    abatementRate: 0.27,
  },
  {
    type: "IWTC",
    description: "In-Work Tax Credit (must work 20+ hrs/wk)",
    maxWeeklyAmount: 72.50,
    abatementThreshold: 42_700,
    abatementRate: 0.27,
  },
  {
    type: "BEST_START",
    description: "Best Start Tax Credit (children under 3)",
    maxWeeklyAmount: 73.08,
    abatementThreshold: 79_000,
    abatementRate: 0.21,
  },
];

/** Tax codes for PAYE purposes */
export const TAX_CODES = {
  M: "Primary employment",
  ME: "Primary employment with IETC",
  MSL: "Primary employment with student loan",
  MESL: "Primary employment with IETC and student loan",
  S: "Secondary employment (no threshold)",
  SH: "Secondary employment at higher rate",
  ST: "Secondary employment at top rate",
} as const;
