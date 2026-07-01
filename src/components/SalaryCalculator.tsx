import { useState, useMemo, useCallback } from "react";
import { calculateSalary, type SalaryResult } from "../lib/engine.js";
import type { KiwiSaverRate } from "../lib/tax-rates-2026.js";
import {
  WEEKS_PER_YEAR,
  MINIMUM_WAGE_HOURLY,
  STANDARD_HOURS_PER_WEEK,
} from "../lib/tax-rates-2026.js";

type PayView = "annual" | "monthly" | "fortnightly" | "weekly";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export default function SalaryCalculator() {
  const [inputMode, setInputMode] = useState<"annual" | "hourly">("annual");
  const [annualGross, setAnnualGross] = useState<string>("65000");
  const [hourlyRate, setHourlyRate] = useState<string>("31.25");
  const [kiwiSaverRate, setKiwiSaverRate] = useState<KiwiSaverRate>(0.03);
  const [hasStudentLoan, setHasStudentLoan] = useState(false);
  const [isResident, setIsResident] = useState(true);
  const [payView, setPayView] = useState<PayView>("annual");

  const computedAnnualGross = useMemo(() => {
    if (inputMode === "hourly") {
      const rate = parseFloat(hourlyRate) || 0;
      return rate * STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR;
    }
    return parseFloat(annualGross) || 0;
  }, [inputMode, annualGross, hourlyRate]);

  const result: SalaryResult = useMemo(
    () =>
      calculateSalary({
        annualGross: computedAnnualGross,
        kiwiSaverRate,
        hasStudentLoan,
        isResident,
      }),
    [computedAnnualGross, kiwiSaverRate, hasStudentLoan, isResident]
  );

  const handleAnnualChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnnualGross(e.target.value);
      const val = parseFloat(e.target.value) || 0;
      if (val > 0) {
        setHourlyRate(
          (val / (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)).toFixed(2)
        );
      }
    },
    []
  );

  const handleHourlyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHourlyRate(e.target.value);
      const val = parseFloat(e.target.value) || 0;
      if (val > 0) {
        setAnnualGross(
          (val * STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR).toFixed(0)
        );
      }
    },
    []
  );

  const getDivisor = (view: PayView): number => {
    switch (view) {
      case "annual":
        return 1;
      case "monthly":
        return 12;
      case "fortnightly":
        return 26;
      case "weekly":
        return 52;
    }
  };

  const getViewLabel = (view: PayView): string => {
    switch (view) {
      case "annual":
        return "Yearly";
      case "monthly":
        return "Monthly";
      case "fortnightly":
        return "Fortnightly";
      case "weekly":
        return "Weekly";
    }
  };

  const viewDivisor = getDivisor(payView);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Your Income Details
          </h2>

          {/* Input Mode Toggle */}
          <div className="flex rounded-lg bg-surface-alt p-1 mb-6">
            <button
              onClick={() => setInputMode("annual")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inputMode === "annual"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Annual Salary
            </button>
            <button
              onClick={() => setInputMode("hourly")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inputMode === "hourly"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Hourly Rate
            </button>
          </div>

          {/* Salary Input */}
          {inputMode === "annual" ? (
            <div className="mb-5">
              <label
                htmlFor="annual-salary"
                className="block text-sm font-semibold text-text mb-2"
              >
                Annual Gross Salary (NZD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">
                  $
                </span>
                <input
                  id="annual-salary"
                  type="number"
                  value={annualGross}
                  onChange={handleAnnualChange}
                  min="0"
                  step="1000"
                  className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                  placeholder="65000"
                />
              </div>
            </div>
          ) : (
            <div className="mb-5">
              <label
                htmlFor="hourly-rate"
                className="block text-sm font-semibold text-text mb-2"
              >
                Hourly Rate (NZD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">
                  $
                </span>
                <input
                  id="hourly-rate"
                  type="number"
                  value={hourlyRate}
                  onChange={handleHourlyChange}
                  min="0"
                  step="0.25"
                  className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                  placeholder="31.25"
                />
              </div>
              <p className="text-xs text-text-muted mt-1">
                Based on {STANDARD_HOURS_PER_WEEK} hours/week. NZ minimum wage:
                ${MINIMUM_WAGE_HOURLY}/hr
              </p>
            </div>
          )}

          {/* Equivalent display */}
          <div className="bg-surface-alt rounded-lg p-3 mb-5 text-sm text-text-muted">
            {inputMode === "annual" ? (
              <span>
                Equivalent hourly rate:{" "}
                <strong className="text-text">
                  $
                  {(
                    computedAnnualGross /
                    (STANDARD_HOURS_PER_WEEK * WEEKS_PER_YEAR)
                  ).toFixed(2)}
                  /hr
                </strong>
              </span>
            ) : (
              <span>
                Equivalent annual salary:{" "}
                <strong className="text-text">
                  {formatCurrency(computedAnnualGross)}
                </strong>
              </span>
            )}
          </div>

          {/* KiwiSaver */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-text mb-2">
              KiwiSaver Employee Rate
            </label>
            <div className="grid grid-cols-5 gap-2">
              {([0.03, 0.04, 0.06, 0.08, 0.10] as KiwiSaverRate[]).map(
                (rate) => (
                  <button
                    key={rate}
                    onClick={() => setKiwiSaverRate(rate)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                      kiwiSaverRate === rate
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-text border-border hover:border-primary"
                    }`}
                  >
                    {(rate * 100).toFixed(0)}%
                  </button>
                )
              )}
            </div>
          </div>

          {/* Student Loan */}
          <div className="mb-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasStudentLoan}
                onChange={(e) => setHasStudentLoan(e.target.checked)}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <div>
                <span className="text-sm font-semibold text-text">
                  Student Loan
                </span>
                <p className="text-xs text-text-muted">
                  12% repayment on income above $22,828/year
                </p>
              </div>
            </label>
          </div>

          {/* Resident */}
          <div className="mb-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isResident}
                onChange={(e) => setIsResident(e.target.checked)}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <div>
                <span className="text-sm font-semibold text-text">
                  NZ Tax Resident
                </span>
                <p className="text-xs text-text-muted">
                  Eligible for Independent Earner Tax Credit (IETC)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Your Results</h2>
          </div>

          {/* Pay View Toggle */}
          <div className="flex rounded-lg bg-surface-alt p-1 mb-6">
            {(["annual", "monthly", "fortnightly", "weekly"] as PayView[]).map(
              (view) => (
                <button
                  key={view}
                  onClick={() => setPayView(view)}
                  className={`flex-1 py-2 px-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    payView === view
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {getViewLabel(view)}
                </button>
              )
            )}
          </div>

          {/* Net Pay Hero */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-6 mb-6 text-white text-center">
            <p className="text-sm opacity-80 mb-1">
              Your Take Home Pay ({getViewLabel(payView)})
            </p>
            <p className="text-3xl sm:text-4xl font-bold">
              {formatCurrency(result.netAnnual / viewDivisor)}
            </p>
            <p className="text-sm opacity-80 mt-2">
              Effective tax rate: {formatPercent(result.effectiveTaxRate)} |
              Marginal: {formatPercent(result.marginalTaxRate)}
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-text-muted">Gross Income</span>
              <span className="font-semibold text-text">
                {formatCurrency(result.grossAnnual / viewDivisor)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-secondary">PAYE Income Tax</span>
              <span className="font-semibold text-secondary">
                -{formatCurrency(result.paye / viewDivisor)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-secondary">
                ACC Earner&apos;s Levy
              </span>
              <span className="font-semibold text-secondary">
                -{formatCurrency(result.accLevy / viewDivisor)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-secondary">
                KiwiSaver ({(kiwiSaverRate * 100).toFixed(0)}%)
              </span>
              <span className="font-semibold text-secondary">
                -{formatCurrency(result.kiwiSaverEmployee / viewDivisor)}
              </span>
            </div>

            {hasStudentLoan && result.studentLoanRepayment > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-secondary">
                  Student Loan (12%)
                </span>
                <span className="font-semibold text-secondary">
                  -{formatCurrency(result.studentLoanRepayment / viewDivisor)}
                </span>
              </div>
            )}

            {result.ietc > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-green-600">IETC Credit</span>
                <span className="font-semibold text-green-600">
                  +{formatCurrency(result.ietc / viewDivisor)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 bg-surface-alt rounded-lg px-3 mt-4">
              <span className="font-bold text-primary">Take Home Pay</span>
              <span className="font-bold text-primary text-lg">
                {formatCurrency(result.netAnnual / viewDivisor)}
              </span>
            </div>

            {/* Employer KiwiSaver note */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-text-muted">
              <strong className="text-text">Employer KiwiSaver (3%):</strong>{" "}
              Your employer contributes an additional{" "}
              {formatCurrency(result.kiwiSaverEmployer / viewDivisor)}{" "}
              {getViewLabel(payView).toLowerCase()} to your KiwiSaver account
              (not shown in take home pay).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
