/**
 * Salary Content Helpers
 *
 * Provides unique, dynamically generated content for each salary level page.
 * Every paragraph, FAQ answer, and table row uses calculated values from the
 * tax engine so the figures are always correct and never duplicated across pages.
 */

import type { SalaryResult } from "./engine.js";
import { calculateSalary } from "./engine.js";
import {
  PAYE_BRACKETS,
  ACC_EARNER_LEVY_RATE,
  ACC_EARNER_LEVY_MAX_EARNINGS,
  STUDENT_LOAN_REPAYMENT_RATE,
  STUDENT_LOAN_THRESHOLD,
  IETC_AMOUNT,
  IETC_MIN_INCOME,
  IETC_MAX_INCOME,
  STANDARD_HOURS_PER_WEEK,
  WEEKS_PER_YEAR,
} from "./tax-rates-2026.js";

/* ──────────────────── Currency / percentage formatters ──────────────────── */

export const fmtNZD = (n: number): string =>
  new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export const fmtNZD2 = (n: number): string =>
  new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export const fmtPct = (n: number, decimals = 1): string =>
  `${(n * 100).toFixed(decimals)}%`;

/* ──────────────────── Constants for comparisons ──────────────────── */

const NZ_MEDIAN_SALARY = 65_000;
const WORKING_DAYS_PER_YEAR = 260; // 52 weeks x 5 days

/* ──────────────────── Band classification ──────────────────── */

export type SalaryBand =
  | "entry"
  | "lower-middle"
  | "middle"
  | "upper-middle"
  | "high"
  | "premium"
  | "executive";

export function classifyBand(amount: number): SalaryBand {
  if (amount <= 35_000) return "entry";
  if (amount <= 50_000) return "lower-middle";
  if (amount <= 65_000) return "middle";
  if (amount <= 85_000) return "upper-middle";
  if (amount <= 110_000) return "high";
  if (amount <= 160_000) return "premium";
  return "executive";
}

/* ──────────────────── PAYE bracket breakdown ──────────────────── */

export interface BracketRow {
  label: string;
  rate: string;
  taxable: number;
  tax: number;
}

export function getPAYEBreakdown(amount: number): BracketRow[] {
  const rows: BracketRow[] = [];
  for (const b of PAYE_BRACKETS) {
    if (amount <= b.min) break;
    const taxable = Math.min(amount, b.max) - b.min;
    const tax = Math.round(taxable * b.rate * 100) / 100;
    const minLabel = fmtNZD(b.min);
    const maxLabel = b.max === Infinity ? "+" : fmtNZD(b.max);
    rows.push({
      label: `${minLabel} – ${maxLabel}`,
      rate: fmtPct(b.rate, 1),
      taxable,
      tax,
    });
  }
  return rows;
}

/* ──────────────────── Salary-specific role/industry data ──────────────────── */

interface SalaryRoleInfo {
  primaryRole: string;
  experience: string;
  progressionTarget: string;
  progressionSkill: string;
  industries: string;
}

function getSalarySpecificRoles(amount: number): SalaryRoleInfo {
  // Provide unique roles and progression info for each specific salary amount
  const roleMap: Record<number, SalaryRoleInfo> = {
    30000: {
      primaryRole: "part-time retail assistant or casual hospitality worker",
      experience: "entry-level with minimal prior work history",
      progressionTarget: "$40,000",
      progressionSkill: "transitioning to full-time hours or completing a Level 3 NZQA certificate",
      industries: "retail, hospitality, seasonal agriculture, and casual administration",
    },
    40000: {
      primaryRole: "junior administrative assistant or entry-level customer service representative",
      experience: "1-2 years in a support or service role",
      progressionTarget: "$50,000",
      progressionSkill: "gaining a team leadership responsibility or completing a relevant diploma",
      industries: "office administration, contact centres, retail management, and government support roles",
    },
    50000: {
      primaryRole: "experienced retail manager or trades assistant with full qualifications",
      experience: "3-4 years of steady employment in a specific field",
      progressionTarget: "$60,000",
      progressionSkill: "obtaining a professional certification or stepping into a supervisory position",
      industries: "trades, IT support, teaching assistance, and mid-level retail operations",
    },
    55000: {
      primaryRole: "junior accountant or early-career teacher in their first year",
      experience: "2-4 years post-qualification with growing responsibilities",
      progressionTarget: "$65,000",
      progressionSkill: "completing a professional membership (e.g. CA provisional) or gaining a unit management role",
      industries: "education, accounting, dental support, and mid-level government administration",
    },
    60000: {
      primaryRole: "registered nurse in their early career or mid-level public servant",
      experience: "3-5 years of professional experience with demonstrated competence",
      progressionTarget: "$70,000",
      progressionSkill: "gaining a specialisation, postgraduate qualification, or shift into project coordination",
      industries: "healthcare, public service, skilled trades, and IT support analysis",
    },
    70000: {
      primaryRole: "experienced registered nurse or intermediate school teacher with service increments",
      experience: "4-6 years in a professional role with increasing autonomy",
      progressionTarget: "$80,000",
      progressionSkill: "moving into a senior practitioner, team lead, or specialist advisory position",
      industries: "nursing, education, policing, government policy, and mid-level software development",
    },
    80000: {
      primaryRole: "senior teacher or mid-level software engineer at a mid-sized company",
      experience: "5-8 years with demonstrated leadership or specialist depth",
      progressionTarget: "$90,000",
      progressionSkill: "taking on people management, achieving a senior technical certification, or moving to a higher-paying sector",
      industries: "software engineering, senior education roles, accounting/audit, and engineering",
    },
    90000: {
      primaryRole: "senior software developer or experienced project manager",
      experience: "7-10 years with a track record of delivering complex outcomes",
      progressionTarget: "$100,000",
      progressionSkill: "achieving a principal or architect-level role, MBA, or executive management position",
      industries: "technology, project management, law, architecture, and specialist trades",
    },
    100000: {
      primaryRole: "senior software engineer or experienced lawyer at a mid-tier firm",
      experience: "8-12 years with specialist expertise or people leadership",
      progressionTarget: "$120,000",
      progressionSkill: "progressing to a director, partner-track, or executive leadership position",
      industries: "technology, legal, finance, engineering management, and senior government roles",
    },
    120000: {
      primaryRole: "engineering manager or senior lawyer approaching partnership",
      experience: "10-15 years with executive-level decision-making responsibilities",
      progressionTarget: "$150,000",
      progressionSkill: "achieving a GM, VP, or equity partner position, or building a specialised consulting practice",
      industries: "technology leadership, legal partnerships, financial control, and senior public sector management",
    },
    150000: {
      primaryRole: "chief financial officer at a mid-sized company or senior medical specialist",
      experience: "15+ years including significant leadership or rare specialist expertise",
      progressionTarget: "$200,000",
      progressionSkill: "moving to a CEO role, establishing a profitable practice, or joining a board",
      industries: "executive leadership, medicine, senior legal, technology architecture, and management consulting",
    },
    200000: {
      primaryRole: "chief executive officer or senior partner at a major professional firm",
      experience: "20+ years at the top of your field with strategic leadership credentials",
      progressionTarget: "$250,000+",
      progressionSkill: "achieving equity ownership, board appointments, or building a significant business",
      industries: "C-suite leadership, medical specialists, senior law firm partners, and investment professionals",
    },
  };

  if (roleMap[amount]) {
    return roleMap[amount];
  }

  // Fallback for any unlisted amounts
  const band = classifyBand(amount);
  switch (band) {
    case "entry":
      return {
        primaryRole: "part-time or entry-level worker",
        experience: "limited professional experience",
        progressionTarget: fmtNZD(amount + 10000),
        progressionSkill: "gaining consistent employment and relevant qualifications",
        industries: "retail, hospitality, and casual employment",
      };
    case "lower-middle":
      return {
        primaryRole: "full-time worker in an early-career role",
        experience: "1-3 years of full-time work",
        progressionTarget: fmtNZD(amount + 10000),
        progressionSkill: "completing industry-specific training or a relevant qualification",
        industries: "administration, customer service, and support roles",
      };
    case "middle":
      return {
        primaryRole: "mid-career professional building specialist skills",
        experience: "3-5 years with growing responsibility",
        progressionTarget: fmtNZD(amount + 10000),
        progressionSkill: "achieving a professional certification or supervisory role",
        industries: "trades, healthcare, education, and government",
      };
    case "upper-middle":
      return {
        primaryRole: "experienced professional or team leader",
        experience: "5-8 years in a specialist or leadership track",
        progressionTarget: fmtNZD(amount + 10000),
        progressionSkill: "expanding scope through management, specialisation, or industry change",
        industries: "technology, professional services, healthcare, and management",
      };
    case "high":
      return {
        primaryRole: "senior professional or specialist manager",
        experience: "8-12 years with demonstrated expertise",
        progressionTarget: fmtNZD(amount + 20000),
        progressionSkill: "moving into executive leadership or deep specialisation",
        industries: "technology, finance, law, engineering, and senior government",
      };
    case "premium":
      return {
        primaryRole: "executive leader or highly specialised professional",
        experience: "15+ years at senior levels",
        progressionTarget: fmtNZD(amount + 30000),
        progressionSkill: "achieving C-suite, partnership, or equity ownership positions",
        industries: "executive leadership, medicine, law, and financial services",
      };
    case "executive":
      return {
        primaryRole: "top-tier executive or elite specialist",
        experience: "20+ years of distinguished career achievement",
        progressionTarget: "variable (equity, bonuses, board fees)",
        progressionSkill: "building long-term wealth through ownership and governance roles",
        industries: "C-suite, board governance, specialist medicine, and senior partnerships",
      };
  }
}

/* ──────────────────── Band-specific context paragraph ──────────────────── */

interface BandMeta {
  percentile: string;
  lifestyle: string;
  roles: string;
  housing: string;
  savingsOutlook: string;
}

function getBandMeta(band: SalaryBand, amount: number, result: SalaryResult): BandMeta {
  const hourly = (amount / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2);
  const dailyNet = (result.netAnnual / WORKING_DAYS_PER_YEAR).toFixed(2);
  const medianDiff = amount - NZ_MEDIAN_SALARY;
  const medianPctStr = Math.abs(Math.round((medianDiff / NZ_MEDIAN_SALARY) * 100));

  switch (band) {
    case "entry":
      return {
        percentile: "below the 25th percentile of full-time earners",
        lifestyle: `At ${fmtNZD(amount)} per year (approximately $${hourly} per hour), your net take-home works out to $${dailyNet} for every working day. This is ${medianPctStr}% below the New Zealand median salary of ${fmtNZD(NZ_MEDIAN_SALARY)}, so day-to-day budgeting is essential. Your monthly net of ${fmtNZD2(result.netMonthly)} needs to stretch across rent, food, and transport. In smaller regional centres such as Invercargill or Whanganui, this income can cover rent for a modest flat, groceries, and basic transport. In Auckland or Wellington, flatsharing is almost certainly necessary, and discretionary spending needs to be kept to a minimum. Many workers at this level supplement their income with casual or gig work to bridge the gap between essential costs and earnings.`,
        roles: "part-time retail workers, hospitality staff on reduced hours, seasonal agricultural workers, junior administration assistants in regional businesses, library assistants, and students working alongside their studies",
        housing: `Flatsharing is the most common housing arrangement at this income level. On ${fmtNZD(amount)} (net ${fmtNZD2(result.netMonthly)} per month), expect to pay between $150 and $220 per week for a room in a shared flat outside Auckland, or $200 to $280 in Auckland. That housing cost at the lower end represents ${Math.round((150 * 52) / result.netAnnual * 100)}% of your take-home pay annually. Renting a self-contained one-bedroom apartment independently would consume a disproportionate share of your take home pay.`,
        savingsOutlook: `Building significant savings is challenging on ${fmtNZD(amount)} net of ${fmtNZD2(result.netAnnual)}, but KiwiSaver contributions even at the minimum 3% rate (${fmtNZD(result.kiwiSaverEmployee)}/year from your pay) lay the groundwork for long-term retirement security. The government Member Tax Credit adds up to $521.43 per year if you contribute at least $1,042.86 annually. Focus on establishing an emergency fund of at least $1,000 before pursuing additional savings goals.`,
      };

    case "lower-middle":
      return {
        percentile: "between the 25th and 40th percentile of full-time earners",
        lifestyle: `Earning ${fmtNZD(amount)} annually (roughly $${hourly} per hour) translates to ${fmtNZD2(result.netMonthly)} in your bank account each month and $${dailyNet} per working day after tax. This is ${medianDiff < 0 ? `${medianPctStr}% below` : `${medianPctStr}% above`} the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}. At this level, full-time employment is the norm but significant financial headroom is limited. You can expect to cover essential costs including rent, utilities, food, and transport in most New Zealand cities, though living in Auckland on this salary requires careful management of housing costs. This income level is common among workers early in their career trajectory who are building experience and skills that will lead to higher earnings over time.`,
        roles: "full-time customer service representatives, retail supervisors, junior accounting clerks, early-career administrative professionals, dental assistants, warehouse team members, call centre operators, and junior government administration officers",
        housing: `Renting a one-bedroom apartment is feasible in regional centres on your monthly net of ${fmtNZD2(result.netMonthly)}, with typical rents ranging from $250 to $350 per week. In Auckland, flatsharing remains the most affordable option, with rooms costing $220 to $300 per week. At ${fmtNZD(amount)}, keeping housing below 30% of net income means spending no more than ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month on rent. First home buyers at this income level should explore the KiwiSaver HomeStart grant and the First Home Partner programme to accelerate their path to ownership.`,
        savingsOutlook: `With disciplined budgeting on ${fmtNZD(amount)} (${fmtNZD2(result.netFortnightly)} per fortnight after deductions), you can begin building savings beyond KiwiSaver. Aim for an emergency fund covering three months of expenses, which at your spending level would be approximately ${fmtNZD(Math.round(result.netMonthly * 3))}. If you have a student loan, the repayment deductions at this level are modest, so consider making voluntary repayments to clear the balance sooner, especially before interest applies on overdue balances.`,
      };

    case "middle": {
      const middleRoles: Record<number, string> = {
        50000: "experienced retail managers with store P&L responsibility, administrative coordinators in healthcare settings, trades assistants who have completed their apprenticeship, junior IT support technicians handling Tier 2 escalations, teacher aides with specialist skills, and early-career library professionals",
        55000: "qualified electricians and plumbers in their early years as certified tradies, mid-level office administrators managing small teams, early-career secondary school teachers on Step 3-4, marketing coordinators at regional agencies, dental hygienists in private practice, and junior accountants at smaller regional firms",
        60000: "experienced tradespeople running their own small jobs, police constables with 3-5 years of service, early-career registered nurses in DHB roles, mid-level government administrators at Band 6-7, IT support analysts providing infrastructure support, and social workers with 3+ years post-registration",
      };
      const rolesForMiddleAmount = middleRoles[amount] || `mid-career professionals earning ${fmtNZD(amount)} including experienced tradespeople, public servants, teachers, IT technicians, and administrative specialists at this seniority level`;

      // Differentiate lifestyle by position within band
      const middleLifestyle = amount <= 55000
        ? `A salary of ${fmtNZD(amount)} (approximately $${hourly} per hour) delivers ${fmtNZD2(result.netMonthly)} per month after deductions, or $${dailyNet} per working day. ${medianDiff >= 0 ? `You are ${medianPctStr}% above the median full-time salary of ${fmtNZD(NZ_MEDIAN_SALARY)}.` : `You are ${medianPctStr}% below the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}, though closing in on it.`} This is a solid income that supports independent living in regional centres and flatsharing in larger cities. You can cover rent, run a vehicle, and manage day-to-day expenses, with some capacity left over for entertainment. In Auckland, being strategic about your suburb choice and housing arrangement is still important to stay within your ${fmtNZD(Math.round(result.netMonthly * 0.30))} monthly housing budget.`
        : `A salary of ${fmtNZD(amount)} (approximately $${hourly} per hour) delivers ${fmtNZD2(result.netMonthly)} per month after deductions, or $${dailyNet} per working day. ${medianDiff >= 0 ? `You are ${medianPctStr}% above the median full-time salary of ${fmtNZD(NZ_MEDIAN_SALARY)}.` : `You sit ${medianPctStr}% below the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}, but are well positioned for progression.`} This is a comfortable foundation income that supports fully independent living in most of New Zealand. You can afford your own apartment, run a reliable vehicle, maintain basic insurance coverage, and enjoy regular dining out and entertainment on a monthly discretionary budget of around ${fmtNZD(Math.round(result.netMonthly * 0.12))}.`;

      // Differentiate housing
      const middleHousing = amount <= 55000
        ? `At ${fmtNZD(amount)} with a net monthly income of ${fmtNZD2(result.netMonthly)}, renting a studio or one-bedroom apartment is achievable in most regional cities. The 30% affordability guideline puts your rent ceiling at ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month ($${Math.round(result.netMonthly * 0.30 / 4.33)} per week). In areas like Hamilton, Christchurch, or Dunedin, this covers a modest standalone apartment. In Auckland, a shared flat or studio in an outer suburb is more realistic. The Kainga Ora First Home Loan scheme (5% deposit) starts to become relevant for earners saving at your level.`
        : `At ${fmtNZD(amount)} with a net monthly income of ${fmtNZD2(result.netMonthly)}, renting a quality one-bedroom apartment independently is realistic in most cities including Wellington and Christchurch. The 30% guideline allows up to ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month ($${Math.round(result.netMonthly * 0.30 / 4.33)} per week). In regional centres this budget opens up quality options. Some earners at ${fmtNZD(amount)} begin actively saving for a first home deposit, with KiwiSaver providing the foundation and the Kainga Ora First Home Loan scheme offering a pathway with deposits as low as 5%.`;

      // Differentiate savings
      const middleSavings = amount <= 55000
        ? `On ${fmtNZD(amount)} you can begin building savings consistently. After deductions your fortnightly pay of ${fmtNZD2(result.netFortnightly)} provides room for a regular savings habit. Beyond your ${fmtNZD(result.kiwiSaverEmployee)}/year KiwiSaver contribution, set up an automatic transfer of even ${fmtNZD(Math.round(result.netFortnightly * 0.05))} per fortnight into a high-interest savings account. Prioritise an emergency fund of ${fmtNZD(Math.round(result.netMonthly * 2))} to ${fmtNZD(Math.round(result.netMonthly * 3))} before expanding into managed funds.`
        : `On ${fmtNZD(amount)} you have meaningful capacity to save and invest. Your fortnightly pay of ${fmtNZD2(result.netFortnightly)} allows comfortable coverage of essentials with room for wealth building. Beyond KiwiSaver (${fmtNZD(result.kiwiSaverEmployee)}/year), target automatic transfers of ${fmtNZD(Math.round(result.netFortnightly * 0.10))} per fortnight into a low-cost managed fund or regular savings plan. An emergency buffer of ${fmtNZD(Math.round(result.netMonthly * 3))} should be your first milestone. If you are paying off a student loan (${fmtNZD(Math.round(Math.max(0, amount - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_REPAYMENT_RATE))}/year), this is manageable alongside parallel saving.`;

      return {
        percentile: "close to the national median for full-time employees",
        lifestyle: middleLifestyle,
        roles: rolesForMiddleAmount,
        housing: middleHousing,
        savingsOutlook: middleSavings,
      };
    }

    case "upper-middle": {
      // Differentiate roles by specific salary amount within the band
      const upperMiddleRoles: Record<number, string> = {
        70000: "experienced registered nurses on Step 5 or higher, intermediate school teachers with 5+ years of service, mid-level software developers working on product teams, experienced accountants preparing for CA qualification, project coordinators in construction or infrastructure, and government policy analysts at Band 8",
        80000: "senior teachers holding units or management responsibilities, mid-level software engineers leading feature delivery, experienced auditors at mid-tier firms, senior police officers at sergeant rank, engineering technologists with building consent specialisation, HR business partners at mid-sized companies, and experienced physiotherapists in private practice",
      };
      const rolesForAmount = upperMiddleRoles[amount] || `professionals earning ${fmtNZD(amount)} in roles such as experienced nurses, qualified teachers with service increments, software developers, project coordinators, and government policy analysts at this seniority level`;

      // Differentiate lifestyle sentence by amount
      const lifestyleVariation = amount <= 75000
        ? `At ${fmtNZD(amount)} per year ($${hourly} per hour), your take-home amounts to ${fmtNZD2(result.netMonthly)} per month or $${dailyNet} per working day after all deductions. This is ${medianPctStr}% above the New Zealand median of ${fmtNZD(NZ_MEDIAN_SALARY)}, positioning you in the comfort zone where independent living is straightforward. You can afford quality rental accommodation on your own, maintain a reliable vehicle, hold health and contents insurance, and participate in recreational activities and occasional dining out. Many New Zealanders at ${fmtNZD(amount)} describe this as the salary where budgeting shifts from survival to choice, with ${fmtNZD(Math.round(result.netMonthly * 0.12))} per month available for discretionary spending.`
        : `At ${fmtNZD(amount)} per year ($${hourly} per hour), your take-home amounts to ${fmtNZD2(result.netMonthly)} per month or $${dailyNet} per working day after all deductions. This is ${medianPctStr}% above the New Zealand median of ${fmtNZD(NZ_MEDIAN_SALARY)}, giving you genuine financial flexibility that goes beyond covering essentials. You can comfortably afford a quality apartment or small house without flatmates, run a modern vehicle, maintain comprehensive insurance cover, and enjoy regular dining, entertainment, and domestic travel. At this level you have ${fmtNZD(Math.round(result.netMonthly * 0.22))} per month for combined personal spending and savings beyond housing and essentials.`;

      // Differentiate housing by amount
      const housingVariation = amount <= 75000
        ? `Renting a quality one-bedroom apartment is comfortable on ${fmtNZD(amount)} with your monthly net of ${fmtNZD2(result.netMonthly)}. The 30% affordability rule suggests housing costs up to ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month (approximately $${Math.round(result.netMonthly * 0.30 / 4.33)} per week). In regional centres like Hamilton or Tauranga, this budget allows a quality standalone apartment. Home ownership is on the horizon; with five years of KiwiSaver contributions at 3% plus employer match (totalling ${fmtNZD(Math.round(amount * 0.06 * 5))} before returns), you are building toward a deposit.`
        : `Renting a spacious one or two-bedroom apartment is well within reach on ${fmtNZD(amount)} with your monthly net of ${fmtNZD2(result.netMonthly)}. The 30% rule puts your housing ceiling at ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month ($${Math.round(result.netMonthly * 0.30 / 4.33)} per week), which covers quality rentals in most areas including central Wellington and mid-ring Auckland suburbs. Home ownership becomes a concrete medium-term goal; with a 20% deposit and your income, you could service a mortgage of approximately ${fmtNZD(Math.round(amount * 4.5))} to ${fmtNZD(Math.round(amount * 5))} depending on interest rates.`;

      // Differentiate savings by amount
      const savingsVariation = amount <= 75000
        ? `At ${fmtNZD(amount)} with take-home of ${fmtNZD2(result.netAnnual)} per year, you are in a strong position to begin building wealth beyond day-to-day savings. Consider lifting your KiwiSaver to 6% (${fmtNZD(Math.round(amount * 0.06))}/year), which costs an extra ${fmtNZD2((amount * 0.03) / 26)} per fortnight from your pay. Aim for an emergency fund of three to six months of expenses: ${fmtNZD(Math.round(result.netMonthly * 3))} to ${fmtNZD(Math.round(result.netMonthly * 6))}. If you have a student loan, the annual repayments (approximately ${fmtNZD(Math.round(Math.max(0, amount - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_REPAYMENT_RATE))}) are manageable alongside saving.`
        : `At ${fmtNZD(amount)} with take-home of ${fmtNZD2(result.netAnnual)} per year, you should be actively building wealth across multiple channels. Maximise your KiwiSaver contributions to at least 6% (${fmtNZD(Math.round(amount * 0.06))}/year) or even 8% (${fmtNZD(Math.round(amount * 0.08))}/year) while still maintaining an emergency fund of ${fmtNZD(Math.round(result.netMonthly * 4))} to ${fmtNZD(Math.round(result.netMonthly * 6))}. At 10% of net pay, you could be investing ${fmtNZD(Math.round(result.netAnnual * 0.10))} per year in managed funds or ETFs on top of KiwiSaver. If you have a student loan, the repayments of ${fmtNZD(Math.round(Math.max(0, amount - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_REPAYMENT_RATE))}/year are noticeable but should not prevent parallel wealth building.`;

      return {
        percentile: "above the median, placing you roughly in the top 35-40% of individual earners",
        lifestyle: lifestyleVariation,
        roles: rolesForAmount,
        housing: housingVariation,
        savingsOutlook: savingsVariation,
      };
    }

    case "high": {
      const highRoles: Record<number, string> = {
        90000: "senior software developers leading small teams, experienced project managers overseeing multi-million dollar delivery, senior police officers at inspector rank, secondary school deputy principals, mid-level lawyers at established firms, experienced architects designing commercial buildings, and specialist trades contractors running their own crews",
        100000: "senior software engineers at established companies, experienced lawyers handling complex litigation, senior chartered accountants at Big Four firms, school principals at mid-sized schools, experienced medical registrars, senior project managers in infrastructure, corporate team leaders managing 10+ staff, and senior government managers at Band 10-11",
      };
      const rolesForHighAmount = highRoles[amount] || `senior professionals earning ${fmtNZD(amount)} including experienced engineers, senior lawyers, specialist project managers, technology leads, and senior government officials at this compensation level`;

      const highLifestyle = amount <= 95000
        ? `Earning ${fmtNZD(amount)} annually ($${hourly} per hour) gives you a net income of ${fmtNZD2(result.netMonthly)} per month, which is $${dailyNet} for each working day. At ${medianPctStr}% above the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}, this places you firmly in the high-income bracket by New Zealand standards. You have substantial financial freedom: quality housing, comprehensive insurance, regular investing, and comfortable discretionary spending are all achievable without trade-offs. With ${fmtNZD(Math.round(result.netMonthly * 0.22))} per month available for savings and personal spending beyond fixed costs, you can maintain a premium lifestyle while actively building long-term wealth.`
        : `Earning ${fmtNZD(amount)} annually ($${hourly} per hour) delivers ${fmtNZD2(result.netMonthly)} per month to your bank account, or $${dailyNet} for each working day. Being ${medianPctStr}% above the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}, you enjoy a distinctly high income by any New Zealand standard. This salary supports premium housing in virtually any location, international travel multiple times per year, comprehensive insurance coverage, and significant monthly investment capacity. With over ${fmtNZD(Math.round(result.netMonthly * 0.32))} per month available beyond essential housing and living costs, your financial decisions are driven by goals rather than constraints.`;

      const highHousing = amount <= 95000
        ? `You can comfortably rent premium accommodation or service a mortgage on ${fmtNZD(amount)} (net ${fmtNZD2(result.netMonthly)}/month). Your 30% housing guideline allows up to ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month ($${Math.round(result.netMonthly * 0.30 / 4.33)} per week) for housing. In Wellington, Christchurch, and regional centres, single-income home ownership is realistic at this level. In Auckland, you can comfortably afford mortgage repayments in mid-ring suburbs or save aggressively toward a deposit for more central locations.`
        : `You can comfortably service a mortgage or rent premium accommodation on ${fmtNZD(amount)} (net ${fmtNZD2(result.netMonthly)}/month). Your 30% housing guideline allows ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month ($${Math.round(result.netMonthly * 0.30 / 4.33)} per week), which covers mortgage repayments on properties up to approximately ${fmtNZD(Math.round(result.netMonthly * 0.30 * 12 / 0.055))} at current rates. In Auckland, home ownership is achievable as a single income. Many earners at ${fmtNZD(amount)} start considering investment property as a wealth-building strategy alongside their primary residence.`;

      const highSavings = amount <= 95000
        ? `On ${fmtNZD(amount)} with annual take-home of ${fmtNZD2(result.netAnnual)}, you can pursue a diversified savings strategy. Beyond your KiwiSaver of ${fmtNZD(result.kiwiSaverEmployee)}/year at 3%, allocating 10% of net income means investing ${fmtNZD(Math.round(result.netAnnual * 0.10))} per year in managed funds or ETFs. Consider platforms like Sharesies, InvestNow, or Kernel for low-cost diversified exposure. A qualified financial adviser can help you optimise your approach as your wealth grows beyond ${fmtNZD(100000)} in investable assets.`
        : `On ${fmtNZD(amount)} with annual take-home of ${fmtNZD2(result.netAnnual)}, this income supports a comprehensive wealth-building strategy. In addition to KiwiSaver (${fmtNZD(result.kiwiSaverEmployee)}/year at 3%), directing 15% of net pay means investing ${fmtNZD(Math.round(result.netAnnual * 0.15))} per year across managed funds, shares, and potentially direct property. At this level, engaging a qualified financial adviser is worthwhile to optimise asset allocation, tax positioning through PIE funds, and long-term estate planning. If you still carry a student loan, consider voluntary lump-sum repayments of ${fmtNZD(Math.round(result.netMonthly * 2))} to clear the balance before planning overseas travel.`;

      return {
        percentile: "in the top 15-25% of individual income earners nationwide",
        lifestyle: highLifestyle,
        roles: rolesForHighAmount,
        housing: highHousing,
        savingsOutlook: highSavings,
      };
    }

    case "premium": {
      const premiumRoles: Record<number, string> = {
        120000: "engineering managers overseeing technical teams, senior lawyers approaching partnership at mid-tier firms, financial controllers at mid-to-large companies, experienced IT managers running infrastructure teams, senior public servants at Tier 2-3 level, experienced medical professionals with specialist registrations, and business development managers at technology companies",
        150000: "chief financial officers at mid-sized companies, senior medical specialists running clinics, partners at established law firms, senior technology architects designing enterprise systems, engineering directors overseeing multiple project teams, general managers with full P&L responsibility, and experienced management consultants at top-tier firms",
      };
      const premiumRolesForAmount = premiumRoles[amount] || `senior executives and specialists earning ${fmtNZD(amount)} including CFOs, senior medical professionals, law firm partners, technology directors, and senior public sector leaders`;

      const premiumLifestyle = amount <= 135000
        ? `A ${fmtNZD(amount)} salary ($${hourly} per hour) delivers ${fmtNZD2(result.netMonthly)} into your account each month, or $${dailyNet} per working day after tax. At ${medianPctStr}% above the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}, you are in the upper echelon of New Zealand earners. You enjoy a premium lifestyle with meaningful capacity for wealth accumulation: quality housing in desirable areas, comprehensive insurance, regular domestic and international travel, and the ability to direct ${fmtNZD(Math.round(result.netMonthly * 0.20))} or more per month toward investments and savings goals. At this level, your financial planning focus shifts from budgeting to wealth optimisation.`
        : `A ${fmtNZD(amount)} salary ($${hourly} per hour) delivers ${fmtNZD2(result.netMonthly)} into your account each month, or $${dailyNet} per working day after tax. At ${medianPctStr}% above the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}, you are among the highest-paid professionals in New Zealand. This income supports a truly premium lifestyle: top-tier housing, private education for children, frequent international travel, luxury discretionary spending, and meaningful investment portfolios. You are likely at or near the peak of your professional career, with ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month available beyond essential living costs for wealth accumulation and lifestyle choices.`;

      const premiumHousing = amount <= 135000
        ? `Premium housing is accessible on ${fmtNZD(amount)} (monthly net ${fmtNZD2(result.netMonthly)}). In Auckland, you can afford good suburbs within 15-20 minutes of the CBD. In Wellington and Christchurch, premium locations are well within reach. Your 30% housing allocation of ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month covers mortgage repayments on properties up to approximately ${fmtNZD(Math.round(result.netMonthly * 0.30 * 12 / 0.06))} in value. Many earners at ${fmtNZD(amount)} have already purchased their primary residence and are now considering whether investment property or financial assets offer better risk-adjusted returns.`
        : `Premium housing in any New Zealand location is well within reach on ${fmtNZD(amount)} (monthly net ${fmtNZD2(result.netMonthly)}). In Auckland's most desirable suburbs, in waterfront Wellington, or in premium Christchurch locations, you can afford quality properties. Your 30% housing allocation of ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month supports mortgage repayments on properties valued up to approximately ${fmtNZD(Math.round(result.netMonthly * 0.30 * 12 / 0.06))}. At this income level, most earners already own their primary residence and actively pursue investment property or alternative asset classes for portfolio diversification.`;

      const premiumSavings = amount <= 135000
        ? `Wealth management is central to your financial strategy on ${fmtNZD(amount)} with total take-home of ${fmtNZD2(result.netAnnual)} annually. Your employer contributes ${fmtNZD(result.kiwiSaverEmployer)}/year to KiwiSaver, and directing 10-15% of net income beyond this means investing ${fmtNZD(Math.round(result.netAnnual * 0.10))} to ${fmtNZD(Math.round(result.netAnnual * 0.15))} per year in diversified assets. A qualified financial adviser can help optimise your portfolio across KiwiSaver (growth fund recommended), PIE investments (capped at 28% tax), and potentially direct property. Consider whether salary sacrifice or other employer benefit arrangements offer additional tax efficiency.`
        : `Wealth management becomes the defining financial priority on ${fmtNZD(amount)} with total take-home of ${fmtNZD2(result.netAnnual)} annually. Work with a qualified financial adviser and tax accountant to develop a comprehensive plan covering KiwiSaver fund optimisation (your employer contributes ${fmtNZD(result.kiwiSaverEmployer)}/year), diversified investment portfolios worth 15-20% of net income (${fmtNZD(Math.round(result.netAnnual * 0.15))} to ${fmtNZD(Math.round(result.netAnnual * 0.20))}/year), estate planning, and tax-efficient structures. The government Member Tax Credit of up to $521.43 still applies regardless of your income, and PIE funds save you ${fmtPct(result.marginalTaxRate - 0.28)} on investment returns compared to your marginal PAYE rate.`;

      return {
        percentile: "in the top 5-10% of individual earners in the country",
        lifestyle: premiumLifestyle,
        roles: premiumRolesForAmount,
        housing: premiumHousing,
        savingsOutlook: premiumSavings,
      };
    }

    case "executive":
      return {
        percentile: "in the top 2-3% of all income earners nationwide",
        lifestyle: `At ${fmtNZD(amount)} per year ($${hourly} per hour), your monthly net of ${fmtNZD2(result.netMonthly)} and daily working rate of $${dailyNet} after tax place you among the highest-paid individuals in New Zealand. This is ${medianPctStr}% above the national median of ${fmtNZD(NZ_MEDIAN_SALARY)}. This income is associated with executive leadership, elite professional expertise, and senior specialist positions. You have exceptional financial flexibility with significant capacity for wealth creation, premium lifestyle choices, and philanthropic activities. This salary typically comes with substantial responsibilities, high performance expectations, and demanding schedules.`,
        roles: "chief executive officers, medical specialists and senior consultants, senior partners at major law firms, chief technology officers, finance directors at large corporations, investment banking professionals, senior management consultants at top-tier firms, and executive leaders in major public sector organisations",
        housing: `You can afford premium properties in any New Zealand location on ${fmtNZD(amount)} (net ${fmtNZD2(result.netMonthly)}/month). Many earners at this level own multiple properties and use property investment as part of their overall wealth strategy. Your 30% housing allocation of ${fmtNZD(Math.round(result.netMonthly * 0.30))} per month significantly exceeds what is needed for a quality primary residence, leaving scope for investment leverage. Mortgage serviceability is not a concern; the focus shifts to optimising leverage ratios and investment returns across your property portfolio.`,
        savingsOutlook: `At ${fmtNZD(amount)} with take-home of ${fmtNZD2(result.netAnnual)} per year, you should engage professional advisers including a financial planner, tax accountant, and possibly a lawyer for trust or company structures. Directing 20% of net income to wealth building means accumulating ${fmtNZD(Math.round(result.netAnnual * 0.20))} per year beyond KiwiSaver (your employer adds ${fmtNZD(result.kiwiSaverEmployer)} annually to your KiwiSaver). Your focus should be on tax-efficient wealth accumulation, estate planning, risk management through comprehensive insurance, and succession planning. KiwiSaver remains a useful component but is only one part of a broader wealth strategy.`,
      };
  }
}

export function getBandContext(amount: number, result: SalaryResult): string {
  const band = classifyBand(amount);
  const meta = getBandMeta(band, amount, result);

  // Generate salary-specific sentences
  const dailyNet = (result.netAnnual / WORKING_DAYS_PER_YEAR).toFixed(2);
  const medianDiff = amount - NZ_MEDIAN_SALARY;
  const medianPctStr = Math.abs(Math.round((medianDiff / NZ_MEDIAN_SALARY) * 100));
  const medianRelation = medianDiff >= 0
    ? `${medianPctStr}% above the national median salary of ${fmtNZD(NZ_MEDIAN_SALARY)}`
    : `${medianPctStr}% below the national median salary of ${fmtNZD(NZ_MEDIAN_SALARY)}`;

  // Comparison to adjacent salary levels (use salary-specific targets)
  const bandCompMap: Record<number, { prev: number; next: number }> = {
    30000: { prev: 0, next: 35000 },
    40000: { prev: 35000, next: 45000 },
    50000: { prev: 45000, next: 55000 },
    55000: { prev: 50000, next: 60000 },
    60000: { prev: 55000, next: 65000 },
    70000: { prev: 65000, next: 75000 },
    80000: { prev: 75000, next: 85000 },
    90000: { prev: 85000, next: 95000 },
    100000: { prev: 90000, next: 110000 },
    120000: { prev: 110000, next: 130000 },
    150000: { prev: 135000, next: 160000 },
    200000: { prev: 180000, next: 220000 },
  };
  const bandComp = bandCompMap[amount] || { prev: Math.max(0, amount - 5000), next: amount + 5000 };
  const prevAmount = bandComp.prev;
  const nextAmount = bandComp.next;
  const prevResult = prevAmount > 0 ? calculateSalary({ annualGross: prevAmount, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true }) : null;
  const nextResult = calculateSalary({ annualGross: nextAmount, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true });

  const comparisonSentence = prevResult
    ? `Earning ${fmtNZD(amount)} gives you ${fmtNZD(Math.round(result.netMonthly - prevResult.netMonthly))} more per month after tax than someone on ${fmtNZD(prevAmount)}, while stepping up to ${fmtNZD(nextAmount)} would add a further ${fmtNZD(Math.round(nextResult.netMonthly - result.netMonthly))} per month to your take-home.`
    : `Stepping up from ${fmtNZD(amount)} to ${fmtNZD(nextAmount)} would add ${fmtNZD(Math.round(nextResult.netMonthly - result.netMonthly))} per month to your take-home pay.`;

  const timeBreakdown = `That works out to $${dailyNet} per working day after tax, or ${fmtNZD2(result.netAnnual / (WORKING_DAYS_PER_YEAR * 8))} for every hour you spend at work.`;

  const taxShare = `Of your gross ${fmtNZD(amount)}, ${fmtPct(result.paye / amount)} goes to PAYE income tax, ${fmtPct(result.accLevy / amount)} to the ACC Earner's Levy, and ${fmtPct(result.kiwiSaverEmployee / amount)} to KiwiSaver, leaving you with ${fmtPct(result.netAnnual / amount)} in actual take-home pay.`;

  // Vary sentence order based on salary amount (odd = lifestyle first, even = median first)
  const isOdd = (amount / 1000) % 2 !== 0;

  if (isOdd) {
    return `Earners on ${fmtNZD(amount)} sit ${meta.percentile}. ${meta.lifestyle} ${comparisonSentence} ${timeBreakdown} ${taxShare} Common roles at this salary level include ${meta.roles}. ${meta.housing} ${meta.savingsOutlook}`;
  } else {
    return `A ${fmtNZD(amount)} salary is ${medianRelation}, placing earners ${meta.percentile}. ${comparisonSentence} ${timeBreakdown} ${meta.lifestyle} ${taxShare} Common roles at this salary level include ${meta.roles}. ${meta.housing} ${meta.savingsOutlook}`;
  }
}

/* ──────────────────── How NZ Tax Works (per-band variation) ──────────────────── */

export function getHowTaxWorks(amount: number, result: SalaryResult): string {
  const brackets = getPAYEBreakdown(amount);
  const topBracket = brackets[brackets.length - 1];
  const numBrackets = brackets.length;

  let intro = `New Zealand uses a progressive income tax system, meaning different portions of your ${fmtNZD(amount)} salary are taxed at increasing rates as they pass through ${numBrackets} tax bracket${numBrackets > 1 ? "s" : ""}. This means you never lose money by earning more, since only the income within each bracket is taxed at that bracket's rate.`;

  let detail = ` On your ${fmtNZD(amount)} income, the first $15,600 is taxed at just 10.5%, generating ${fmtNZD2(15600 * 0.105)} in PAYE (${fmtPct(15600 * 0.105 / result.paye)} of your total tax bill). `;

  if (amount > 15_600) {
    const amt2 = Math.min(amount, 53500) - 15600;
    const tax2 = amt2 * 0.175;
    detail += `The next ${fmtNZD(amt2)} (from $15,600 to ${fmtNZD(Math.min(amount, 53500))}) is taxed at 17.5%, producing ${fmtNZD2(tax2)} which represents ${fmtPct(tax2 / result.paye)} of your total PAYE on ${fmtNZD(amount)}. `;
  }
  if (amount > 53_500) {
    const amt3 = Math.min(amount, 78100) - 53500;
    const tax3 = amt3 * 0.30;
    detail += `The portion from $53,500 to ${fmtNZD(Math.min(amount, 78100))} (${fmtNZD(amt3)}) attracts a 30% rate, adding ${fmtNZD2(tax3)} (${fmtPct(tax3 / result.paye)} of total PAYE). `;
  }
  if (amount > 78_100) {
    const amt4 = Math.min(amount, 180000) - 78100;
    const tax4 = amt4 * 0.33;
    detail += `Income from $78,100 to ${fmtNZD(Math.min(amount, 180000))} (${fmtNZD(amt4)}) is taxed at 33%, contributing ${fmtNZD2(tax4)} (${fmtPct(tax4 / result.paye)} of your PAYE). `;
  }
  if (amount > 180_000) {
    const amt5 = amount - 180000;
    const tax5 = amt5 * 0.39;
    detail += `The top ${fmtNZD(amt5)} above $180,000 falls into the 39% bracket, adding ${fmtNZD2(tax5)} (${fmtPct(tax5 / result.paye)} of total PAYE). `;
  }

  detail += `Your total PAYE on ${fmtNZD(amount)} sums to ${fmtNZD2(result.paye)}, giving you an effective tax rate of ${fmtPct(result.paye / amount)} and a marginal rate of ${fmtPct(result.marginalTaxRate)}. The ${fmtPct(result.marginalTaxRate - result.paye / amount)} gap between your marginal and effective rates shows how the progressive system benefits you: your average tax burden of ${fmtPct(result.paye / amount)} is considerably lower than the ${fmtPct(result.marginalTaxRate)} applied to your last dollar earned.`;

  let accSection = ` In addition to PAYE, you pay the ACC Earner's Levy at ${fmtPct(ACC_EARNER_LEVY_RATE, 2)} of your ${fmtNZD(amount)} gross income${amount >= ACC_EARNER_LEVY_MAX_EARNINGS ? ` (capped at earnings of ${fmtNZD(ACC_EARNER_LEVY_MAX_EARNINGS)})` : ""}, totalling ${fmtNZD2(result.accLevy)} per year (${fmtNZD2(result.accLevy / 12)} per month). This levy funds New Zealand's no-fault accident compensation scheme, providing treatment costs, income replacement at 80% of your pre-injury earnings, and rehabilitation services if you are injured regardless of fault.`;

  let ietcSection = "";
  if (amount >= IETC_MIN_INCOME && amount <= IETC_MAX_INCOME) {
    ietcSection = ` You are eligible for the Independent Earner Tax Credit (IETC) of ${fmtNZD2(result.ietc)} per year (${fmtNZD2(result.ietc / 26)} per fortnight). This credit is available to tax residents earning between ${fmtNZD(IETC_MIN_INCOME)} and ${fmtNZD(IETC_MAX_INCOME)} who do not receive income-tested benefits or Working for Families tax credits. Use the "ME" tax code to receive it in each pay rather than as a lump-sum refund.`;
  } else if (amount < IETC_MIN_INCOME) {
    ietcSection = ` Your ${fmtNZD(amount)} income is below the ${fmtNZD(IETC_MIN_INCOME)} threshold for the Independent Earner Tax Credit (IETC). If your income increases to between ${fmtNZD(IETC_MIN_INCOME)} and ${fmtNZD(IETC_MAX_INCOME)}, you could receive a credit of up to ${fmtNZD(IETC_AMOUNT)} per year, effectively reducing your tax by ${fmtNZD2(IETC_AMOUNT / 26)} per fortnight.`;
  } else {
    ietcSection = ` At ${fmtNZD(amount)}, your income exceeds the ${fmtNZD(IETC_MAX_INCOME)} upper threshold for the Independent Earner Tax Credit (IETC) by ${fmtNZD(amount - IETC_MAX_INCOME)}, so this credit does not apply to you.`;
  }

  return intro + detail + accSection + ietcSection;
}

/* ──────────────────── Monthly budget breakdown ──────────────────── */

export interface BudgetRow {
  category: string;
  percentage: number;
  monthly: number;
  note: string;
}

export function getBudgetBreakdown(netMonthly: number): BudgetRow[] {
  return [
    {
      category: "Housing (rent / mortgage)",
      percentage: 30,
      monthly: Math.round(netMonthly * 0.30),
      note: "Includes rent or mortgage repayment, rates, and body corporate fees",
    },
    {
      category: "Groceries and household",
      percentage: 15,
      monthly: Math.round(netMonthly * 0.15),
      note: "Food, cleaning supplies, and personal care items",
    },
    {
      category: "Transport",
      percentage: 12,
      monthly: Math.round(netMonthly * 0.12),
      note: "Vehicle costs, fuel, public transport, or e-bike loan",
    },
    {
      category: "Utilities and internet",
      percentage: 6,
      monthly: Math.round(netMonthly * 0.06),
      note: "Power, water, broadband, and mobile phone",
    },
    {
      category: "Insurance",
      percentage: 5,
      monthly: Math.round(netMonthly * 0.05),
      note: "Contents, health, life, and income protection insurance",
    },
    {
      category: "Savings and investing",
      percentage: 10,
      monthly: Math.round(netMonthly * 0.10),
      note: "Emergency fund, managed funds, or term deposits (on top of KiwiSaver)",
    },
    {
      category: "Personal and discretionary",
      percentage: 12,
      monthly: Math.round(netMonthly * 0.12),
      note: "Dining, entertainment, clothing, subscriptions, and hobbies",
    },
    {
      category: "Debt repayment",
      percentage: 5,
      monthly: Math.round(netMonthly * 0.05),
      note: "Credit cards, personal loans, or hire purchase obligations",
    },
    {
      category: "Miscellaneous buffer",
      percentage: 5,
      monthly: Math.round(netMonthly * 0.05),
      note: "Unexpected costs, gifts, donations, and seasonal expenses",
    },
  ];
}

/* ──────────────────── KiwiSaver deep-dive paragraph ──────────────────── */

export function getKiwiSaverDeepDive(amount: number, result: SalaryResult): string {
  const ks3 = Math.round(amount * 0.03);
  const ks4 = Math.round(amount * 0.04);
  const ks6 = Math.round(amount * 0.06);
  const ks8 = Math.round(amount * 0.08);
  const ks10 = Math.round(amount * 0.10);
  const employer3 = Math.round(amount * 0.03);
  const totalMin = ks3 + employer3;
  const totalMax = ks10 + employer3;
  const diff = ks10 - ks3;

  // Calculate projected balance over different timeframes
  const yearsTo65 = Math.max(10, 40); // generic estimate
  const projectedBalanceMin = totalMin * 20 * 1.04; // rough 20-year projection at 4% avg growth
  const weeklyDiff = Math.round((diff / 52) * 100) / 100;

  return `KiwiSaver is New Zealand's workplace retirement savings scheme and a key part of your ${fmtNZD(amount)} salary package. At the minimum 3% employee rate, you contribute ${fmtNZD(ks3)} per year (${fmtNZD2(ks3 / 26)} per fortnight), and your employer adds a compulsory 3% (${fmtNZD(employer3)}), giving your account a combined ${fmtNZD(totalMin)} annually before investment returns. At the maximum 10% rate, your employee contribution rises to ${fmtNZD(ks10)} per year, and the combined total reaches ${fmtNZD(totalMax)}. The difference between minimum and maximum is ${fmtNZD(diff)} per year in take home pay, or ${fmtNZD2(weeklyDiff)} per week. Other available rates are 4% (${fmtNZD(ks4)}/year), 6% (${fmtNZD(ks6)}/year), and 8% (${fmtNZD(ks8)}/year). On your ${fmtNZD(amount)} salary, moving from 3% to 6% costs ${fmtNZD2((ks6 - ks3) / 26)} per fortnight from your pay packet but adds ${fmtNZD(ks6 - ks3)} per year to your retirement savings. You can adjust your rate by notifying your employer in writing; on ${fmtNZD(amount)} this means redirecting between ${fmtNZD2(ks3 / 26)} (3%) and ${fmtNZD2(ks10 / 26)} (10%) per fortnight to your retirement account. Your employer's 3% contribution of ${fmtNZD(employer3)} is subject to Employer Superannuation Contribution Tax (ESCT) at ${fmtPct(result.marginalTaxRate <= 0.175 ? 0.175 : result.marginalTaxRate <= 0.30 ? 0.30 : 0.33)}, reducing the net amount reaching your KiwiSaver to approximately ${fmtNZD(Math.round(employer3 * (1 - (result.marginalTaxRate <= 0.175 ? 0.175 : result.marginalTaxRate <= 0.30 ? 0.30 : 0.33))))} per year. The government also adds a Member Tax Credit of up to $521.43 per year when you contribute at least $1,042.86 annually (at 3% on ${fmtNZD(amount)} you contribute ${fmtNZD(ks3)}, well above this threshold). For a first home buyer earning ${fmtNZD(amount)}, KiwiSaver offers two significant advantages: the ability to withdraw most of your balance for a deposit, and eligibility for the Kainga Ora First Home Grant of up to $5,000 (or $10,000 for a new build) after three or more years of membership.`;
}

/* ──────────────────── Student Loan section ──────────────────── */

export function getStudentLoanSection(amount: number): string {
  if (amount <= STUDENT_LOAN_THRESHOLD) {
    return `If you have a student loan and earn ${fmtNZD(amount)} per year, your income is below the annual repayment threshold of ${fmtNZD(STUDENT_LOAN_THRESHOLD)}, so no automatic repayments would be deducted from your pay. You may still choose to make voluntary repayments to reduce your balance.`;
  }
  const repayable = amount - STUDENT_LOAN_THRESHOLD;
  const annual = Math.round(repayable * STUDENT_LOAN_REPAYMENT_RATE * 100) / 100;
  const fortnightly = Math.round((annual / 26) * 100) / 100;

  const monthlyRepayment = Math.round((annual / 12) * 100) / 100;
  const typicalLoanBalance = 30000; // average NZ student loan
  const yearsToRepay = Math.round(typicalLoanBalance / annual * 10) / 10;
  const baseResult = calculateSalary({ annualGross: amount, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true });
  const netWithoutLoan = baseResult.netAnnual;
  const netWithLoan = netWithoutLoan - annual;

  return `If you hold a student loan on ${fmtNZD(amount)}, Inland Revenue deducts ${fmtPct(STUDENT_LOAN_REPAYMENT_RATE, 0)} on every dollar above the annual threshold of ${fmtNZD(STUDENT_LOAN_THRESHOLD)}. With ${fmtNZD(repayable)} of your income exceeding this threshold, your annual repayment is ${fmtNZD2(annual)} (${fmtNZD2(fortnightly)} per fortnight, or ${fmtNZD2(monthlyRepayment)} per month), reducing your take-home from ${fmtNZD2(netWithoutLoan)} to ${fmtNZD2(netWithLoan)} per year. On a typical $30,000 loan balance, this ${fmtNZD(amount)} salary clears the debt in approximately ${yearsToRepay} years through automatic deductions alone. Your employer handles these repayments through the PAYE system, so they appear as a standard deduction on your payslip each pay period. Because NZ student loans are interest-free domestically, every dollar of your ${fmtNZD2(monthlyRepayment)} monthly repayment goes directly to reducing principal. If you plan to remain in New Zealand, there is no financial urgency to pay faster than the automatic ${fmtNZD2(annual)} per year. However, if you are considering an OE on your ${fmtNZD(amount)} salary, be aware that overseas-based borrowers are charged interest at approximately 5% per year, which on a $30,000 balance adds roughly ${fmtNZD(Math.round(30000 * 0.05))} annually. Some earners at ${fmtNZD(amount)} choose to make voluntary lump-sum payments of ${fmtNZD(Math.round(netWithLoan * 0.05))} (5% of net income) to accelerate repayment, freeing up the ${fmtNZD2(monthlyRepayment)} per month for investing or saving toward a house deposit sooner.`;
}

/* ──────────────────── Tax optimisation tips (salary-specific) ──────────────────── */

export function getTaxTips(amount: number, result: SalaryResult): string[] {
  const band = classifyBand(amount);
  const tips: string[] = [];

  // Universal tips (with salary-specific context)
  const correctCode = amount >= IETC_MIN_INCOME && amount <= IETC_MAX_INCOME ? '"ME"' : '"M"';
  tips.push(
    `Your ${fmtNZD(amount)} salary with a marginal rate of ${fmtPct(result.marginalTaxRate)} and effective rate of ${fmtPct(result.paye / amount)} requires the correct PAYE tax code. With one job and no student loan, you should be on the ${correctCode} code. Using the wrong code could create a tax shortfall of ${fmtNZD(Math.round(amount * 0.02))} to ${fmtNZD(Math.round(amount * 0.05))} at year end, or conversely an over-deduction resulting in a refund when IRD processes your annual assessment.`
  );

  if (amount >= IETC_MIN_INCOME && amount <= IETC_MAX_INCOME) {
    tips.push(
      `Claim the Independent Earner Tax Credit (IETC). At ${fmtNZD(amount)}, you are entitled to ${fmtNZD2(result.ietc)} per year. Make sure your employer has you on the "ME" tax code so this credit is applied to your fortnightly pay rather than waiting for a year-end refund.`
    );
  }

  tips.push(
    `Review your KiwiSaver fund type to ensure it matches your risk profile and time horizon. On ${fmtNZD(amount)}, your 3% KiwiSaver of ${fmtNZD(result.kiwiSaverEmployee)} per year (plus ${fmtNZD(result.kiwiSaverEmployer)} from your employer) accumulates to roughly ${fmtNZD(Math.round((result.kiwiSaverEmployee + result.kiwiSaverEmployer) * 10 * 1.07))} over 10 years in a growth fund at 7% average return, compared to ${fmtNZD(Math.round((result.kiwiSaverEmployee + result.kiwiSaverEmployer) * 10 * 1.03))} in a conservative fund at 3%. If you are under 50 and can tolerate short-term volatility, the growth fund could deliver ${fmtNZD(Math.round((result.kiwiSaverEmployee + result.kiwiSaverEmployer) * 10 * 0.04))} more over a decade.`
  );

  // Salary-specific bracket threshold tip
  const nextBracketThreshold = PAYE_BRACKETS.find(b => b.min > amount);
  const currentBracket = PAYE_BRACKETS.filter(b => amount > b.min).pop();
  if (nextBracketThreshold && currentBracket) {
    const distToNext = nextBracketThreshold.min - amount;
    const nextRate = nextBracketThreshold.rate;
    tips.push(
      `Your salary of ${fmtNZD(amount)} is ${fmtNZD(distToNext)} below the next tax bracket threshold at ${fmtNZD(nextBracketThreshold.min)} (taxed at ${fmtPct(nextRate)}). Any pay rise within that ${fmtNZD(distToNext)} range will still be taxed at your current marginal rate of ${fmtPct(currentBracket.rate)}. A rise beyond ${fmtNZD(nextBracketThreshold.min)} only taxes the excess portion at the higher rate, so a raise always increases your take-home pay.`
    );
  }

  // Salary-specific KiwiSaver tax tip
  const additionalKS = Math.round(amount * 0.03); // extra 3% contribution
  const taxSaved = Math.round(additionalKS * result.marginalTaxRate);
  tips.push(
    `Contributing an extra 3% to KiwiSaver (going from 3% to 6% on your ${fmtNZD(amount)} salary) redirects ${fmtNZD(additionalKS)} per year from taxable spending into your retirement fund. While this is not a direct tax deduction, your effective cost is reduced because those dollars would otherwise have been available only after your ${fmtPct(result.marginalTaxRate)} marginal rate reduces future investment earnings taxed at your PIR rate.`
  );

  if (band === "entry" || band === "lower-middle") {
    tips.push(
      `Check whether you qualify for the Working for Families Tax Credit if you have dependent children. This income-tested credit can provide substantial additional income of up to $127.73 per week for the first child.`
    );
    tips.push(
      `Consider filing an individual tax return (IR3) or using the myIR auto-calculation feature at the end of the tax year. You may be entitled to a refund if tax was over-deducted, donations rebates, or if you earned interest or dividend income taxed at source.`
    );
  }

  if (band === "middle" || band === "upper-middle") {
    tips.push(
      `If you earn secondary income (e.g. from a side job or freelancing) on top of your ${fmtNZD(amount)} primary salary, make sure you are using the correct secondary tax code. At your primary income level, secondary income would be taxed at ${fmtPct(result.marginalTaxRate)} flat, so using the wrong code could result in a ${fmtNZD(Math.round(amount * 0.05 * 0.05))} to ${fmtNZD(Math.round(amount * 0.10 * 0.10))} tax bill at year end depending on the amount of secondary income.`
    );
    tips.push(
      `Maximise your PIE (Portfolio Investment Entity) fund investments. At ${fmtNZD(amount)}, your PIR (prescribed investor rate) is ${result.marginalTaxRate <= 0.175 ? '17.5%' : '28%'}, which ${result.marginalTaxRate > 0.28 ? `saves you ${fmtPct(result.marginalTaxRate - 0.28)} on every dollar of investment income compared to your marginal PAYE rate of ${fmtPct(result.marginalTaxRate)}` : 'aligns with your marginal tax rate, but still provides the advantage of final tax status meaning you do not need to file a return on PIE income'}. On ${fmtNZD(Math.round(result.netAnnual * 0.10))} of annual investments (10% of your net), this could save you ${fmtNZD(Math.round(result.netAnnual * 0.10 * 0.05 * Math.max(0, result.marginalTaxRate - 0.28)))} or more per year in tax on returns.`
    );
  }

  if (band === "high" || band === "premium" || band === "executive") {
    tips.push(
      `At your ${fmtNZD(amount)} salary with a marginal rate of ${fmtPct(result.marginalTaxRate)}, PIE funds save you ${fmtPct(result.marginalTaxRate - 0.28)} on every dollar of investment income compared to direct share ownership. If you invest ${fmtNZD(Math.round(result.netAnnual * 0.15))} annually (15% of net) and earn a 7% return, the PIE tax advantage saves you approximately ${fmtNZD(Math.round(result.netAnnual * 0.15 * 0.07 * (result.marginalTaxRate - 0.28)))} per year in tax on those returns.`
    );
    tips.push(
      `Charitable donations to approved donee organisations entitle you to a tax credit of 33.33% of the donation amount. At ${fmtNZD(amount)}, a donation of ${fmtNZD(Math.round(amount * 0.02))} (2% of gross) would return ${fmtNZD(Math.round(amount * 0.02 * 0.3333))} as a tax credit, effectively reducing the after-tax cost to ${fmtNZD(Math.round(amount * 0.02 * 0.6667))}. Keep all donation receipts and claim through your individual tax return or myIR.`
    );
    tips.push(
      `Consider income protection insurance. At ${fmtNZD(amount)}, your take home pay of ${fmtNZD2(result.netMonthly)} per month supports a substantial lifestyle that would be difficult to maintain on ACC's maximum weekly compensation alone (capped at 80% of earnings up to ${fmtNZD(ACC_EARNER_LEVY_MAX_EARNINGS)}). Income protection premiums are generally not tax-deductible for employees, but the cover protects against illness or injury that ACC does not cover.`
    );
  }

  return tips;
}

/* ──────────────────── Career context (salary-specific) ──────────────────── */

export function getCareerContext(amount: number): string {
  const band = classifyBand(amount);
  const hourly = (amount / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2);
  const roleInfo = getSalarySpecificRoles(amount);

  const salarySpecificIntro = `At ${fmtNZD(amount)} you are typically a ${roleInfo.primaryRole} with ${roleInfo.experience}. Progressing to ${roleInfo.progressionTarget} usually requires ${roleInfo.progressionSkill}. The industries most commonly paying ${fmtNZD(amount)} include ${roleInfo.industries}.`;

  switch (band) {
    case "entry":
      return `${salarySpecificIntro} At ${fmtNZD(amount)} per year ($${hourly}/hour), career advancement should be a primary focus. Consider upskilling through free online courses, industry certifications, or New Zealand's Fees Free policy if you are eligible for your first year of tertiary study. Many employers in New Zealand offer internal training pathways. Sectors with strong entry-level progression include hospitality management, retail operations, aged care, and early childhood education. Volunteering in your desired field can also open doors to paid opportunities.`;

    case "lower-middle":
      return `${salarySpecificIntro} Earning ${fmtNZD(amount)} ($${hourly}/hour) typically represents an early-career stage with clear pathways for progression. Focus on building specific technical or professional skills that increase your market value. Industry certifications, professional memberships, and a track record of reliable performance can accelerate salary growth. In New Zealand, trades workers who complete apprenticeships often see rapid salary increases, and professionals in accounting, IT, and healthcare have well-defined career ladders that can double this salary within five to ten years.`;

    case "middle": {
      const middleAdvice = amount <= 55000
        ? `At the ${fmtNZD(amount)} level ($${hourly}/hour), you are building the foundation for mid-career growth. Consider whether additional qualifications such as a graduate diploma, industry certification (e.g. CompTIA for IT, LBP for building), or professional membership would unlock the next salary band. Many New Zealand employers support professional development through study leave and fee contributions. Networking within your industry through professional associations and LinkedIn begins to pay dividends at this career stage.`
        : `On ${fmtNZD(amount)} ($${hourly}/hour), you are at a pivotal career point where specialisation and demonstrated expertise drive further salary growth. This is the level where relocating to a higher-cost city like Auckland for a better-paying role can be financially worthwhile, as the salary premium often exceeds the cost-of-living difference. Consider whether stepping into a team leadership or coordinator position would accelerate your path to the ${fmtNZD(amount + 15000)}-plus range within the next two to three years.`;
      return `${salarySpecificIntro} ${middleAdvice}`;
    }

    case "upper-middle": {
      const upperMiddleAdvice = amount <= 75000
        ? `At this stage of your career on ${fmtNZD(amount)}, focus on deepening your specialist expertise and gaining cross-functional project experience. Many professionals at this level move up by taking on supervisory duties, leading small teams, or managing a specific portfolio area. In New Zealand, industries such as technology, financial services, and engineering tend to offer the strongest salary progression from this base, with typical increases of 10-15% when moving to a more senior position.`
        : `On ${fmtNZD(amount)}, you are positioned for the transition from individual contributor to leadership. Career growth at this level often comes through securing budget responsibility, managing client relationships, or driving strategic initiatives. Consider building your professional reputation through conference presentations, industry publications, or mentoring, all of which enhance your value in the New Zealand labour market and can accelerate progression to the ${fmtNZD(amount + 20000)}-plus range.`;
      return `${salarySpecificIntro} Workers earning ${fmtNZD(amount)} ($${hourly}/hour) are typically established professionals or skilled specialists. ${upperMiddleAdvice}`;
    }

    case "high": {
      const highAdvice = amount <= 95000
        ? `At ${fmtNZD(amount)} ($${hourly}/hour), you are entering the senior professional tier. The key career decision at this level is whether to pursue people management (which typically offers a higher salary ceiling and broader organisational influence) or a specialist technical track (which offers deep expertise and often better work-life flexibility). Salary negotiation is critical at this stage; benchmark your compensation against industry surveys from Hays or Robert Half to ensure you are positioned at market rate for your experience.`
        : `Earning ${fmtNZD(amount)} ($${hourly}/hour) puts you firmly in the senior ranks. Further progression from this base typically requires either executive-level responsibility (P&L ownership, large team management, cross-departmental leadership) or rare specialist credentials (advanced certifications, published research, industry recognition). Many professionals at this level also consider whether independent consulting or contracting could yield higher total compensation, as experienced contractors in NZ can command day rates equivalent to ${fmtNZD(Math.round(amount * 1.3))} to ${fmtNZD(Math.round(amount * 1.6))} annualised.`;
      return `${salarySpecificIntro} ${highAdvice}`;
    }

    case "premium": {
      const premiumAdvice = amount <= 135000
        ? `Earning ${fmtNZD(amount)} ($${hourly}/hour) places you in senior leadership or highly specialised positions. Your compensation package at this level typically includes benefits beyond the base ${fmtNZD(amount)}: performance bonuses of 10-20%, additional leave, and professional development allowances. Career advancement from ${fmtNZD(amount)} usually requires securing general management responsibility, a partnership track, or developing a specialisation that commands premium rates. Building your professional reputation through thought leadership, speaking engagements, and strategic networking creates leverage for progression to the ${fmtNZD(amount + 30000)}-plus range.`
        : `At ${fmtNZD(amount)} ($${hourly}/hour), you are among the highest-compensated professionals in New Zealand. Total compensation at this level often exceeds the base salary by 20-40% through performance bonuses, long-term incentives, equity participation, and premium benefits. Career progression from here typically involves C-suite appointments, equity partnerships, board directorships, or establishing a high-value independent practice. Many professionals earning ${fmtNZD(amount)} are already portfolio careers combining executive roles with advisory positions, governance appointments, or strategic investments.`;
      return `${salarySpecificIntro} ${premiumAdvice}`;
    }

    case "executive":
      return `${salarySpecificIntro} At ${fmtNZD(amount)} ($${hourly}/hour), you are at the executive or elite specialist level. Your career trajectory may include C-suite positions, board directorships, equity partnerships, or founding your own venture. Total compensation at this level frequently includes significant variable components such as bonuses, long-term incentive plans, and equity participation. Many professionals at this income level engage executive recruiters and maintain active board-ready profiles. Succession planning and leadership legacy become career themes alongside continued performance and value creation.`;
  }
}

/* ──────────────────── Unique Comparisons helper ──────────────────── */

export interface ComparisonData {
  vsLower: string;
  vsHigher: string;
  raiseScenario: string;
  taxBreakdownPct: string;
  financialContext: string;
}

export function getUniqueComparisons(amount: number, result: SalaryResult): ComparisonData {
  // Use salary-specific comparison amounts that produce unique comparisons
  // Map of specific comparison targets for each salary level
  const comparisonMap: Record<number, { lower: number; higher: number; raisePct: number }> = {
    30000: { lower: 25000, higher: 40000, raisePct: 0.20 },
    40000: { lower: 30000, higher: 50000, raisePct: 0.15 },
    50000: { lower: 40000, higher: 60000, raisePct: 0.12 },
    55000: { lower: 50000, higher: 65000, raisePct: 0.10 },
    60000: { lower: 50000, higher: 70000, raisePct: 0.15 },
    70000: { lower: 60000, higher: 85000, raisePct: 0.12 },
    80000: { lower: 70000, higher: 95000, raisePct: 0.10 },
    90000: { lower: 80000, higher: 110000, raisePct: 0.12 },
    100000: { lower: 90000, higher: 130000, raisePct: 0.08 },
    120000: { lower: 100000, higher: 150000, raisePct: 0.10 },
    150000: { lower: 120000, higher: 180000, raisePct: 0.12 },
    200000: { lower: 150000, higher: 250000, raisePct: 0.08 },
  };

  const comparisons = comparisonMap[amount] || { lower: Math.max(0, amount - 15000), higher: amount + 20000, raisePct: 0.10 };
  const lowerAmount = comparisons.lower;
  const higherAmount = comparisons.higher;

  const lowerResult = lowerAmount > 0
    ? calculateSalary({ annualGross: lowerAmount, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true })
    : null;
  const higherResult = calculateSalary({ annualGross: higherAmount, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true });

  const netDiffLower = lowerResult ? Math.round(result.netAnnual - lowerResult.netAnnual) : 0;
  const grossDiffLower = amount - lowerAmount;
  const vsLower = lowerResult
    ? (amount % 20000 === 0
      ? `Moving from ${fmtNZD(lowerAmount)} to your current ${fmtNZD(amount)} salary adds ${fmtNZD(netDiffLower)} to your annual take-home (${fmtNZD(Math.round(netDiffLower / 12))} per month, ${fmtNZD2(netDiffLower / 26)} per fortnight). The ${fmtNZD(grossDiffLower)} gross increase loses ${fmtNZD(Math.round(grossDiffLower - netDiffLower))} to deductions: ${fmtNZD(Math.round(result.paye - lowerResult.paye))} extra PAYE, ${fmtNZD(Math.round(result.accLevy - lowerResult.accLevy))} extra ACC, and ${fmtNZD(Math.round(result.kiwiSaverEmployee - lowerResult.kiwiSaverEmployee))} extra KiwiSaver. Your effective retention rate on this increment is ${fmtPct(netDiffLower / grossDiffLower)}.`
      : `Compared to someone earning ${fmtNZD(lowerAmount)}, your ${fmtNZD(amount)} salary gives you ${fmtNZD(netDiffLower)} more take-home per year (${fmtNZD(Math.round(netDiffLower / 12))} more per month). Of the ${fmtNZD(grossDiffLower)} difference in gross pay, you retain ${fmtPct(netDiffLower / grossDiffLower)} after ${fmtNZD(Math.round(result.paye - lowerResult.paye))} additional PAYE, ${fmtNZD(Math.round(result.accLevy - lowerResult.accLevy))} additional ACC, and ${fmtNZD(Math.round(result.kiwiSaverEmployee - lowerResult.kiwiSaverEmployee))} additional KiwiSaver deductions.`)
    : `At ${fmtNZD(amount)}, your combined PAYE and ACC deductions total ${fmtNZD(Math.round(result.paye + result.accLevy))} per year, giving you an effective tax rate of ${fmtPct((result.paye + result.accLevy) / amount)}.`;

  const vsHigher = `If your salary grew to ${fmtNZD(higherAmount)}, your annual take-home would rise from ${fmtNZD2(result.netAnnual)} to ${fmtNZD2(higherResult.netAnnual)}, an increase of ${fmtNZD(Math.round(higherResult.netAnnual - result.netAnnual))} per year or ${fmtNZD(Math.round((higherResult.netMonthly - result.netMonthly)))} per month. On that additional ${fmtNZD(higherAmount - amount)}, you would keep ${fmtPct((higherResult.netAnnual - result.netAnnual) / (higherAmount - amount))} after the marginal rate of ${fmtPct(higherResult.marginalTaxRate)} applies to income above your current level.`;

  // Raise scenario: use salary-specific percentage from comparison map
  const raisePct = comparisons.raisePct;
  const raiseAmount = Math.round(amount * (1 + raisePct));
  const raiseResult = calculateSalary({ annualGross: raiseAmount, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true });
  const raiseGross = raiseAmount - amount;
  const raiseNet = Math.round(raiseResult.netAnnual - result.netAnnual);
  const raiseEffective = (raiseNet / raiseGross * 100).toFixed(1);
  const raisePctLabel = Math.round(raisePct * 100);

  const raiseScenario = `If you received a ${raisePctLabel}% pay rise to ${fmtNZD(raiseAmount)}, your take-home would increase by ${fmtNZD(raiseNet)} per year (${fmtNZD(Math.round(raiseNet / 12))} per month, or ${fmtNZD2(raiseNet / 26)} per fortnight). Of that ${fmtNZD(raiseGross)} gross raise, ${raiseEffective}% reaches your bank account; the remainder goes to PAYE at your marginal rate of ${fmtPct(result.marginalTaxRate)}, plus proportional ACC and KiwiSaver increases. Your effective tax rate would shift from ${fmtPct(result.paye / amount)} to ${fmtPct(raiseResult.paye / raiseAmount)}.`;

  // Percentage breakdown with comparison to median earner
  const payePct = (result.paye / amount * 100).toFixed(1);
  const accPct = (result.accLevy / amount * 100).toFixed(1);
  const ksPct = (result.kiwiSaverEmployee / amount * 100).toFixed(1);
  const netPct = (result.netAnnual / amount * 100).toFixed(1);
  const medianResult = calculateSalary({ annualGross: NZ_MEDIAN_SALARY, kiwiSaverRate: 0.03, hasStudentLoan: false, isResident: true });
  const medianNetPct = (medianResult.netAnnual / NZ_MEDIAN_SALARY * 100).toFixed(1);

  const taxBreakdownPct = `On your ${fmtNZD(amount)} gross salary, ${payePct}% (${fmtNZD(Math.round(result.paye))}) goes to PAYE income tax, ${accPct}% (${fmtNZD(Math.round(result.accLevy))}) to the ACC Earner's Levy, and ${ksPct}% (${fmtNZD(Math.round(result.kiwiSaverEmployee))}) to your KiwiSaver account. You retain ${netPct}% as take-home pay (${fmtNZD2(result.netAnnual)}), compared to ${medianNetPct}% retained by someone on the median salary of ${fmtNZD(NZ_MEDIAN_SALARY)}. Including your employer's ${fmtNZD(Math.round(result.kiwiSaverEmployer))} KiwiSaver contribution, your total compensation package is effectively ${fmtNZD(amount + Math.round(result.kiwiSaverEmployer))}.`;

  // Additional unique planning context
  const weeklyNet = Math.round(result.netAnnual / 52 * 100) / 100;
  const hourly = (amount / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2);
  const effectiveHourly = (result.netAnnual / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2);
  const totalGovtTake = result.paye + result.accLevy;
  const totalGovtPct = (totalGovtTake / amount * 100).toFixed(1);

  const financialContext = `To put your ${fmtNZD(amount)} salary in perspective: you earn $${hourly} per hour gross but only $${effectiveHourly} per hour hits your account after deductions. Each week, ${fmtNZD2(weeklyNet)} is yours to spend or save. The government takes ${fmtNZD(Math.round(totalGovtTake))} per year (${totalGovtPct}% combined PAYE and ACC), while ${fmtNZD(Math.round(result.kiwiSaverEmployee))} goes to your future self via KiwiSaver. Over a 10-year career at ${fmtNZD(amount)}, you would accumulate approximately ${fmtNZD(Math.round((result.kiwiSaverEmployee + result.kiwiSaverEmployer) * 10 * 1.05))} in KiwiSaver (assuming 5% average returns), pay ${fmtNZD(Math.round(totalGovtTake * 10))} in total tax, and take home ${fmtNZD(Math.round(result.netAnnual * 10))} over the decade.`;

  return { vsLower, vsHigher, raiseScenario, taxBreakdownPct, financialContext };
}

/* ──────────────────── 6 FAQs with calculated values ──────────────────── */

export interface FAQ {
  question: string;
  answer: string;
}

export function buildFaqs(amount: number, result: SalaryResult): FAQ[] {
  const hourly = (amount / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2);
  const studentLoanRepayable = Math.max(0, amount - STUDENT_LOAN_THRESHOLD);
  const studentLoanAnnual = Math.round(studentLoanRepayable * STUDENT_LOAN_REPAYMENT_RATE * 100) / 100;
  const studentLoanFortnightly = Math.round((studentLoanAnnual / 26) * 100) / 100;
  const netWithLoan = result.netAnnual - studentLoanAnnual;
  const ks6Employee = Math.round(amount * 0.06);
  const ks10Employee = Math.round(amount * 0.10);
  const netKs6 = result.netAnnual - (ks6Employee - result.kiwiSaverEmployee);
  const netKs10 = result.netAnnual - (ks10Employee - result.kiwiSaverEmployee);
  const brackets = getPAYEBreakdown(amount);

  // Build the PAYE breakdown sentence
  const bracketParts = brackets.map(
    (b) => `${b.rate} on ${fmtNZD(b.taxable)} (${fmtNZD2(b.tax)})`
  );

  const faqs: FAQ[] = [
    {
      question: `How much PAYE income tax do I pay on a ${fmtNZD(amount)} salary in New Zealand?`,
      answer: `On a ${fmtNZD(amount)} salary in the 2025-2026 New Zealand tax year, you pay ${fmtNZD2(result.paye)} in PAYE income tax. The progressive calculation is: ${bracketParts.join("; ")}. Your effective tax rate is ${fmtPct(result.paye / amount)}, meaning you keep ${fmtPct(1 - result.paye / amount)} of your gross salary before other deductions. Your marginal tax rate (the rate on your last dollar earned) is ${fmtPct(result.marginalTaxRate)}.`,
    },
    {
      question: `What is my take home pay on ${fmtNZD(amount)} in New Zealand after all deductions?`,
      answer: `With a ${fmtNZD(amount)} gross salary, 3% KiwiSaver contribution, and no student loan, your annual take home pay is ${fmtNZD2(result.netAnnual)}. This breaks down to ${fmtNZD2(result.netMonthly)} per month, ${fmtNZD2(result.netFortnightly)} per fortnight, or ${fmtNZD2(result.netWeekly)} per week. Your total deductions are ${fmtNZD2(result.totalDeductions)}, comprising ${fmtNZD2(result.paye)} PAYE, ${fmtNZD2(result.accLevy)} ACC Earner's Levy, and ${fmtNZD2(result.kiwiSaverEmployee)} KiwiSaver employee contribution.${result.ietc > 0 ? ` The IETC adds back ${fmtNZD2(result.ietc)}.` : ""} Your employer also contributes ${fmtNZD2(result.kiwiSaverEmployer)} to your KiwiSaver account.`,
    },
    {
      question: `How much is the ACC Earner's Levy on a ${fmtNZD(amount)} salary?`,
      answer: `The ACC Earner's Levy on a ${fmtNZD(amount)} salary is ${fmtNZD2(result.accLevy)} per year (${fmtNZD2(result.accLevy / 26)} per fortnight). The levy is charged at ${fmtPct(ACC_EARNER_LEVY_RATE, 2)} of your gross earnings, capped at maximum liable earnings of ${fmtNZD(ACC_EARNER_LEVY_MAX_EARNINGS)}.${amount >= ACC_EARNER_LEVY_MAX_EARNINGS ? ` Since your income exceeds the cap, your levy is fixed at ${fmtNZD2(ACC_EARNER_LEVY_MAX_EARNINGS * ACC_EARNER_LEVY_RATE)} regardless of additional earnings.` : ""} The ACC scheme covers all New Zealand residents and workers for personal injury from accidents, regardless of fault. It funds treatment costs, weekly compensation if you cannot work, and rehabilitation services.`,
    },
    {
      question: `What happens to my ${fmtNZD(amount)} take home pay if I have a student loan?`,
      answer: studentLoanAnnual > 0
        ? `If you have a student loan on a ${fmtNZD(amount)} salary, ${fmtPct(STUDENT_LOAN_REPAYMENT_RATE, 0)} is deducted on every dollar above the ${fmtNZD(STUDENT_LOAN_THRESHOLD)} annual threshold. Your repayable income is ${fmtNZD(studentLoanRepayable)}, resulting in annual repayments of ${fmtNZD2(studentLoanAnnual)} (${fmtNZD2(studentLoanFortnightly)} per fortnight or ${fmtNZD2(studentLoanAnnual / 12)} per month). This reduces your annual take-home from ${fmtNZD2(result.netAnnual)} to approximately ${fmtNZD2(netWithLoan)} (${fmtNZD2(netWithLoan / 26)} per fortnight). On a typical $30,000 student loan balance, your ${fmtNZD(amount)} salary would clear the loan in approximately ${(30000 / studentLoanAnnual).toFixed(1)} years through automatic deductions alone. Since NZ student loans carry no interest while you remain resident, there is no financial penalty for paying at the standard rate rather than making extra repayments.`
        : `On a ${fmtNZD(amount)} salary, your income is below the student loan repayment threshold of ${fmtNZD(STUDENT_LOAN_THRESHOLD)}, so no automatic deductions would be made. Your take home pay remains ${fmtNZD2(result.netAnnual)} per year with 3% KiwiSaver. You may still make voluntary repayments through myIR.`,
    },
    {
      question: `How does changing my KiwiSaver rate affect my ${fmtNZD(amount)} take home pay?`,
      answer: `On ${fmtNZD(amount)}, increasing your KiwiSaver rate directly reduces take-home pay but accelerates retirement savings. At 3%, you contribute ${fmtNZD(result.kiwiSaverEmployee)}/year and take home ${fmtNZD2(result.netAnnual)}. At 6%, your contribution rises to ${fmtNZD(ks6Employee)}/year and take home drops to ${fmtNZD2(netKs6)} (a reduction of ${fmtNZD2(result.netAnnual - netKs6)} per year or ${fmtNZD2((result.netAnnual - netKs6) / 26)} per fortnight). At 10%, you put in ${fmtNZD(ks10Employee)}/year with take home of ${fmtNZD2(netKs10)}. The gap between 3% and 10% on ${fmtNZD(amount)} is ${fmtNZD(ks10Employee - result.kiwiSaverEmployee)} per year (${fmtNZD2((ks10Employee - result.kiwiSaverEmployee) / 26)} per fortnight) less in your pay packet but ${fmtNZD(ks10Employee - result.kiwiSaverEmployee)} more flowing into retirement savings. Your employer contributes a fixed 3% (${fmtNZD(result.kiwiSaverEmployer)}) regardless of your chosen rate, meaning at the 10% option your combined annual KiwiSaver inflow would be ${fmtNZD(ks10Employee + Math.round(result.kiwiSaverEmployer))}.`,
    },
    {
      question: `What is the hourly rate equivalent of a ${fmtNZD(amount)} annual salary in NZ?`,
      answer: `A ${fmtNZD(amount)} annual salary equates to $${hourly} per hour based on a standard 40-hour work week over 52 weeks (${STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR} hours per year). After tax and deductions (with 3% KiwiSaver, no student loan), your effective hourly take home rate is approximately $${(result.netAnnual / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2)} per hour. That means for every hour you work on ${fmtNZD(amount)}, $${(amount / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR) - result.netAnnual / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2)} goes to deductions. The current NZ minimum wage of $23.15/hour annualises to $48,152, making your ${fmtNZD(amount)} salary ${((amount / 48152 - 1) * 100).toFixed(0)}% above minimum wage in gross terms and ${((result.netAnnual / (48152 * 0.84) - 1) * 100).toFixed(0)}% above in take-home terms.`,
    },
  ];

  return faqs;
}
