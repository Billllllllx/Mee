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

// Excel课程卡片组件
const ExcelCourseCard: React.FC<{
  course: {
    id: number;
    title: string;
    description: string;
    url: string;
    duration: string;
    level: string;
    coverUrl: string;
  };
}> = ({ course }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div 
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#f5d76e]/10 border border-[#d4af37]/30 aspect-video flex items-center justify-center cursor-pointer mb-4"
        onClick={() => window.open(course.url, '_blank')}
      >
        <div className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20spreadsheet%20with%20financial%20data%20and%20charts&sign=d353a9420e1c93a81991f0a8b1719de6')] bg-cover bg-center opacity-40"></div>
        <motion.i 
          className="fa-solid fa-play text-[#d4af37] text-4xl relative z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        ></motion.i>
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {course.duration}
        </div>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full mr-2">
          {course.level}
        </span>
        <span className="text-white/60 text-sm">{course.duration}</span>
      </div>
      <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
        {course.title}
      </h3>
      <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
        {course.description}
      </p>
    </motion.div>
  );
};

// Excel课程数据
const excelCourses = [
  {
    id: 1,
    title: "财务三表建模",
    description: "学习如何使用Excel建立完整的财务模型，包括资产负债表、利润表和现金流量表的联动分析",
    url: "https://www.bilibili.com/video/av12345678",
    duration: "1小时45分钟",
    level: "中级",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20financial%20modeling%20spreadsheet&sign=e5b10a3f6be08e960c40b2db5b3793ff"
  },
  {
    id: 2,
    title: "数据透视表进阶",
    description: "掌握数据透视表高级技巧，提升数据分析效率，包括动态透视表、切片器和时间智能函数的使用",
    url: "https://www.bilibili.com/video/av87654321",
    duration: "1小时20分钟",
    level: "进阶",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20pivot%20table%20advanced&sign=5274e6a5415969130403101e40091e29"
  },
  {
    id: 3,
    title: "VLOOKUP+MATCH函数组合",
    description: "两大函数组合使用，解决复杂数据查询问题，学习如何处理大型数据集的精确匹配和近似匹配",
    url: "https://www.bilibili.com/video/av23456789",
    duration: "55分钟",
    level: "初级到中级",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20VLOOKUP%20MATCH%20functions&sign=e2d14e09c11cf06455a6004c26803d74"
  },
  {
    id: 4,
    title: "Power Query合并",
    description: "自动化数据清洗与合并，告别重复劳动，学习如何使用Power Query从多个源获取和转换数据",
    url: "https://www.bilibili.com/video/av98765432",
    duration: "1小时30分钟",
    level: "中级",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20Power%20Query%20data%20transformation&sign=9c16ec2d2f2d431b42f288ee5917758f"
  },
  {
    id: 5,
    title: "财务函数高级应用",
    description: "深入学习Excel财务函数，包括NPV、IRR、PMT等，掌握投资决策分析的核心工具",
    url: "https://www.bilibili.com/video/av34567890",
    duration: "1小时15分钟",
    level: "中级到高级",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20financial%20functions%20advanced&sign=d22d1fd2b6efbc4cdfa00938e399102e"
  },
  {
    id: 6,
    title: "Excel图表可视化",
    description: "学习创建专业的财务图表，包括动态图表、仪表盘和交互式数据可视化",
    url: "https://www.bilibili.com/video/av45678901",
    duration: "1小时",
    level: "初级到中级",
    coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Excel%20data%20visualization%20charts&sign=b50e371f6287ce0099398e1ad80de23e"
  }
];

const ExcelPage = () => {
  const navigate = useNavigate();
  
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
                  Excel for Finance
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
                财务建模 · 数据分析 · 效率提升
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* Excel课程网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {excelCourses.map(course => (
            <ExcelCourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {/* 学习路径指南 */}
        <GlassCard className="p-6 mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Excel学习路径指南
          </h2>
          
          <div className="relative">
            {/* 连接线 */}
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
            
            {/* 学习阶段 */}
            {[
              {
                title: "基础阶段",
                description: "掌握Excel基本操作、公式和函数，包括SUM、VLOOKUP、IF等常用函数",
                courses: ["Excel基础入门", "函数与公式基础", "数据格式化技巧"]
              },
              {
                title: "进阶阶段",
                description: "学习数据透视表、图表可视化、高级函数组合，提升数据分析能力",
                courses: ["数据透视表进阶", "图表可视化", "VLOOKUP+MATCH函数组合"]
              },
              {
                title: "专业阶段",
                description: "掌握财务建模、Power Query、VBA等高级技能，成为Excel高手",
                courses: ["财务三表建模", "Power Query合并", "财务函数高级应用"]
              },
              {
                title: "专家阶段",
                description: "深入学习VBA编程、Power Pivot、高级数据分析和自动化解决方案",
                courses: ["Excel VBA编程入门", "Power Pivot数据分析", "财务模型高级技巧"]
              }
            ].map((stage, index) => (
              <div key={index} className="flex mb-8 relative">
                {/* 阶段节点 */}
                <div className="absolute left-4 w-3 h-3 bg-[#d4af37] rounded-full transform -translate-x-1.5 mt-2"></div>
                
                <div className="ml-10">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {index + 1}. {stage.title}
                  </h3>
                  <p className="text-white/70 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {stage.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stage.courses.map((course, courseIndex) => (
                      <span 
                        key={courseIndex} 
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        
        {/* 资源下载区 */}
        <GlassCard className="p-6 mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            实用资源下载
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "财务模型模板",
                description: "包含完整的财务三表联动模型，适用于企业估值和财务分析",
                size: "2.5 MB",
                fileType: "Excel"
              },
              {
                title: "数据透视表示例文件",
                description: "包含各种数据透视表高级技巧的示例，帮助快速掌握数据分析方法",
                size: "1.8 MB",
                fileType: "Excel"
              },
              {
                title: "财务函数速查表",
                description: "常用Excel财务函数的使用说明和示例，方便随时查阅",
                size: "0.5 MB",
                fileType: "PDF"
              },
              {
                title: "Power Query实用案例",
                description: "通过实际案例学习Power Query数据处理和转换技巧",
                size: "3.2 MB",
                fileType: "Excel"
              }
            ].map((resource, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20 flex justify-between items-center cursor-pointer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h3 className="font-medium text-white/90 mb-1">{resource.title}</h3>
                  <div className="flex items-center">
                    <span className="text-white/60 text-xs mr-3">{resource.size}</span>
                    <span className="text-white/60 text-xs">{resource.fileType}</span>
                  </div>
                </div>
                <motion.button
                  className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fa-solid fa-download"></i>
                </motion.button>
              </motion.div>
            ))}
          </div>
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

export default ExcelPage;