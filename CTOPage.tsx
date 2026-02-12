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

// 技术领域卡片组件
const TechDomainCard: React.FC<{
  domain: {
    title: string;
    description: string;
    icon: string;
  };
}> = ({ domain }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6 h-full">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center mr-4">
            <i className={`fa-solid fa-${domain.icon} text-[#d4af37] text-xl`}></i>
          </div>
          <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            {domain.title}
          </h3>
        </div>
        <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {domain.description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

// 学习资源卡片组件
const LearningResourceCard: React.FC<{
  resource: {
    title: string;
    author: string;
    description: string;
    type: 'book' | 'course' | 'podcast';
    link?: string;
  };
}> = ({ resource }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={() => resource.link && window.open(resource.link, '_blank')}
    >
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 h-full">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center mr-3">
            {resource.type === 'book' && <i className="fa-solid fa-book text-[#d4af37]"></i>}
            {resource.type === 'course' && <i className="fa-solid fa-graduation-cap text-[#d4af37]"></i>}
            {resource.type === 'podcast' && <i className="fa-solid fa-podcast text-[#d4af37]"></i>}
          </div>
          <div>
            <h4 className="font-medium text-white/90">{resource.title}</h4>
            {resource.author && (
              <p className="text-white/60 text-sm">{resource.author}</p>
            )}
          </div>
        </div>
        <p className="text-white/70 text-sm">{resource.description}</p>
      </div>
    </motion.div>
  );
};

const CTOPage = () => {
  const navigate = useNavigate();
  
  // 技术领域数据
  const techDomains = [
    {
      title: "技术战略",
       description: "制定与业务目标一致的技术战略，识别并采用新兴技术，驱动技术创新与业务增长",
      icon: "chess"
    },
    {
      title: "技术架构",
       description: "设计可扩展、高性能、安全的技术架构，确保系统稳定性与可维护性",
      icon: "cubes"
    },
    {
      title: "产品研发",
      description: "领导产品研发团队，推动产品从概念到上市的全过程，确保产品质量与用户体验",
      icon: "code"
    },
    {
      title: "数据与AI",
      description: "利用数据分析与人工智能技术，驱动业务决策，创造数据价值",
      icon: "database"
    },
    {
      title: "技术团队管理",
      description: "招募、培养与留住顶尖技术人才，建立高效的技术团队文化",
      icon: "users-gear"
    },
    {
      title: "技术风险管理",
      description: "识别并管理技术风险，确保系统安全与合规，制定业务连续性计划",
      icon: "shield-halved"
    }
  ];
  
  // 学习资源数据
  const learningResources = [
    // 必读书籍
    {
      title: "《架构整洁之道》",
      author: "罗伯特·C·马丁",
      description: "学习如何设计与维护清晰、可扩展的软件架构",
      type: 'book'
    },
    {
      title: "《技术领导力指南》",
      author: "帕特里克·兰西奥尼",
      description: "探讨如何从技术专家成长为优秀的技术领导者",
      type: 'book'
    },
    {
      title: "《人工智能时代的商业转型》",
      author: "马克·施尼德詹斯",
      description: "了解AI如何重塑商业模式与竞争格局",
      type: 'book'
    },
    
    // 在线课程
    {
      title: "MIT：软件架构与设计",
      description: "学习现代软件架构原则与设计模式",
      type: 'course',
      link: "https://www.bilibili.com/video/av12345678"
    },
    {
      title: "斯坦福：人工智能原理",
      description: "掌握人工智能基础理论与应用方法",
      type: 'course',
      link: "https://www.youtube.com/watch?v=1234567890"
    },
    {
      title: "哈佛商学院：数字化转型",
      description: "学习如何领导企业进行数字化转型",
      type: 'course',
      link: "https://www.bilibili.com/video/av87654321"
    }
  ];
  
  // 技术趋势数据
  const techTrends = [
    {
      title: "人工智能与机器学习",
      description: "AI技术正在重塑企业运营与产品开发方式，从自动化到预测分析",
      importance: 95
    },
    {
      title: "云计算与边缘计算",
      description: "混合云架构成为主流，边缘计算为实时数据处理提供新可能",
      importance: 90
    },
    {
      title: "网络安全与隐私保护",
      description: "随着数字化程度提高，安全与隐私保护成为企业的核心竞争力",
      importance: 88
    },
    {
      title: "低代码/无代码平台",
      description: "加速应用开发，降低技术门槛，赋能业务创新",
      importance: 82
    },
    {
      title: "量子计算",
      description: "虽然仍处于早期阶段，但量子计算有望解决传统计算难以处理的复杂问题",
      importance: 75
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1e2e] to-[#1a2f3f] text-white font-sans relative">
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
                  CTO角色指南
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
                技术战略 · 创新驱动 · 架构设计
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* CTO角色概述 */}
        <section className="mb-16">
          <GlassCard className="p-6 md:p-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              首席技术官角色概述
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  首席技术官(CTO)负责公司的技术战略、产品研发、技术架构与创新。CTO需要领导技术团队，推动技术创新，并确保技术战略与业务目标保持一致。在当今数字化时代，CTO的角色越来越重要，不仅需要技术专长，还需要商业头脑与领导能力。
                </p>
                
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  优秀的CTO能够预见技术趋势，制定前瞻性的技术战略，构建高效的技术团队，并通过技术创新驱动业务增长。CTO还需要与CEO、CFO等其他高管密切合作，确保技术投资能够产生最大的商业价值。
                </p>
              </div>
              
              <div>
                <GlassCard className="p-5 h-full bg-[#0b1e2e]/50 border-[#d4af37]/30">
                  <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    关键角色职责
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      "制定技术战略与创新路线图",
                      "设计与维护技术架构",
                      "领导产品研发与技术团队",
                      "评估与采用新兴技术",
                      "管理技术风险与安全",
                      "优化技术运营效率",
                      "确保技术与业务目标一致"
                    ].map((responsibility, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <i className="fa-solid fa-check-circle text-[#d4af37] mr-3"></i>
                        <span className="text-white/80 text-sm">{responsibility}</span>
                      </motion.li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </section>
        
        {/* 技术领域 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            核心技术领域
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techDomains.map((domain, index) => (
              <TechDomainCard key={index} domain={domain} />
            ))}
          </div>
        </section>
        
        {/* 技术趋势重要性评估 */}
        <section className="mb-16">
          <GlassCard className="p-6">
            <motion.h2 
              className="text-2xl font-bold mb-6" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              技术趋势重要性评估
            </motion.h2>
            
            <div className="space-y-6">
              {techTrends.map((trend, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">{trend.title}</span>
                    <span className="text-[#d4af37] font-medium">{trend.importance}%</span>
                  </div>
                  <motion.div 
                    className="w-full bg-white/10 rounded-full h-2.5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-[#d4af37] to-[#f5d76e] h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${trend.importance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </motion.div>
                  <p className="text-white/60 text-sm mt-1">{trend.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
        
        {/* 学习资源 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CTO学习资源库
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningResources.map((resource, index) => (
              <LearningResourceCard key={index} resource={resource} />
            ))}
          </div>
        </section>
        
        {/* 页脚 */}
        <motion.footer 
          className="mt-16 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/60 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2025 · 保持好奇 · 未来商业领袖
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
};

export default CTOPage;