import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

// 可滑动卡片容器组件
const ScrollableCards: React.FC<{
  children: React.ReactNode;
  className?: string;
  cardWidth?: string;
}> = ({ children, className = '', cardWidth = 'w-full md:w-72' }) => {
  return (
    <div className={cn('overflow-x-auto scrollbar-hide snap-x snap-mandatory', className)}>
      <div className="flex space-x-4 pb-4 min-w-max">
        {React.Children.map(children, (child, index) => (
          <div 
            key={index} 
            className={cn(cardWidth, 'snap-start')}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

// 学习路径卡片组件
const LearningPathCard: React.FC<{
  path: {
    title: string;
    subtitle: string;
    icon: string;
    books: string[];
    courses: string[];
    podcast: string;
    progress: string;
  };
}> = ({ path }) => {
  return (
    <GlassCard className="flex-1 p-6 h-full">
      <div className="flex items-center mb-4">
        <motion.div 
          className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center mr-3"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
          transition={{ duration: 0.3 }}
        >
          <i className={`fa-solid fa-${path.icon} text-[#d4af37] text-xl`}></i>
        </motion.div>
        <div>
          <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            {path.title}
          </h3>
          <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            {path.subtitle}
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {/* 必读书籍 */}
        <div>
          <h4 className="flex items-center text-lg font-medium mb-2 text-[#d4af37]" style={{ fontFamily: 'Inter, sans-serif' }}>
            <i className="fa-solid fa-book mr-2"></i> 必读书籍
          </h4>
          <ul className="space-y-2 text-white/80 text-sm pl-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {path.books.map((book, index) => (
              <li key={index} className="transition-all duration-300 hover:text-white pl-1">
                {book}
              </li>
            ))}
          </ul>
        </div>
        
        {/* 在线课程 */}
        <div>
          <h4 className="flex items-center text-lg font-medium mb-2 text-[#d4af37]" style={{ fontFamily: 'Inter, sans-serif' }}>
            <i className="fa-solid fa-graduation-cap mr-2"></i> 在线课程
          </h4>
          <ul className="space-y-2 text-white/80 text-sm pl-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {path.courses.map((course, index) => (
              <li key={index} className="transition-all duration-300 hover:text-white pl-1">
                {course}
              </li>
            ))}
          </ul>
        </div>
        
        {/* 播客 */}
        <div>
          <h4 className="flex items-center text-lg font-medium mb-2 text-[#d4af37]" style={{ fontFamily: 'Inter, sans-serif' }}>
            <i className="fa-solid fa-podcast mr-2"></i> 播客
          </h4>
          <p className="text-white/80 text-sm pl-6 hover:text-white transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
            {path.podcast}
          </p>
        </div>
      </div>
      
      {/* 进度 */}
      <div className="text-center text-white/70 text-sm mt-4 pt-4 border-t border-white/10" style={{ fontFamily: 'Inter, sans-serif' }}>
        {path.progress}
      </div>
    </GlassCard>
  );
};

// 每日财经时讯数据
const dailyNews = [
  {
    title: "美联储暗示今年可能降息25个基点",
    date: "2026-02-12",
    summary: "美联储主席鲍威尔在最新讲话中暗示，随着通胀压力缓解，今年可能会进行一次25个基点的降息...",
    category: "宏观经济"
  },
  {
    title: "全球供应链重构对企业成本的影响分析",
    date: "2026-02-11",
    summary: "地缘政治紧张局势导致全球供应链重构，企业需要重新评估其成本结构和风险管理策略...",
    category: "供应链"
  },
  {
    title: "人工智能如何改变财务分析与决策",
    date: "2026-02-10",
    summary: "AI技术正在重塑财务领域，从自动化报表生成到预测分析，CFO需要拥抱这一变革...",
    category: "金融科技"
  },
  {
    title: "ESG投资成为机构投资者新焦点",
    date: "2026-02-09",
    summary: "环境、社会和公司治理(ESG)因素已成为评估企业长期价值的重要指标...",
    category: "可持续金融"
  }
];

// Excel课程卡片数据
const excelCourses = [
  {
    title: "财务三表建模",
    description: "学习如何使用Excel建立完整的财务模型",
    url: "https://www.bilibili.com/video/av12345678"
  },
  {
    title: "数据透视表进阶",
    description: "掌握数据透视表高级技巧，提升数据分析效率",
    url: "https://www.bilibili.com/video/av87654321"
  },
  {
    title: "VLOOKUP+MATCH",
    description: "两大函数组合使用，解决复杂数据查询问题",
    url: "https://www.bilibili.com/video/av23456789"
  },
  {
    title: "Power Query合并",
    description: "自动化数据清洗与合并，告别重复劳动",
    url: "https://www.bilibili.com/video/av98765432"
  }
];

// 学习路径数据
const learningPaths = [
  {
    title: "CFO能力",
    subtitle: "财务分析",
    icon: "chart-line",
    books: [
      "《财务战略》· 哈佛课程笔记 —— \"CFO视角的资本配置\"",
      "《估值》· 达莫达兰 —— \"内在价值评估\""
    ],
    courses: [
      "B站·牛津大学\"公司财务\"公开课",
      "YouTube·沃顿商学院\"首席财务官\"专项课程节选"
    ],
    podcast: "《CFO Think Tank》· 第45期 \"数字化转型中的财务\"",
    progress: "已读2/4本·3/5课程"
  },
  {
    title: "金融学",
    subtitle: "金融分析",
    icon: "landmark",
    books: [
      "《投资学》博迪 —— \"现代金融理论基石\"",
      "《期权、期货及其他衍生产品》约翰·赫尔 —— \"衍生品定价\""
    ],
    courses: [
      "B站·耶鲁大学\"金融市场\" Robert Shiller",
      "YouTube·MIT\"金融理论\""
    ],
    podcast: "《The Journal》· WSJ —— \"每日市场解读\"",
    progress: "已读2/4本·3/5课程"
  },
  {
    title: "经济学",
    subtitle: "经济分析",
    icon: "balance-scale",
    books: [
      "《经济学原理》曼昆 —— \"微观宏观基础\"",
      "《微观经济学》平狄克 —— \"中级理论\""
    ],
    courses: [
      "B站·牛津大学\"经济学基础\"",
      "YouTube·斯坦福\"行为经济学\""
    ],
    podcast: "《经济学人》播客 —— \"每周全球政经\"",
    progress: "已读2/4本·3/5课程"
  }
];

// CFO修炼手札博客主页面
export default function Home() {
  // ROI计算器状态
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
    <div className="min-h-screen bg-gradient-to-br from-[#0b1e2e] to-[#1a2f3f] text-white font-sans relative">
      {/* 金融背景线条 */}
      <FinancialBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 1. 博客标题区 */}
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                「商业与财务」学习中心
              </h1>
              <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-[#d4af37] to-transparent mx-auto rounded-full"></div>
            </motion.div>
            <motion.div 
              className="text-xl italic text-white/80 mt-3" 
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              「每日精进 · 终成财务领袖」
            </motion.div>
          </div>
        </motion.header>
        
         {/* 2. 每日财经时讯 */}
         <section className="mb-16">
           <motion.div 
             className="flex items-center justify-between mb-6"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <h2 className="text-2xl md:text-3xl font-bold mr-3" style={{ fontFamily: 'Playfair Display, serif' }}>
               每日财经时讯
             </h2>
             <motion.a
               href="/news"
               className="flex items-center text-[#d4af37] hover:text-[#f5d76e] transition-colors"
               whileHover={{ scale: 1.05 }}
             >
               查看全部 <i className="fa-solid fa-arrow-right ml-1"></i>
             </motion.a>
           </motion.div>
           
           <ScrollableCards>
             {dailyNews.map((news, index) => (
               <motion.div 
                 key={index} 
                 whileHover={{ y: -5 }}
                 transition={{ duration: 0.3 }}
               >
                 <GlassCard className="p-6 h-full cursor-pointer" onClick={() => window.location.href="/news"}>
                   <div className="flex items-start mb-3">
                     <div className="text-[#d4af37] mr-2 mt-1">
                       <i className="fa-solid fa-newspaper"></i>
                     </div>
                     <div className="flex-1">
                       <h3 className="text-white/90 font-medium mb-1">{news.title}</h3>
                       <p className="text-white/60 text-sm">{news.date}</p>
                     </div>
                   </div>
                   <p className="text-white/70 text-sm line-clamp-2">{news.summary}</p>
                   <div className="mt-3 flex justify-end">
                     <span className="text-xs px-2 py-1 bg-[#d4af37]/20 text-[#d4af37] rounded-full">
                       {news.category}
                     </span>
                   </div>
                 </GlassCard>
               </motion.div>
             ))}
           </ScrollableCards>
         </section>
        
         {/* 3. Excel 视频教程区 */}
         <section className="mb-16">
           <motion.div 
             className="flex items-center justify-between mb-6"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <h2 className="text-2xl md:text-3xl font-bold flex items-center" style={{ fontFamily: 'Playfair Display, serif' }}>
               📊 Excel for Finance · 视频教程
             </h2>
             <motion.a
               href="/excel"
               className="flex items-center text-[#d4af37] hover:text-[#f5d76e] transition-colors"
               whileHover={{ scale: 1.05 }}
             >
               查看全部 <i className="fa-solid fa-arrow-right ml-1"></i>
             </motion.a>
           </motion.div>
           
           <ScrollableCards cardWidth="w-full md:w-64">
             {excelCourses.map((course, index) => (
               <motion.div 
                 key={index}
                 className="group"
                 whileHover={{ y: -5 }}
                 transition={{ duration: 0.3 }}
               >
                 <div 
                   className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#f5d76e]/10 border border-[#d4af37]/30 aspect-video flex items-center justify-center cursor-pointer"
                   onClick={() => window.open(course.url, '_blank')}
                 >
                   <div className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20spreadsheet%20with%20financial%20data%20and%20charts&sign=d353a9420e1c93a81991f0a8b1719de6')] bg-cover bg-center opacity-40"></div>
                   <motion.i 
                     className="fa-solid fa-play text-[#d4af37] text-4xl relative z-10"
                     whileHover={{ scale: 1.1 }}
                     transition={{ duration: 0.3 }}
                   ></motion.i>
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 </div>
                 <h3 className="mt-3 text-center font-medium text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
                   {course.title}
                 </h3>
                 <p className="text-center text-white/60 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                   {course.description}
                 </p>
               </motion.div>
             ))}
           </ScrollableCards>
         </section>
        
         {/* 4. 财务计算器 */}
         <section className="mb-16">
           <motion.div 
             className="flex items-center justify-between mb-6"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <h2 className="text-2xl md:text-3xl font-bold flex items-center" style={{ fontFamily: 'Playfair Display, serif' }}>
               🧮 财务计算器
             </h2>
             <motion.a
               href="/calculators"
               className="flex items-center text-[#d4af37] hover:text-[#f5d76e] transition-colors"
               whileHover={{ scale: 1.05 }}
             >
               查看全部 <i className="fa-solid fa-arrow-right ml-1"></i>
             </motion.a>
           </motion.div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <GlassCard className="p-6">
               <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                 投资回报计算器 (ROI)
               </h3>
               
               <div className="space-y-3 mb-4">
                 <div className="flex items-center">
                   <label className="block text-white/80 w-32" style={{ fontFamily: 'Inter, sans-serif' }}>
                     初始投资:
                   </label>
                   <input
                     type="number"
                     value={initialInvestment}
                     onChange={(e) => setInitialInvestment(e.target.value)}
                     className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
                     style={{ fontFamily: 'Inter, sans-serif' }}
                   />
                   <span className="ml-2 text-white/60">$</span>
                 </div>
                 
                 <div className="flex items-center">
                   <label className="block text-white/80 w-32" style={{ fontFamily: 'Inter, sans-serif' }}>
                     年收益:
                   </label>
                   <input
                     type="number"
                     value={annualReturn}
                     onChange={(e) => setAnnualReturn(e.target.value)}
                     className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
                     style={{ fontFamily: 'Inter, sans-serif' }}
                   />
                   <span className="ml-2 text-white/60">$</span>
                 </div>
                 
                 <div className="flex items-center">
                   <label className="block text-white/80 w-32" style={{ fontFamily: 'Inter, sans-serif' }}>
                     持有年限:
                   </label>
                   <input
                     type="number"
                     value={years}
                     onChange={(e) => setYears(e.target.value)}
                     className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
                     style={{ fontFamily: 'Inter, sans-serif' }}
                   />
                   <span className="ml-2 text-white/60">年</span>
                 </div>
               </div>
               
               {/* 计算结果 */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg border border-white/10">
                   <p className="text-white/80 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                     ROI百分比
                   </p>
                   <p className="text-xl font-bold text-[#d4af37]">
                     {roi.toFixed(2)}%
                   </p>
                 </div>
                 
                 <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg border border-white/10">
                   <p className="text-white/80 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                     累计净收益
                   </p>
                   <p className="text-xl font-bold text-[#d4af37]">
                     ${totalReturn.toLocaleString()}
                   </p>
                 </div>
               </div>
             </GlassCard>
             
             <GlassCard className="p-6">
               <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                 毛利率计算器
               </h3>
               
               <div className="space-y-3 mb-4">
                 <div className="flex items-center">
                   <label className="block text-white/80 w-32" style={{ fontFamily: 'Inter, sans-serif' }}>
                     销售收入:
                   </label>
                   <input
                     type="number"
                     defaultValue="10000"
                     className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
                     style={{ fontFamily: 'Inter, sans-serif' }}
                   />
                   <span className="ml-2 text-white/60">$</span>
                 </div>
                 
                 <div className="flex items-center">
                   <label className="block text-white/80 w-32" style={{ fontFamily: 'Inter, sans-serif' }}>
                     销售成本:
                   </label>
                   <input
                     type="number"
                     defaultValue="6000"
                     className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white transition-all duration-300"
                     style={{ fontFamily: 'Inter, sans-serif' }}
                   />
                   <span className="ml-2 text-white/60">$</span>
                 </div>
               </div>
               
               {/* 计算结果 */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg border border-white/10">
                   <p className="text-white/80 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                     毛利润
                   </p>
                   <p className="text-xl font-bold text-[#d4af37]">
                     $4,000
                   </p>
                 </div>
                 
                 <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg border border-white/10">
                   <p className="text-white/80 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                     毛利率
                   </p>
                   <p className="text-xl font-bold text-[#d4af37]">
                     40.00%
                   </p>
                 </div>
               </div>
             </GlassCard>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <GlassCard className="p-5 cursor-pointer hover:bg-white/25 transition-colors duration-300" onClick={() => window.location.href="/calculators"}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  毛利率计算器
                </h3>
                <i className="fa-solid fa-percent text-[#d4af37]"></i>
              </div>
              <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                计算企业销售毛利率，评估产品盈利能力
                 计算企业达到收支平衡所需的销售额或销售量
               </p>
             </GlassCard>
             
             <GlassCard className="p-5 cursor-pointer hover:bg-white/25 transition-colors duration-300" onClick={() => window.location.href="/calculators"}>
               <div className="flex items-center justify-between mb-3">
                 <h3 className="text-lg font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                   现金流计算器
                 </h3>
                 <i className="fa-solid fa-chart-line text-[#d4af37]"></i>
               </div>
               <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                 分析企业未来现金流状况，评估财务健康度
               </p>
             </GlassCard>
             
             <GlassCard className="p-5 cursor-pointer hover:bg-white/25 transition-colors duration-300" onClick={() => window.location.href="/calculators"}>
               <div className="flex items-center justify-between mb-3">
                 <h3 className="text-lg font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                   BOM模板
                 </h3>
                 <i className="fa-solid fa-file-alt text-[#d4af37]"></i>
               </div>
               <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                 物料清单模板，帮助管理产品成本和库存
               </p>
             </GlassCard>
           </div>
         </section>
        
          {/* 5. 学习路径三卡片 */}
          <section className="mb-16">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6 flex items-center" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              📚 我的学习路径 · 商业 / 金融 / 经济
            </motion.h2>
           
           <div className="md:hidden mb-6">
            <ScrollableCards cardWidth="w-[85%]">
              {learningPaths.map((path, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                  onClick={() => {
                    if (index === 0) window.location.href = "/business/cfo";
                    if (index === 1) window.location.href = "/finance";
                    if (index === 2) window.location.href = "/economics";
                  }}
                >
                  <LearningPathCard path={path} />
                </motion.div>
              ))}
             </ScrollableCards>
           </div>
           
           <div className="hidden md:flex flex-row gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
                onClick={() => window.location.href="/business/cfo"}
              >
                <LearningPathCard path={learningPaths[0]} />
              </motion.div>
             
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.3 }}
               className="cursor-pointer"
               onClick={() => window.location.href="/finance"}
             >
               <LearningPathCard path={learningPaths[1]} />
             </motion.div>
             
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.3 }}
               className="cursor-pointer"
               onClick={() => window.location.href="/economics"}
             >
               <LearningPathCard path={learningPaths[2]} />
             </motion.div>
           </div>
         </section>
        
        {/* 6. 页脚 */}
        <motion.footer 
          className="mt-16 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/60 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2025 · 保持好奇 · 未来CFO
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a 
              href="#" 
              className="text-white/40 hover:text-[#d4af37] transition-colors"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fa-brands fa-linkedin text-xl"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/40 hover:text-[#d4af37] transition-colors"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fa-brands fa-twitter text-xl"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/40 hover:text-[#d4af37] transition-colors"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fa-brands fa-github text-xl"></i>
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}