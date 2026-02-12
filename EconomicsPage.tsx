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

// 经济学学习资料卡片组件
const EconomicsStudyCard: React.FC<{
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

const EconomicsPage = () => {
  const navigate = useNavigate();
  
  // 经济学必读书籍数据
  const books = [
    {
      name: "《经济学原理》曼昆",
      description: "微观宏观基础，经济学入门的经典教材",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=economics%20principles%20book%20cover&sign=5dfcaf13ce7a2564e676ce69f59fa67a",
    },
    {
      name: "《微观经济学》平狄克",
      description: "中级微观经济学理论与应用",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=microeconomics%20book%20cover&sign=ef0f784d39e434ca4fd737f27445f3c2",
    },
    {
      name: "《宏观经济学》多恩布什",
      description: "宏观经济理论与政策分析",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=macroeconomics%20book%20cover&sign=368d5ce3c06f98f507fa2f0e2a959719",
    },
    {
      name: "《经济学思想史》",
      description: "经济学思想的发展历程与重要流派",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=history%20of%20economic%20thought%20book&sign=10b9d05c6405b99ef76d5b062eb63f92",
    }
  ];
  
  // 在线课程数据
  const courses = [
    {
      name: "B站·牛津大学\"经济学基础\"",
      description: "牛津大学开设的经济学入门课程，涵盖微观与宏观经济学基础",
      link: "https://www.bilibili.com/video/av12345678"
    },
    {
      name: "YouTube·斯坦福\"行为经济学\"",
      description: "斯坦福大学行为经济学课程，探讨心理学与经济学的交叉领域",
      link: "https://www.youtube.com/watch?v=1234567890"
    },
    {
      name: "中级微观经济学",
      description: "深入学习微观经济理论与分析方法",
      link: "https://www.bilibili.com/video/av87654321"
    },
    {
      name: "宏观经济政策分析",
      description: "分析宏观经济政策对企业和市场的影响",
      link: "https://www.bilibili.com/video/av23456789"
    }
  ];
  
  // 播客数据
  const podcasts = [
    {
      name: "《经济学人》播客 —— \"每周全球政经\"",
      description: "经济学人杂志的每周全球政治经济分析",
      link: "https://example.com/podcast1"
    },
    {
      name: "《Freakonomics Radio》",
      description: "用经济学视角解读日常生活中的有趣现象",
      link: "https://example.com/podcast2"
    },
    {
      name: "《宏观经济观察》· \"全球经济趋势\"",
      description: "分析全球经济发展趋势与未来展望",
      link: "https://example.com/podcast3"
    },
    {
      name: "《经济学思维》· \"决策与选择\"",
      description: "用经济学思维思考个人和企业决策",
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
                  经济学
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
                经济分析 · 政策解读 · 思维模型
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
                <div className="bg-gradient-to-r from-[#d4af37] to-[#f5d76e] h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-white/60 text-sm">已收听13/20期</p>
            </div>
          </div>
        </GlassCard>
        
        {/* 学习资料区域 */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            学习资料库
          </h2>
          
          <EconomicsStudyCard 
            title="必读书籍" 
            items={books} 
            icon="book" 
          />
          
          <EconomicsStudyCard 
            title="在线课程" 
            items={courses} 
            icon="graduation-cap" 
          />
          
          <EconomicsStudyCard 
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

export default EconomicsPage;