import type { CalculatorInputs, CalculatorResults } from './types';

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const totalWeeklyRevenue =
    inputs.counterSales + inputs.wholesaleSales + inputs.onlineSales + inputs.cateringSales;

  const totalWeeklyCOGS =
    inputs.ingredientsSpend +
    inputs.packagingSpend +
    inputs.ingredientsSpend * (inputs.wastagePercent / 100);

  const totalMonthlyOverheads =
    inputs.rent + inputs.utilities + inputs.insurance +
    inputs.equipment + inputs.marketing + inputs.otherCosts;

  const weeklyOverheads = totalMonthlyOverheads / 4.33;

  const grossProfit = totalWeeklyRevenue - totalWeeklyCOGS;
  const grossProfitPct = totalWeeklyRevenue > 0 ? grossProfit / totalWeeklyRevenue : 0;

  const labourPct = totalWeeklyRevenue > 0 ? inputs.totalWeeklyWages / totalWeeklyRevenue : 0;

  const primeCost = totalWeeklyCOGS + inputs.totalWeeklyWages;
  const primeCostPct = totalWeeklyRevenue > 0 ? primeCost / totalWeeklyRevenue : 0;

  const netProfit = totalWeeklyRevenue - totalWeeklyCOGS - inputs.totalWeeklyWages - weeklyOverheads;
  const netProfitPct = totalWeeklyRevenue > 0 ? netProfit / totalWeeklyRevenue : 0;

  const ownerHourlyRate = inputs.ownerHoursPerWeek > 0 ? netProfit / inputs.ownerHoursPerWeek : 0;
  const annualisedNetProfit = netProfit * 52;

  return {
    totalWeeklyRevenue,
    totalWeeklyCOGS,
    totalMonthlyOverheads,
    weeklyOverheads,
    grossProfit,
    grossProfitPct,
    labourPct,
    primeCost,
    primeCostPct,
    netProfit,
    netProfitPct,
    ownerHourlyRate,
    annualisedNetProfit,
  };
}
