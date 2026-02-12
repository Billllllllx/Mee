import React, { useState } from 'react';
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

// 财经新闻卡片组件
const NewsCard: React.FC<{
  news: {
    id: number;
    title: string;
    date: string;
    summary: string;
    content: string;
    category: string;
    imageUrl: string;
  };
}> = ({ news }) => {
  return (
    <GlassCard className="p-6 mb-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 bg-[#d4af37]/20 text-[#d4af37] rounded-full">
            {news.category}
          </span>
          <span className="text-white/60 text-sm">{news.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          {news.title}
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="w-full h-48 md:h-64 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="md:w-2/3">
          <p className="text-white/80 mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            {news.content}
          </p>
          
          <div className="flex justify-end">
            <motion.button
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              阅读更多
            </motion.button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// 财经新闻数据
const newsData = [
  {
    id: 1,
    title: "美联储暗示今年可能降息25个基点",
    date: "2026-02-12",
    summary: "美联储主席鲍威尔在最新讲话中暗示，随着通胀压力缓解，今年可能会进行一次25个基点的降息...",
    content: "美联储主席鲍威尔在最新讲话中暗示，随着通胀压力缓解，今年可能会进行一次25个基点的降息。鲍威尔表示，虽然经济增长仍然强劲，但通胀数据显示出持续改善的迹象，这为货币政策调整提供了空间。分析师预计，如果就业市场保持稳定，美联储可能会在今年第三季度开始降息周期。这一消息公布后，美股市场应声上涨，10年期美国国债收益率小幅下跌。",
    category: "宏观经济",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Federal%20Reserve%20building%20with%20economic%20charts&sign=aada812411d1f9d5c4978d4f319cf206"
  },
  {
    id: 2,
    title: "全球供应链重构对企业成本的影响分析",
    date: "2026-02-11",
    summary: "地缘政治紧张局势导致全球供应链重构，企业需要重新评估其成本结构和风险管理策略...",
    content: "地缘政治紧张局势导致全球供应链重构，企业需要重新评估其成本结构和风险管理策略。最新研究显示，超过60%的跨国企业正在考虑或已经实施了供应链多元化战略，以降低对单一市场的依赖。这一趋势虽然提高了供应链的韧性，但也导致短期内企业运营成本上升了15%-20%。专家建议企业应将供应链风险管理纳入长期战略规划，通过数字化技术提高供应链的可视性和灵活性。",
    category: "供应链",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=global%20supply%20chain%20logistics&sign=4b1bc39f542d4455099b5e714a2f0f8a"
  },
  {
    id: 3,
    title: "人工智能如何改变财务分析与决策",
    date: "2026-02-10",
    summary: "AI技术正在重塑财务领域，从自动化报表生成到预测分析，CFO需要拥抱这一变革...",content: "AI技术正在重塑财务领域，从自动化报表生成到预测分析，CFO需要拥抱这一变革。最新调查显示，75%的CFO认为AI将在未来三年内彻底改变财务分析流程。AI工具不仅能够快速处理海量财务数据，还能识别数据中的模式和异常，帮助财务团队做出更准确的预测和决策。同时，AI也在改变财务团队的角色，使他们能够从繁琐的数据处理中解放出来，更多地参与战略规划和业务决策。",
    category: "金融科技",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20technology%20finance%20analysis&sign=459cb3137481ff9b8b165b04038f0068"
  },
  {
    id: 4,
    title: "ESG投资成为机构投资者新焦点",
    date: "2026-02-09",
    summary: "环境、社会和公司治理(ESG)因素已成为评估企业长期价值的重要指标...",
    content: "环境、社会和公司治理(ESG)因素已成为评估企业长期价值的重要指标，越来越多的机构投资者将ESG表现纳入投资决策框架。最新数据显示，全球ESG投资规模已超过45万亿美元，过去五年年均增长率超过25%。研究表明，ESG表现优异的企业在长期内往往能够获得更好的财务回报和更低的风险。专家预测，随着监管要求的加强和投资者意识的提高，ESG投资将继续保持快速增长势头。",
    category: "可持续金融",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=ESG%20investment%20sustainable%20finance&sign=6689244ffff956f5e4954e682c17467d"
  },
  {
    id: 5,
    title: "全球半导体产业格局重构",
    date: "2026-02-08",
    summary: "地缘政治竞争推动全球半导体产业格局重构，多国加大对本土芯片产业的投资...",
    content: "地缘政治竞争推动全球半导体产业格局重构，多国加大对本土芯片产业的投资。美国、欧盟、日本和韩国等经济体纷纷推出大规模芯片产业支持政策，总投资规模超过5000亿美元。这一趋势正在改变全球半导体供应链，推动芯片设计和制造能力的区域化分布。分析师指出，虽然短期内可能导致产能过剩和资源浪费，但长期来看将提高全球半导体供应链的韧性和多样性。",
    category: "产业分析",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=semiconductor%20industry%20chip%20manufacturing&sign=85e4fb7904e8669de2633b717a525de2"
  }
];

const NewsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // 过滤新闻
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);
  
  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(newsData.map(news => news.category)))];
  
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
                  每日财经时讯
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
                全球财经动态 · 市场分析 · 政策解读
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* 分类筛选 */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-[#0b1e2e] font-bold' 
                    : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20'
                } transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? '全部' : category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* 新闻列表 */}
        <div className="mb-16">
          {filteredNews.length > 0 ? (
            filteredNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">暂无该分类的新闻</p>
            </div>
          )}
        </div>
        
        {/* 加载更多按钮 */}
        <div className="flex justify-center mb-16">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-[#0b1e2e] font-bold rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(212, 175, 55, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            加载更多
          </motion.button>
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

export default NewsPage;