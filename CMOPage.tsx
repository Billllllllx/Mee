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

// 营销领域卡片组件
const MarketingDomainCard: React.FC<{
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

const CMOPage = () => {
  const navigate = useNavigate();
  
  // 营销领域数据
   const marketingDomains = [
    {
      title: "品牌管理",
       description: "建立与维护品牌形象，制定品牌战略，确保品牌一致性，提升品牌价值与忠诚度",
      icon: "star"
    },
    {
      title: "数字营销",
      description: "利用数字渠道与技术，制定与执行数字营销策略，包括SEO、SEM、社交媒体营销等",
      icon: "laptop-code"
    },
    {
      title: "内容营销",
       description: "创建与分发有价值的内容，吸引与留住目标受众，建立品牌权威与信任",
      icon: "feather-alt"
    },
    {
      title: "客户体验",
      description: "设计与优化客户旅程，提升客户满意度与忠诚度，推动客户留存与增长",
      icon: "face-smile"
    },
    {
      title: "市场分析",
      description: "进行市场研究与分析，了解客户需求与竞争格局，识别市场机会",
      icon: "chart-simple"
    },
    {
      title: "营销技术",
      description: "评估与采用营销技术，优化营销流程，提升营销效率与效果",
      icon: "gear"
    }
  ];
  
  // 学习资源数据
  const learningResources = [
    // 必读书籍
    {
      title: "《品牌资产管理》",
      author: "戴维·阿克",
      description: "学习如何建立、维护与提升品牌资产，创造长期品牌价值",
      type: 'book'
    },
    {
      title: "《数字营销战略》",
      author: "菲尔·查普曼",
      description: "掌握现代数字营销策略与实践，提升数字营销效果",
      type: 'book'
    },
    {
      title: "《内容营销指南》",
      author: "乔·普利兹",
      description: "学习如何创建引人入胜的内容，吸引与留住目标受众",
      type: 'book'
    },
    
    // 在线课程
    {
      title: "哈佛商学院：品牌管理",
      description: "学习品牌管理的核心概念与实践，建立强大的品牌资产",
      type: 'course',
      link: "https://www.bilibili.com/video/av12345678"
    },
    {
      title: "Google：数字营销与电子商务",
      description: "掌握数字营销与电子商务的关键技能与策略",
      type: 'course',
      link: "https://www.youtube.com/watch?v=1234567890"
    },
    {
      title: "斯坦福：社交媒体营销策略",
      description: "学习如何制定与执行有效的社交媒体营销策略",
      type: 'course',
      link: "https://www.bilibili.com/video/av87654321"
    }
  ];
  
  // 营销渠道效果数据
  const marketingChannels = [
    {
      title: "内容营销",
      effectiveness: 85,
      description: "通过高质量内容吸引与教育目标受众，建立品牌权威"
    },
    {
      title: "社交媒体营销",
      effectiveness: 80,
      description: "利用社交平台与目标受众互动，提升品牌知名度与参与度"
    },
    {
      title: "搜索引擎优化(SEO)",
      effectiveness: 75,
      description: "优化网站内容与结构，提高有机搜索排名与流量"
    },
    {
      title: "电子邮件营销",
      effectiveness: 70,
      description: "与目标受众建立直接联系，推动转化与客户留存"
    },
    {
      title: "付费广告(PPC)",
      effectiveness: 65,
      description: "通过付费广告快速获得流量与曝光，测试市场反应"
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
                  CMO角色指南
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
                品牌战略 · 数字营销 · 客户体验
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* CMO角色概述 */}
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
              首席营销官角色概述
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  首席营销官(CMO)负责公司的营销策略、品牌管理、市场推广与客户关系。CMO需要了解市场趋势，制定有效的营销计划，并推动产品与服务的市场认可。在当今数字化时代，CMO的角色正在从传统的营销推广向客户体验与数据驱动的方向转变。
                </p>
                
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  优秀的CMO能够深入理解客户需求，制定创新的营销策略，利用数据分析优化营销效果，并与其他部门密切合作，确保营销活动与公司整体战略保持一致。CMO还需要领导营销团队，培养营销人才，建立高效的营销文化。
                </p>
              </div>
              
              <div>
                <GlassCard className="p-5 h-full bg-[#0b1e2e]/50 border-[#d4af37]/30">
                  <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    关键角色职责
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      "制定公司整体营销策略",
                      "管理与提升品牌价值",
                      "领导市场研究与分析",
                      "规划与执行营销活动",
                      "优化客户体验与满意度",
                      "管理营销预算与资源",
                      "评估营销效果与ROI"
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
        
        {/* 营销领域 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            核心营销领域
          </motion.h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingDomains.map((domain, index) => (
              <MarketingDomainCard key={index} domain={domain} />
            ))}
          </div>
        </section>
        
        {/* 营销渠道效果评估 */}
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
              营销渠道效果评估
            </motion.h2>
            
            <div className="space-y-6">
              {marketingChannels.map((channel, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">{channel.title}</span>
                    <span className="text-[#d4af37] font-medium">{channel.effectiveness}%</span>
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
                      whileInView={{ width: `${channel.effectiveness}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </motion.div>
                  <p className="text-white/60 text-sm mt-1">{channel.description}</p>
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
            CMO学习资源库
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

export default CMOPage;