export interface CalculatorInputs {
  counterSales: number;
  wholesaleSales: number;
  onlineSales: number;
  cateringSales: number;
  ingredientsSpend: number;
  packagingSpend: number;
  wastagePercent: number;
  totalWeeklyWages: number;
  staffCount: number;
  ownerHoursPerWeek: number;
  rent: number;
  utilities: number;
  insurance: number;
  equipment: number;
  marketing: number;
  otherCosts: number;
}

export interface CalculatorResults {
  totalWeeklyRevenue: number;
  totalWeeklyCOGS: number;
  totalMonthlyOverheads: number;
  weeklyOverheads: number;
  grossProfit: number;
  grossProfitPct: number;
  labourPct: number;
  primeCost: number;
  primeCostPct: number;
  netProfit: number;
  netProfitPct: number;
  ownerHourlyRate: number;
  annualisedNetProfit: number;
}

export type TrafficLight = 'green' | 'amber' | 'red' | 'danger' | 'none';
