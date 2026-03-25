import type { CalculatorResults, TrafficLight } from './types';

export function gpTrafficLight(pct: number): TrafficLight {
  if (pct >= 0.65) return 'green';
  if (pct >= 0.60) return 'amber';
  if (pct >= 0.50) return 'red';
  return 'danger';
}

export function labourTrafficLight(pct: number): TrafficLight {
  if (pct < 0.3) return 'green';
  if (pct <= 0.35) return 'amber';
  return 'red';
}

export function primeCostTrafficLight(pct: number): TrafficLight {
  if (pct <= 0.55) return 'green';
  if (pct <= 0.65) return 'amber';
  if (pct <= 0.75) return 'red';
  return 'danger';
}

export function overheadsTrafficLight(pct: number): TrafficLight {
  if (pct < 0.1) return 'green';
  if (pct <= 0.15) return 'amber';
  return 'red';
}

export function netProfitTrafficLight(pct: number): TrafficLight {
  if (pct > 0.1) return 'green';
  if (pct >= 0.05) return 'amber';
  return 'red';
}

export function getVerdict(results: CalculatorResults): string {
  const gp = gpTrafficLight(results.grossProfitPct);
  const labour = labourTrafficLight(results.labourPct);
  const prime = primeCostTrafficLight(results.primeCostPct);
  const net = netProfitTrafficLight(results.netProfitPct);
  const all = [gp, labour, prime, net];

  const dangers = all.filter(l => l === 'danger').length;
  const reds = all.filter(l => l === 'red' || l === 'danger').length;
  const greens = all.filter(l => l === 'green').length;

  // Critical — any metric at danger level
  if (dangers >= 2)
    return "This is a crisis. Your bakery is haemorrhaging money. Every week you operate like this, you're going deeper into the hole. This needs fixing now — not next month, now.";
  if (gp === 'danger')
    return "Your gross margin is below 50% — you're literally giving food away. Your recipes are drastically underpriced or your ingredient costs are out of control. This is the most urgent fix in your business.";
  if (prime === 'danger')
    return "Your prime cost is above 75%. For every £1 that comes in, more than 75p goes straight back out on ingredients and staff. There's almost nothing left. This isn't sustainable — it needs immediate action.";

  // Strong net profit overrides a single amber metric
  if (greens === 4)
    return "Your fundamentals are solid. Now it's about optimising and scaling. You're in a strong position to grow.";
  if (net === 'green' && reds === 0)
    return "You're profitable, which puts you ahead of most. But there's margin being left on the table — tighten your prime cost and you'll unlock serious growth.";
  if (net === 'green' && reds === 1)
    return "You're making money despite some leaks. Fix the red flag below and your profit jumps significantly — you're closer than you think.";
  if (reds >= 3)
    return "You're working for free. Your bakery is a job, not a business. The good news: this is fixable — but not by working harder.";
  if (reds >= 2)
    return "There are real problems here. Two or more of your key metrics are in the danger zone. Without fixing these, one bad month puts you under.";
  if (prime === 'red')
    return "Your prime cost is killing you. This is the number that decides if your bakery makes money — and right now, it's eating everything.";
  if (net === 'red')
    return "Your overheads are strangling your profit. Revenue might look fine, but by the time you've paid for everything, there's nothing left.";
  return "You're surviving, but there's no margin for error. One bad month and you're in trouble. There's real money being left on the table here.";
}

export interface Diagnostic {
  title: string;
  body: string;
  show: boolean;
}

export function getDiagnostics(results: CalculatorResults): Diagnostic[] {
  const allGreen =
    gpTrafficLight(results.grossProfitPct) === 'green' &&
    labourTrafficLight(results.labourPct) === 'green' &&
    primeCostTrafficLight(results.primeCostPct) === 'green' &&
    netProfitTrafficLight(results.netProfitPct) === 'green';

  return [
    {
      title: 'Ingredient Costs',
      body: "Your recipes are costing you more than you think. Recipe costing is the #1 profit leak in bakeries. Most owners guess their ingredient costs — and they always guess low. Until you cost every recipe to the gram, you're flying blind.",
      show: results.grossProfitPct < 0.55,
    },
    {
      title: 'Labour',
      body: "You're overstaffed or under-revenue'd. Every extra hour on the rota that doesn't generate sales is eating your margin. Either your team isn't productive enough, or you don't have the revenue to justify the hours you're running.",
      show: results.labourPct > 0.35,
    },
    {
      title: 'Prime Cost',
      body: "Your prime cost is over 70% — you're working for free. This is the number that decides if your bakery makes money. Everything above 70% means the business is bleeding. Below 60% is where you start to breathe.",
      show: results.primeCostPct > 0.7,
    },
    {
      title: 'Overheads',
      body: "Your overheads are too high relative to revenue. Time to renegotiate, cut, or grow. Rent, utilities, subscriptions — they all add up. If your net margin is under 5%, your fixed costs are strangling you.",
      show: results.netProfitPct < 0.05,
    },
    {
      title: 'Looking Strong',
      body: "Your numbers are strong. But strong numbers without a growth system means you've capped your upside. The next step is scaling without breaking what's working.",
      show: allGreen,
    },
  ];
}
