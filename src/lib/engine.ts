/**
 * New Zealand Salary Calculation Engine
 *
 * Calculates PAYE income tax, ACC Earner's Levy, KiwiSaver contributions,
 * Student Loan repayments, and Independent Earner Tax Credit for NZ employees.
 */

import {
  PAYE_BRACKETS,
  ACC_EARNER_LEVY_RATE,
  ACC_EARNER_LEVY_MAX_EARNINGS,
  KIWISAVER_EMPLOYER_MIN_RATE,
  STUDENT_LOAN_REPAYMENT_RATE,
  STUDENT_LOAN_THRESHOLD,
  IETC_AMOUNT,
  IETC_MIN_INCOME,
  IETC_MAX_INCOME,
  IETC_ABATEMENT_START,
  IETC_ABATEMENT_RATE,
  WEEKS_PER_YEAR,
  FORTNIGHTS_PER_YEAR,
  MONTHS_PER_YEAR,
  type KiwiSaverRate,
} from "./tax-rates-2026.js";

/* ──────────────────────────── Types ──────────────────────────── */

export interface SalaryInput {
  annualGross: number;
  kiwiSaverRate: KiwiSaverRate;
  hasStudentLoan: boolean;
  isResident: boolean;
}

export interface SalaryResult {
  grossAnnual: number;
  grossMonthly: number;
  grossFortnightly: number;
  grossWeekly: number;

  paye: number;
  accLevy: number;
  kiwiSaverEmployee: number;
  kiwiSaverEmployer: number;
  studentLoanRepayment: number;
  ietc: number;

  totalDeductions: number;

  netAnnual: number;
  netMonthly: number;
  netFortnightly: number;
  netWeekly: number;

  effectiveTaxRate: number;
  marginalTaxRate: number;
}

/* ──────────────────────── Core Functions ──────────────────────── */

/**
 * Calculate PAYE income tax using progressive brackets.
 */
export function calculatePAYE(annualIncome: number): number {
  if (annualIncome <= 0) return 0;

  let tax = 0;

  for (const bracket of PAYE_BRACKETS) {
    if (annualIncome <= bracket.min) break;

    const taxableInBracket = Math.min(annualIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }

  return Math.round(tax * 100) / 100;
}

/**
 * Calculate ACC Earner's Levy (capped at maximum liable earnings).
 */
export function calculateACC(annualIncome: number): number {
  if (annualIncome <= 0) return 0;

  const liableEarnings = Math.min(annualIncome, ACC_EARNER_LEVY_MAX_EARNINGS);
  const levy = liableEarnings * ACC_EARNER_LEVY_RATE;

  return Math.round(levy * 100) / 100;
}

/**
 * Calculate KiwiSaver employee and employer contributions.
 */
export function calculateKiwiSaver(
  annualIncome: number,
  employeeRate: KiwiSaverRate
): { employee: number; employer: number } {
  if (annualIncome <= 0) return { employee: 0, employer: 0 };

  const employee = Math.round(annualIncome * employeeRate * 100) / 100;
  const employer =
    Math.round(annualIncome * KIWISAVER_EMPLOYER_MIN_RATE * 100) / 100;

  return { employee, employer };
}

/**
 * Calculate Student Loan repayment amount.
 * 12% on every dollar earned above the $22,828 annual threshold.
 */
export function calculateStudentLoan(annualIncome: number): number {
  if (annualIncome <= STUDENT_LOAN_THRESHOLD) return 0;

  const repayment =
    (annualIncome - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_REPAYMENT_RATE;
  return Math.round(repayment * 100) / 100;
}

/**
 * Calculate Independent Earner Tax Credit (IETC).
 * Full $520 for income $24,000–$44,000, then abates at 13c/$1 until $48,000.
 */
export function calculateIETC(annualIncome: number): number {
  if (annualIncome < IETC_MIN_INCOME || annualIncome > IETC_MAX_INCOME) {
    return 0;
  }

  if (annualIncome <= IETC_ABATEMENT_START) {
    return IETC_AMOUNT;
  }

  // Abatement: reduce by 13c for every dollar over $44,000
  const abatement =
    (annualIncome - IETC_ABATEMENT_START) * IETC_ABATEMENT_RATE;
  const credit = IETC_AMOUNT - abatement;

  return Math.round(Math.max(credit, 0) * 100) / 100;
}

/**
 * Determine the marginal tax rate for a given income.
 */
export function getMarginalRate(annualIncome: number): number {
  if (annualIncome <= 0) return 0;

  for (let i = PAYE_BRACKETS.length - 1; i >= 0; i--) {
    if (annualIncome > PAYE_BRACKETS[i].min) {
      return PAYE_BRACKETS[i].rate;
    }
  }

  return PAYE_BRACKETS[0].rate;
}

/* ──────────────────── Main Calculation ──────────────────── */

/**
 * Calculate complete salary breakdown from gross to net.
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualGross, kiwiSaverRate, hasStudentLoan, isResident } = input;

  // PAYE
  const paye = calculatePAYE(annualGross);

  // ACC Earner's Levy
  const accLevy = calculateACC(annualGross);

  // KiwiSaver
  const kiwiSaver = calculateKiwiSaver(annualGross, kiwiSaverRate);

  // Student Loan
  const studentLoanRepayment = hasStudentLoan
    ? calculateStudentLoan(annualGross)
    : 0;

  // IETC (only for residents not on Working for Families)
  const ietc = isResident ? calculateIETC(annualGross) : 0;

  // Total deductions (IETC reduces tax)
  const totalDeductions =
    paye + accLevy + kiwiSaver.employee + studentLoanRepayment - ietc;

  // Net income
  const netAnnual = Math.round((annualGross - totalDeductions) * 100) / 100;

  // Effective tax rate (all deductions except KiwiSaver since it goes to your account)
  const taxDeductions = paye + accLevy + studentLoanRepayment - ietc;
  const effectiveTaxRate =
    annualGross > 0
      ? Math.round((taxDeductions / annualGross) * 10000) / 10000
      : 0;

  const marginalTaxRate = getMarginalRate(annualGross);

  return {
    grossAnnual: annualGross,
    grossMonthly: Math.round((annualGross / MONTHS_PER_YEAR) * 100) / 100,
    grossFortnightly:
      Math.round((annualGross / FORTNIGHTS_PER_YEAR) * 100) / 100,
    grossWeekly: Math.round((annualGross / WEEKS_PER_YEAR) * 100) / 100,

    paye,
    accLevy,
    kiwiSaverEmployee: kiwiSaver.employee,
    kiwiSaverEmployer: kiwiSaver.employer,
    studentLoanRepayment,
    ietc,

    totalDeductions: Math.round(totalDeductions * 100) / 100,

    netAnnual,
    netMonthly: Math.round((netAnnual / MONTHS_PER_YEAR) * 100) / 100,
    netFortnightly:
      Math.round((netAnnual / FORTNIGHTS_PER_YEAR) * 100) / 100,
    netWeekly: Math.round((netAnnual / WEEKS_PER_YEAR) * 100) / 100,

    effectiveTaxRate,
    marginalTaxRate,
  };
}
