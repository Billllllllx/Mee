import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// 毛玻璃卡片组件
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div 
      className={cn('backdrop-blur-md bg-white/20 rounded-xl border border-white/30 shadow-lg', className)}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

// 金融背景线条SVG组件
const FinancialBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {/* 网格线 */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* 上升折线 */}
        <path d="M 50,100 L 100,90 L 150,80 L 200,70 L 250,60 L 300,50" 
              fill="none" stroke="#d4af37" strokeWidth="2" />
        
        {/* K线轮廓 */}
        <path d="M 400,200 L 400,100 M 400,150 L 450,150 M 450,150 L 450,250" 
              fill="none" stroke="#d4af37" strokeWidth="2" />
        
        {/* 右侧上升折线 */}
        <path d="M 600,300 L 650,280 L 700,260 L 750,240 L 800,220" 
              fill="none" stroke="#d4af37" strokeWidth="2" />
              
        {/* 额外的金融元素 */}
        <circle cx="90%" cy="10%" r="100" fill="none" stroke="#d4af37" strokeWidth="1" />
        <path d="M 20%,60% L 30%,40% L 40%,70% L 50%,50% L 60%,80%" 
              fill="none" stroke="#d4af37" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// ROI计算器组件
const ROICalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [annualReturn, setAnnualReturn] = useState<string>('1000');
  const [years, setYears] = useState<string>('5');
  const [roi, setRoi] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  
  // 实时计算ROI
  useEffect(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const returnValue = parseFloat(annualReturn) || 0;
    const yearValue = parseFloat(years) || 0;
    
    if (initial > 0) {
      const total = returnValue * yearValue;
      const roiValue = (total / initial) * 100;
      setRoi(roiValue);
      setTotalReturn(total);
    } else {
      setRoi(0);
      setTotalReturn(0);
    }
  }, [initialInvestment, annualReturn, years]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 初始投资输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            初始投资（美元）
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 年收益输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            年收益（美元）
          </label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 持有年限输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            持有年限（年）
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
      
      {/* 计算结果 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <motion.div 
          className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            ROI百分比
          </h3>
          <motion.p 
            className="text-3xl font-bold text-[#d4af37]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
          >
            {roi.toFixed(2)}%
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            累计净收益
          </h3>
          <motion.p 
            className="text-3xl font-bold text-[#d4af37]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2, delay: 0.3 }}
          >
            ${totalReturn.toLocaleString()}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

// 毛利率净利率计算器组件
const ProfitMarginCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<string>('10000');
  const [cost, setCost] = useState<string>('6000');
  const [operatingExpenses, setOperatingExpenses] = useState<string>('2000');
  const [grossProfit, setGrossProfit] = useState<number>(0);
  const [grossMargin, setGrossMargin] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [netMargin, setNetMargin] = useState<number>(0);
  
  // 实时计算毛利率和净利率
  useEffect(() => {
    const rev = parseFloat(revenue) || 0;
    const c = parseFloat(cost) || 0;
    const opEx = parseFloat(operatingExpenses) || 0;
    
    if (rev > 0) {
      const gp = rev - c;
      const gm = (gp / rev) * 100;
      const np = gp - opEx;
      const nm = (np / rev) * 100;
      
      setGrossProfit(gp);
      setGrossMargin(gm);
      setNetProfit(np);
      setNetMargin(nm);
    } else {
      setGrossProfit(0);
      setGrossMargin(0);
      setNetProfit(0);
      setNetMargin(0);
    }
  }, [revenue, cost, operatingExpenses]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 销售收入输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            销售收入（美元）
          </label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 销售成本输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            销售成本（美元）
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 运营费用输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            运营费用（美元）
          </label>
          <input
            type="number"
            value={operatingExpenses}
            onChange={(e) => setOperatingExpenses(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
      
      {/* 计算结果 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            毛利润
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            ${grossProfit.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            毛利率
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            {grossMargin.toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            净利润
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            ${netProfit.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            净利率
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            {netMargin.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

// 盈亏平衡点计算器组件
const BreakEvenCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<string>('10000');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>('5');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>('10');
  const [breakEvenUnits, setBreakEvenUnits] = useState<number>(0);
  const [breakEvenRevenue, setBreakEvenRevenue] = useState<number>(0);
  
  // 实时计算盈亏平衡点
  useEffect(() => {
    const fc = parseFloat(fixedCosts) || 0;
    const vc = parseFloat(variableCostPerUnit) || 0;
    const sp = parseFloat(sellingPricePerUnit) || 0;
    
    if (sp > vc) {
      const units = fc / (sp - vc);
      const revenue = units * sp;
      
      setBreakEvenUnits(units);
      setBreakEvenRevenue(revenue);
    } else {
      setBreakEvenUnits(0);
      setBreakEvenRevenue(0);
    }
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 固定成本输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            固定成本（美元）
          </label>
          <input
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 单位变动成本输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            单位变动成本（美元）
          </label>
          <input
            type="number"
            value={variableCostPerUnit}
            onChange={(e) => setVariableCostPerUnit(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 单位售价输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            单位售价（美元）
          </label>
          <input
            type="number"
            value={sellingPricePerUnit}
            onChange={(e) => setSellingPricePerUnit(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
      
      {/* 计算结果 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            盈亏平衡销售量
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            {breakEvenUnits.toFixed(2)} 件
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            盈亏平衡销售额
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            ${breakEvenRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// 现金流计算器组件
const CashFlowCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>('100000');
  const [annualCashFlow, setAnnualCashFlow] = useState<string>('30000');
  const [discountRate, setDiscountRate] = useState<string>('10');
  const [years, setYears] = useState<string>('5');
  const [npv, setNpv] = useState<number>(0);
  const [irr, setIrr] = useState<number>(0);
  
  // 实时计算现金流指标
  useEffect(() => {
    const inv = parseFloat(initialInvestment) || 0;
    const cf = parseFloat(annualCashFlow) || 0;
    const rate = parseFloat(discountRate) / 100 || 0;
    const yr = parseInt(years) || 0;
    
    if (inv > 0 && rate > 0 && yr > 0) {
      // 计算NPV
      let npvValue = -inv;
      for (let i = 1; i <= yr; i++) {
        npvValue += cf / Math.pow(1 + rate, i);
      }
      setNpv(npvValue);
      
      // 简化计算IRR（这里使用近似值，实际应用中应使用更精确的算法）
      let irrValue = 0;
      if (npvValue > 0) {
        // 简单估算IRR
        irrValue = (cf / inv) * 100;
      }
      setIrr(irrValue);
    } else {
      setNpv(0);
      setIrr(0);
    }
  }, [initialInvestment, annualCashFlow, discountRate, years]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 初始投资输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            初始投资（美元）
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 年现金流输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            年现金流（美元）
          </label>
          <input
            type="number"
            value={annualCashFlow}
            onChange={(e) => setAnnualCashFlow(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 折现率输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            折现率（%）
          </label>
          <input
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        {/* 年限输入 */}
        <div>
          <label className="block text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            项目年限（年）
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
      
      {/* 计算结果 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            净现值 (NPV)
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            ${npv.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <h3 className="text-lg text-white/80 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            内部收益率 (IRR)
          </h3>
          <p className="text-3xl font-bold text-[#d4af37]">
            {irr.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

// BOM模板组件
const BOMTemplate: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: "原材料A", quantity: 100, unitCost: 5.5, totalCost: 550 },
    { id: 2, name: "组件B", quantity: 50, unitCost: 12.3, totalCost: 615 },
    { id: 3, name: "包装材料", quantity: 200, unitCost: 1.2, totalCost: 240 }
  ]);
  
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unitCost: "" });
  const [totalBOMCost, setTotalBOMCost] = useState<number>(1405);
  
  // 计算总BOM成本
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.totalCost, 0);
    setTotalBOMCost(total);
  }, [items]);
  
  // 添加新项目
  const addItem = () => {
    if (newItem.name && newItem.quantity && newItem.unitCost) {
      const quantity = parseFloat(newItem.quantity);
      const unitCost = parseFloat(newItem.unitCost);
      const totalCost = quantity * unitCost;
      
      const item = {
        id: Date.now(),
        name: newItem.name,
        quantity,
        unitCost,
        totalCost
      };
      
      setItems([...items, item]);
      setNewItem({ name: "", quantity: "", unitCost: "" });
    }
  };
  
  // 删除项目
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/20 font-medium text-white/80">
        <div>材料名称</div>
        <div>数量</div>
        <div>单位成本 ($)</div>
        <div>总成本 ($)</div>
      </div>
      
      {items.map(item => (
        <div key={item.id} className="grid grid-cols-4 gap-4 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <div>{item.name}</div>
          <div>{item.quantity}</div>
          <div>${item.unitCost.toFixed(2)}</div>
          <div className="flex items-center">
            ${item.totalCost.toFixed(2)}
            <button 
              onClick={() => removeItem(item.id)}
              className="ml-2 text-white/40 hover:text-red-400"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
      
      <div className="grid grid-cols-4 gap-4 mt-4">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          placeholder="材料名称"
          className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white"
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
          placeholder="数量"
          className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white"
        />
        <input
          type="number"
          value={newItem.unitCost}
          onChange={(e) => setNewItem({...newItem, unitCost: e.target.value})}
          placeholder="单位成本"
          className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white"
        />
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-[#0b1e2e] font-bold rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addItem}
        >
          添加项目
        </motion.button>
      </div>
      
      <div className="flex justify-end mt-6">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/20 w-64">
          <h3 className="text-lg text-white/80 mb-2 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            BOM总成本
          </h3>
          <p className="text-3xl font-bold text-[#d4af37] text-center">
            ${totalBOMCost.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const CalculatorPage = () => {
  const navigate = useNavigate();
  const [activeCalculator, setActiveCalculator] = useState<string>('roi');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1e2e] to-[#1a2f3f] text-white font-sans relative">
      {/* 金融背景线条 */}
      <FinancialBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 页面标题 */}
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white"
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </motion.button>
            
            <div className="flex flex-col items-center mb-6">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-[#d4af37] mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                  财务计算器
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-[#d4af37] to-transparent mx-auto rounded-full"></div>
              </motion.div>
              <motion.div 
                className="text-lg italic text-white/80 mt-3" 
                style={{ fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                投资分析 · 财务评估 · 成本计算
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* 计算器选择标签 */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            {[
              { id: 'roi', label: '投资回报计算器', icon: 'chart-line' },
              { id: 'profit', label: '毛利率净利率计算器', icon: 'percent' },
              { id: 'breakeven', label: '盈亏平衡点计算器', icon: 'balance-scale' },
              { id: 'cashflow', label: '现金流计算器', icon: 'money-bill-wave' },
              { id: 'bom', label: 'BOM模板', icon: 'list-ul' }
            ].map((calculator) => (
              <motion.button
                key={calculator.id}
                className={`px-4 py-2 rounded-full flex items-center ${
                  activeCalculator === calculator.id 
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-[#0b1e2e] font-bold' 
                    : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20'
                } transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCalculator(calculator.id)}
              >
                <i className={`fa-solid fa-${calculator.icon} mr-2`}></i>
                {calculator.label}
              </motion.button>
            ))}
          </div>
        </div>
        
         {/* 计算器内容 */}
        <GlassCard className="p-6 md:p-8 mb-16">
          {activeCalculator === 'roi' && (
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                投资回报计算器 (ROI)
              </h2>
              <p className="text-white/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                计算投资回报率，帮助评估投资项目的盈利能力和效率。
              </p>
              <ROICalculator />
            </>
          )}
          
          {activeCalculator === 'profit' && (
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                毛利率净利率计算器
              </h2>
              <p className="text-white/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                计算企业的毛利率和净利率，评估企业的盈利能力和成本控制水平。
              </p>
              <ProfitMarginCalculator />
            </>
          )}
          
          {activeCalculator === 'breakeven' && (
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                盈亏平衡点计算器
              </h2>
              <p className="text-white/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                计算企业达到收支平衡所需的销售量和销售额，帮助制定销售目标和定价策略。
              </p>
              <BreakEvenCalculator />
            </>
          )}
          
          {activeCalculator === 'cashflow' && (
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                现金流计算器
              </h2>
              <p className="text-white/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                分析投资项目的现金流状况，计算净现值(NPV)和内部收益率(IRR)，评估投资可行性。
              </p>
              <CashFlowCalculator />
            </>
          )}
          
           {activeCalculator === 'bom' && (
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                BOM模板 (物料清单)
              </h2>
              <p className="text-white/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                创建和管理产品的物料清单，计算产品总成本，帮助进行成本控制和定价决策。
              </p>
              <BOMTemplate />
            </>
          )}
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                BOM模板 (物料清单)
              </h2>
              <p className="text-white/70 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                创建和管理产品的物料清单，计算产品总成本，帮助进行成本控制和定价决策。
              </p>
              <BOMTemplate />
            </>
        </GlassCard>
        
        {/* 页脚 */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2025 · 保持好奇 · 未来CFO
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white/40 hover:text-[#d4af37] transition-colors">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-white/40 hover:text-[#d4af37] transition-colors">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-white/40 hover:text-[#d4af37] transition-colors">
              <i className="fa-brands fa-github text-xl"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CalculatorPage;