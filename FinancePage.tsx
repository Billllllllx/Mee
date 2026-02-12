import React from 'react';
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

// 金融学学习资料卡片组件
const FinanceStudyCard: React.FC<{
  title: string;
  items: Array<{
    name: string;
    description: string;
    coverUrl?: string;
    link?: string;
  }>;
  icon: string;
}> = ({ title, items, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center mr-3">
          <i className={`fa-solid fa-${icon} text-[#d4af37]`}></i>
        </div>
        <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
          {title}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 cursor-pointer"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            transition={{ duration: 0.3 }}
            onClick={() => item.link && window.open(item.link, '_blank')}
          >
            {item.coverUrl ? (
              <div className="flex items-start">
                <div className="w-20 h-28 bg-gray-800 rounded-md overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={item.coverUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white/90 mb-1">{item.name}</h4>
                  <p className="text-white/70 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ) : (
              <>
                <h4 className="font-medium text-white/90 mb-1">{item.name}</h4>
                <p className="text-white/70 text-sm">{item.description}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FinancePage = () => {
  const navigate = useNavigate();
  
  // 金融学必读书籍数据
  const books = [
    {
      name: "《投资学》博迪",
      description: "现代金融理论基石，全面介绍投资学原理与实践",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=investment%20book%20cover&sign=f9ac329bf81f83a63c94c8998d114733",
    },
    {
      name: "《期权、期货及其他衍生产品》约翰·赫尔",
      description: "衍生品定价与风险管理的权威指南",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=derivatives%20book%20cover&sign=c9a7a827208b44b73548c0c94c174414",
    },
    {
      name: "《金融市场与机构》米什金",
      description: "理解金融市场结构与运行机制的经典教材",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=financial%20markets%20book&sign=42e127e49898f5b5dca709a119613b53",
    },
    {
      name: "《资产配置》",
      description: "战略性资产配置与投资组合优化方法",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=asset%20allocation%20book&sign=ce7799f968167112b44a6ff3f3f814e1",
    }
  ];
  
  // 在线课程数据
  const courses = [
    {
      name: "B站·耶鲁大学\"金融市场\" Robert Shiller",
      description: "由诺贝尔经济学奖得主Robert Shiller讲解的金融市场课程",
      link: "https://www.bilibili.com/video/av12345678"
    },
    {
      name: "YouTube·MIT\"金融理论\"",
      description: "MIT开放课程，系统讲解现代金融理论基础",
      link: "https://www.youtube.com/watch?v=1234567890"
    },
    {
      name: "投资组合管理与优化",
      description: "学习如何构建高效投资组合，实现风险收益平衡",
      link: "https://www.bilibili.com/video/av87654321"
    },
    {
      name: "金融衍生品定价模型",
      description: "深入理解期权定价模型与衍生品策略",
      link: "https://www.bilibili.com/video/av23456789"
    }
  ];
  
  // 播客数据
  const podcasts = [
    {
      name: "《The Journal》· WSJ —— \"每日市场解读\"",
      description: "华尔街日报每日市场分析与评论",
      link: "https://example.com/podcast1"
    },
    {
      name: "《金融前沿》· \"投资策略探讨\"",
      description: "最新投资策略与市场趋势分析",
      link: "https://example.com/podcast2"
    },
    {
      name: "《全球金融观察》· \"宏观经济与投资机会\"",
      description: "从宏观视角分析全球经济形势与投资机会",
      link: "https://example.com/podcast3"
    },
    {
      name: "《投资大师课》· \"价值投资原则\"",
      description: "解读价值投资理念与实践方法",
      link: "https://example.com/podcast4"
    }
  ];
  
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
          <div className="flex items-center justify-between"><motion.button
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
                  金融学
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
                金融分析 · 投资策略 · 风险管理
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* 学习进度概览 */}
        <GlassCard className="p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            学习进度
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="text-lg text-white/80 mb-2 flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                <i className="fa-solid fa-book text-[#d4af37] mr-2"></i> 必读书籍
              </h3>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-[#d4af37] to-[#f5d76e] h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-white/60 text-sm">已读2/4本</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="text-lg text-white/80 mb-2 flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                <i className="fa-solid fa-graduation-cap text-[#d4af37] mr-2"></i> 在线课程
              </h3>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-[#d4af37] to-[#f5d76e] h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-white/60 text-sm">已完成3/5门</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h3 className="text-lg text-white/80 mb-2 flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                <i className="fa-solid fa-podcast text-[#d4af37] mr-2"></i> 播客
              </h3>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-[#d4af37] to-[#f5d76e] h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="text-white/60 text-sm">已收听8/10期</p>
            </div>
          </div>
        </GlassCard>
        
        {/* 学习资料区域 */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            学习资料库
          </h2>
          
          <FinanceStudyCard 
            title="必读书籍" 
            items={books} 
            icon="book" 
          />
          
          <FinanceStudyCard 
            title="在线课程" 
            items={courses} 
            icon="graduation-cap" 
          />
          
          <FinanceStudyCard 
            title="推荐播客" 
            items={podcasts} 
            icon="podcast" 
          />
        </div>
        
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

export default FinancePage;