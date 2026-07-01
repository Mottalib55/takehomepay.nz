import { describe, it, expect } from "vitest";
import {
  calculatePAYE,
  calculateACC,
  calculateKiwiSaver,
  calculateStudentLoan,
  calculateIETC,
  calculateSalary,
  getMarginalRate,
} from "./engine.js";

describe("calculatePAYE", () => {
  it("should return 0 for zero income", () => {
    expect(calculatePAYE(0)).toBe(0);
  });

  it("should return 0 for negative income", () => {
    expect(calculatePAYE(-10000)).toBe(0);
  });

  it("should calculate tax within the first bracket (10.5%)", () => {
    // $10,000 * 10.5% = $1,050
    expect(calculatePAYE(10_000)).toBe(1050);
  });

  it("should calculate tax across first two brackets", () => {
    // $30,000:
    // $15,600 * 10.5% = $1,638
    // ($30,000 - $15,600) * 17.5% = $14,400 * 17.5% = $2,520
    // Total = $4,158
    expect(calculatePAYE(30_000)).toBe(4158);
  });

  it("should calculate tax across three brackets", () => {
    // $60,000:
    // $15,600 * 10.5% = $1,638
    // ($53,500 - $15,600) * 17.5% = $37,900 * 17.5% = $6,632.50
    // ($60,000 - $53,500) * 30% = $6,500 * 30% = $1,950
    // Total = $10,220.50
    expect(calculatePAYE(60_000)).toBe(10220.5);
  });

  it("should calculate tax across four brackets", () => {
    // $100,000:
    // $15,600 * 10.5% = $1,638
    // ($53,500 - $15,600) * 17.5% = $6,632.50
    // ($78,100 - $53,500) * 30% = $7,380
    // ($100,000 - $78,100) * 33% = $7,227
    // Total = $22,877.50
    expect(calculatePAYE(100_000)).toBe(22877.5);
  });

  it("should calculate tax in the top 39% bracket for high income", () => {
    // $200,000:
    // $15,600 * 10.5% = $1,638
    // ($53,500 - $15,600) * 17.5% = $6,632.50
    // ($78,100 - $53,500) * 30% = $7,380
    // ($180,000 - $78,100) * 33% = $33,627
    // ($200,000 - $180,000) * 39% = $7,800
    // Total = $57,077.50
    expect(calculatePAYE(200_000)).toBe(57077.5);
  });
});

describe("calculateACC", () => {
  it("should return 0 for zero income", () => {
    expect(calculateACC(0)).toBe(0);
  });

  it("should calculate ACC levy for income below cap", () => {
    // $50,000 * 1.60% = $800
    expect(calculateACC(50_000)).toBe(800);
  });

  it("should cap ACC levy at maximum liable earnings", () => {
    // $142,283 * 1.60% = $2,276.53 (regardless of earning more)
    const levyAtCap = calculateACC(142_283);
    const levyAboveCap = calculateACC(200_000);
    expect(levyAtCap).toBe(2276.53);
    expect(levyAboveCap).toBe(levyAtCap);
  });
});

describe("calculateKiwiSaver", () => {
  it("should calculate 3% employee and 3% employer contributions", () => {
    const result = calculateKiwiSaver(60_000, 0.03);
    expect(result.employee).toBe(1800);
    expect(result.employer).toBe(1800);
  });

  it("should calculate 8% employee contribution", () => {
    const result = calculateKiwiSaver(60_000, 0.08);
    expect(result.employee).toBe(4800);
    expect(result.employer).toBe(1800); // Employer always 3%
  });

  it("should return 0 for zero income", () => {
    const result = calculateKiwiSaver(0, 0.03);
    expect(result.employee).toBe(0);
    expect(result.employer).toBe(0);
  });
});

describe("calculateStudentLoan", () => {
  it("should return 0 when income is below threshold", () => {
    expect(calculateStudentLoan(20_000)).toBe(0);
  });

  it("should return 0 when income equals threshold", () => {
    expect(calculateStudentLoan(22_828)).toBe(0);
  });

  it("should calculate repayment on income above threshold", () => {
    // ($50,000 - $22,828) * 12% = $27,172 * 0.12 = $3,260.64
    expect(calculateStudentLoan(50_000)).toBe(3260.64);
  });
});

describe("calculateIETC", () => {
  it("should return 0 for income below $24,000", () => {
    expect(calculateIETC(23_000)).toBe(0);
  });

  it("should return full $520 for income $24,000–$44,000", () => {
    expect(calculateIETC(30_000)).toBe(520);
    expect(calculateIETC(44_000)).toBe(520);
  });

  it("should abate between $44,000 and $48,000", () => {
    // $46,000: $520 - ($46,000 - $44,000) * 0.13 = $520 - $260 = $260
    expect(calculateIETC(46_000)).toBe(260);
  });

  it("should return 0 for income above $48,000", () => {
    expect(calculateIETC(50_000)).toBe(0);
  });
});

describe("getMarginalRate", () => {
  it("should return 10.5% for low income", () => {
    expect(getMarginalRate(10_000)).toBe(0.105);
  });

  it("should return 39% for income over $180,000", () => {
    expect(getMarginalRate(200_000)).toBe(0.39);
  });
});

describe("calculateSalary (integration)", () => {
  it("should calculate full breakdown for typical NZ salary", () => {
    const result = calculateSalary({
      annualGross: 65_000,
      kiwiSaverRate: 0.03,
      hasStudentLoan: false,
      isResident: true,
    });

    expect(result.grossAnnual).toBe(65_000);
    expect(result.paye).toBeGreaterThan(0);
    expect(result.accLevy).toBeGreaterThan(0);
    expect(result.kiwiSaverEmployee).toBe(1950);
    expect(result.kiwiSaverEmployer).toBe(1950);
    expect(result.studentLoanRepayment).toBe(0);
    expect(result.netAnnual).toBeLessThan(65_000);
    expect(result.netAnnual).toBeGreaterThan(0);
    expect(result.effectiveTaxRate).toBeGreaterThan(0);
    expect(result.effectiveTaxRate).toBeLessThan(1);
  });

  it("should include student loan repayment when enabled", () => {
    const withLoan = calculateSalary({
      annualGross: 65_000,
      kiwiSaverRate: 0.03,
      hasStudentLoan: true,
      isResident: true,
    });

    const withoutLoan = calculateSalary({
      annualGross: 65_000,
      kiwiSaverRate: 0.03,
      hasStudentLoan: false,
      isResident: true,
    });

    expect(withLoan.studentLoanRepayment).toBeGreaterThan(0);
    expect(withLoan.netAnnual).toBeLessThan(withoutLoan.netAnnual);
  });

  it("should not apply IETC for non-residents", () => {
    const resident = calculateSalary({
      annualGross: 35_000,
      kiwiSaverRate: 0.03,
      hasStudentLoan: false,
      isResident: true,
    });

    const nonResident = calculateSalary({
      annualGross: 35_000,
      kiwiSaverRate: 0.03,
      hasStudentLoan: false,
      isResident: false,
    });

    expect(resident.ietc).toBe(520);
    expect(nonResident.ietc).toBe(0);
    expect(resident.netAnnual).toBeGreaterThan(nonResident.netAnnual);
  });
});
