import React, { useState } from 'react';
import { Calculator, Percent, ShieldAlert, TrendingUp, HandCoins } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<'emi' | 'roi'>('emi');

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 Years
  const [downPayment, setDownPayment] = useState<number>(1000000); // ₹10 Lakhs

  // ROI Calculator State
  const [propertyCost, setPropertyCost] = useState<number>(15000000); // ₹1.5 Cr
  const [monthlyRent, setMonthlyRent] = useState<number>(75000); // ₹75,000/mo
  const [expectedAppreciation, setExpectedAppreciation] = useState<number>(8.0); // 8% per annum
  const [holdingYears, setHoldingYears] = useState<number>(10); // 10 Years

  // EMI Calculations
  const principal = Math.max(0, loanAmount - downPayment);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  
  let emi = 0;
  if (principal > 0 && monthlyRate > 0) {
    emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else if (principal > 0) {
    emi = principal / totalMonths;
  }

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  // ROI Calculations
  const annualRent = monthlyRent * 12;
  const initialRentalYield = (annualRent / propertyCost) * 100;
  
  // Future Value using compounding appreciation
  const futureValue = propertyCost * Math.pow(1 + (expectedAppreciation / 100), holdingYears);
  
  // Cumulative Rent (assuming 15% rent escalation every 3 years)
  let totalRentCollected = 0;
  let currentRent = annualRent;
  for (let yr = 1; yr <= holdingYears; yr++) {
    totalRentCollected += currentRent;
    if (yr % 3 === 0) {
      currentRent *= 1.15; // 15% escalation
    }
  }

  const totalROIInvestmentProfit = (futureValue + totalRentCollected) - propertyCost;
  const roiPercentage = (totalROIInvestmentProfit / propertyCost) * 100;
  const annualizedReturnMultiplier = (futureValue + totalRentCollected) / propertyCost;

  // Formatting helpers
  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val).replace('INR', '₹');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" id="financial-calculators">
      
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('emi')}
          className={`flex-1 py-4 text-center text-sm font-heading font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'emi'
              ? 'border-[#F97316] text-[#F97316] bg-orange-50/20'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          id="tab-calc-emi"
        >
          <Calculator className="w-4 h-4" /> Home Loan & EMI Calculator
        </button>
        <button
          onClick={() => setActiveTab('roi')}
          className={`flex-1 py-4 text-center text-sm font-heading font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'roi'
              ? 'border-[#F97316] text-[#F97316] bg-orange-50/20'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          id="tab-calc-roi"
        >
          <TrendingUp className="w-4 h-4" /> ROI & Investment Yield Planner
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'emi' ? (
          /* --- EMI & Mortgage Calculator --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-up">
            {/* Input sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Property Price</label>
                  <span className="text-[#F97316] font-heading font-extrabold text-lg">{formatRupee(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="50000000"
                  step="500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10 Lakhs</span>
                  <span>5 Crores</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Down Payment (Equity contribution)</label>
                  <span className="text-[#F97316] font-heading font-extrabold text-lg">{formatRupee(downPayment)}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max={loanAmount * 0.9}
                  step="50000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>2 Lakhs</span>
                  <span>90% of Price</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Interest Rate (% p.a.)</label>
                    <span className="text-[#F97316] font-heading font-extrabold text-lg">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Tenure (Years)</label>
                    <span className="text-[#F97316] font-heading font-extrabold text-lg">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F8F8] p-4 rounded-xl border border-gray-100 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>Advice:</strong> Under prevailing bank conditions in Ahmedabad (SBI, HDFC, ICICI), interest rates vary from 8.25% to 9.15% depending on credit profiles. A higher down payment minimizes total interest burden.
                </p>
              </div>
            </div>

            {/* Calculations results */}
            <div className="lg:col-span-5 bg-[#F8F8F8] rounded-xl p-6 flex flex-col justify-between border border-gray-100">
              <div className="space-y-6">
                <div className="text-center border-b border-gray-200 pb-5">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Estimated Monthly EMI
                  </span>
                  <span className="text-3xl font-heading font-extrabold text-[#222222] tracking-tight block">
                    {formatRupee(emi)}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">
                    For a net loan of {formatRupee(principal)}
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] inline-block"></span> Loan Principal
                    </span>
                    <span className="font-semibold text-gray-800">{formatRupee(principal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span> Total Interest Payable
                    </span>
                    <span className="font-semibold text-gray-800">{formatRupee(totalInterest)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-sm font-bold">
                    <span className="text-gray-800 font-heading">Total Loan Lifetime Cost</span>
                    <span className="text-[#222222] font-heading font-bold">{formatRupee(totalPayment)}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Donut Chart */}
              <div className="flex justify-center items-center mt-6">
                <svg width="180" height="180" viewBox="0 0 42 42" className="transform -rotate-90">
                  {/* Background Circle */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E5E7EB" strokeWidth="4" />
                  
                  {/* Principal Circle Segment */}
                  {principal > 0 && (
                    <circle 
                      cx="21" 
                      cy="21" 
                      r="15.915" 
                      fill="transparent" 
                      stroke="#F97316" 
                      strokeWidth="4" 
                      strokeDasharray={`${(principal / totalPayment) * 100} ${100 - (principal / totalPayment) * 100}`} 
                      strokeDashoffset="0"
                    />
                  )}
                  
                  {/* Interest Circle Segment */}
                  {totalInterest > 0 && (
                    <circle 
                      cx="21" 
                      cy="21" 
                      r="15.915" 
                      fill="transparent" 
                      stroke="#9CA3AF" 
                      strokeWidth="4" 
                      strokeDasharray={`${(totalInterest / totalPayment) * 100} ${100 - (totalInterest / totalPayment) * 100}`} 
                      strokeDashoffset={`${-(principal / totalPayment) * 100}`}
                    />
                  )}
                </svg>
                <div className="absolute text-center mt-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Equity Contribution</span>
                  <span className="text-sm font-bold text-gray-800">{((downPayment / loanAmount) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- ROI & Wealth Multiplier Calculator --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-up">
            {/* Input sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Acquisition Outlay (Cost)</label>
                  <span className="text-[#F97316] font-heading font-extrabold text-lg">{formatRupee(propertyCost)}</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="100000000"
                  step="1000000"
                  value={propertyCost}
                  onChange={(e) => setPropertyCost(Number(e.target.value))}
                  className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>20 Lakhs</span>
                  <span>10 Crores</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Expected Monthly Rent</label>
                    <span className="text-[#F97316] font-heading font-extrabold text-lg">{formatRupee(monthlyRent)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹5,000</span>
                    <span>₹5 Lakhs</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Holding Horizon</label>
                    <span className="text-[#F97316] font-heading font-extrabold text-lg">{holdingYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(Number(e.target.value))}
                    className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3 Yrs</span>
                    <span>20 Yrs</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide text-xs">Expected Annual Price Appreciation (% p.a.)</label>
                  <span className="text-[#F97316] font-heading font-extrabold text-lg">{expectedAppreciation}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="0.5"
                  value={expectedAppreciation}
                  onChange={(e) => setExpectedAppreciation(Number(e.target.value))}
                  className="w-full accent-[#F97316] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>3% (Conservative)</span>
                  <span>15% (Aggressive)</span>
                </div>
              </div>

              <div className="bg-[#F8F8F8] p-4 rounded-xl border border-gray-100 flex gap-3">
                <HandCoins className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>Advisor Note:</strong> Rental income model simulates a premium commercial lease structure with standard 15% escalation compounded every 3 years. Average commercial yields in Ahmedabad are 7.2%.
                </p>
              </div>
            </div>

            {/* Calculations results */}
            <div className="lg:col-span-5 bg-[#F8F8F8] rounded-xl p-6 flex flex-col justify-between border border-gray-100">
              <div className="space-y-6">
                <div className="text-center border-b border-gray-200 pb-5">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Total Estimated Return
                  </span>
                  <span className="text-3xl font-heading font-extrabold text-[#F97316] tracking-tight block">
                    {formatRupee(futureValue + totalRentCollected)}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">
                    Capital appreciation + Cumulative Rent (Compounded)
                  </span>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Initial Net Rental Yield:</span>
                    <span className="font-semibold text-gray-800">{initialRentalYield.toFixed(2)}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Future Resale Value:</span>
                    <span className="font-semibold text-gray-800">{formatRupee(futureValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Rental Cash Flow:</span>
                    <span className="font-semibold text-gray-800">{formatRupee(totalRentCollected)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Net Estimated Profit:</span>
                    <span className="font-semibold text-green-600 font-bold">+{formatRupee(totalROIInvestmentProfit)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                    <span className="text-gray-800 font-heading">Total Wealth Multiplier:</span>
                    <span className="text-[#222222] font-heading font-bold">{annualizedReturnMultiplier.toFixed(2)}x Return</span>
                  </div>
                </div>
              </div>

              {/* Custom SVG Line Graph representation */}
              <div className="mt-6 border border-gray-200/60 rounded-lg p-3 bg-white">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2 tracking-wide text-center">Wealth Growth Trajectory</span>
                <svg viewBox="0 0 100 35" className="w-full h-auto">
                  {/* X/Y Axes */}
                  <line x1="5" y1="30" x2="95" y2="30" stroke="#E5E7EB" strokeWidth="0.5" />
                  
                  {/* Project Line */}
                  <path 
                    d={`M 5 28 Q 30 22, 60 14 T 95 3`} 
                    fill="none" 
                    stroke="#F97316" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                  />
                  {/* Grid markings */}
                  <circle cx="5" cy="28" r="1.2" fill="#222222" />
                  <circle cx="95" cy="3" r="1.2" fill="#F97316" />
                  
                  <text x="5" y="34" fontSize="3.5" fill="#9CA3AF">Yr 0</text>
                  <text x="92" y="34" fontSize="3.5" fill="#9CA3AF">Yr {holdingYears}</text>
                  <text x="50" y="24" fontSize="3.2" fill="#F97316" fontWeight="bold">+{roiPercentage.toFixed(0)}% ROI</text>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
