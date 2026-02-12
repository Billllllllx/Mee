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

// 核心能力卡片组件
const CoreCapabilityCard: React.FC<{
  capability: {
    title: string;
    description: string;
    icon: string;
  };
}> = ({ capability }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6 h-full">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center mr-4">
            <i className={`fa-solid fa-${capability.icon} text-[#d4af37] text-xl`}></i>
          </div>
          <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            {capability.title}
          </h3>
        </div>
        <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {capability.description}
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

const CEOPage = () => {
  const navigate = useNavigate();
  
  // CEO核心能力数据
  const coreCapabilities = [
    {
      title: "战略思维",
      description: "制定清晰的企业愿景与长期战略，识别市场机会，指导组织实现可持续增长",
      icon: "chess"
    },
    {
      title: "领导力",
      description: "激励与引导团队，建立高效的组织文化，培养未来领导者，推动组织变革",
      icon: "users-gear"
    },
    {
      title: "决策能力",
      description: "在复杂与不确定环境中做出明智决策，平衡风险与回报，对结果负责",
      icon: "lightbulb"
    },
    {
      title: "沟通能力",
      description: "有效地与股东、员工、客户及其他利益相关者沟通，建立信任与共识",
      icon: "comments"
    },
    {
      title: "财务敏锐度",
      description: "理解财务报表与关键财务指标，确保企业财务健康，优化资源配置",
      icon: "chart-pie"
    },
    {
      title: "变革管理",
      description: "引领组织适应变化，管理转型过程中的挑战，确保变革成功实施",
      icon: "arrows-rotate"
    }
  ];
  
  // 学习资源数据
  const learningResources = [
    // 必读书籍
    {
      title: "《从优秀到卓越》",
      author: "吉姆·柯林斯",
      description: "研究如何使公司实现从优秀到卓越的跨越，提供了持久成功的关键原则",
      type: 'book'
    },
    {
      title: "《领导者的意识进化》",
      author: "罗伯特·凯根",
      description: "探讨领导者如何提升自我意识与认知能力，以应对复杂的领导挑战",
      type: 'book'
    },
    {
      title: "《原则》",
      author: "雷·达里奥",
      description: "分享作者的生活与工作原则，提供了一套系统的决策框架",
      type: 'book'
    },
    
    // 在线课程
    {
      title: "哈佛商学院：领导力与管理",
      description: "学习现代领导力理论与实践，提升团队管理与组织领导能力",
      type: 'course',
      link: "https://www.bilibili.com/video/av12345678"
    },
    {
      title: "MIT：战略管理",
      description: "掌握战略分析与制定的核心工具，学习如何打造可持续竞争优势",
      type: 'course',
      link: "https://www.youtube.com/watch?v=1234567890"
    },
    {
      title: "斯坦福：创新与创业",
      description: "学习如何培养创新思维，领导创新项目，推动企业持续发展",
      type: 'course',
      link: "https://www.bilibili.com/video/av87654321"
    },
    
    // 推荐播客
    {
      title: "《哈佛商业评论》播客",
      description: "探讨最新的商业趋势、领导力挑战与管理实践",
      type: 'podcast'
    },
    {
      title: "《领导力大师班》",
      description: "与全球顶尖CEO与领导者深入对话，分享他们的领导经验与见解",
      type: 'podcast'
    },
    {
      title: "《创业内幕》",
      description: "揭秘成功创业者与CEO的思维模式与决策过程",
      type: 'podcast'
    }
  ];
  
  // CEO日常职责数据
  const dailyResponsibilities = [
    {
      title: "战略规划与执行",
      description: "制定公司长期战略，监督战略执行进度，根据市场变化调整战略方向",
      percentage: 30
    },
    {
      title: "团队领导与人才发展",
      description: "领导高管团队，建立高效的组织文化，识别与培养关键人才",
      percentage: 25
    },
    {
      title: "利益相关者沟通",
      description: "与股东、投资者、客户、合作伙伴等利益相关者保持有效沟通",
      percentage: 20
    },
    {
      title: "财务监督与决策",
      description: "审查财务报表，监督公司财务健康，做出重大投资与融资决策",
      percentage: 15
    },
    {
      title: "外部关系与行业参与",
      description: "参与行业活动，建立外部合作关系，提升公司品牌形象",
      percentage: 10
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
                  CEO角色指南
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
                战略引领 · 团队管理 · 组织变革
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* CEO角色概述 */}
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
              首席执行官角色概述
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  首席执行官(CEO)是公司的最高行政长官，负责制定公司战略方向、建立企业文化、领导高管团队并对公司整体业绩负责。CEO是公司与外部利益相关者的主要联系人，需要平衡短期目标与长期愿景，在复杂多变的商业环境中做出关键决策。
                </p>
                
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  优秀的CEO不仅需要具备战略思维与领导能力，还需要拥有出色的沟通能力、决策能力与应变能力。在当今快速变化的商业环境中，CEO还需要不断学习与适应，引领企业进行数字化转型与创新，以保持竞争优势。
                </p>
              </div>
              
              <div>
                <GlassCard className="p-5 h-full bg-[#0b1e2e]/50 border-[#d4af37]/30">
                  <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    关键角色职责
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      "制定公司战略与愿景",
                      "领导与激励高管团队",
                      "对公司整体业绩负责",
                      "建立与维护企业文化",
                      "代表公司与外部利益相关者沟通",
                      "做出重大业务决策",
                      "监督财务健康与风险管理"
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
        
        {/* CEO核心能力 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CEO核心能力
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCapabilities.map((capability, index) => (
              <CoreCapabilityCard key={index} capability={capability} />
            ))}
          </div>
        </section>
        
        {/* CEO日常职责分布 */}
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
              日常职责时间分布
            </motion.h2>
            
            <div className="space-y-6">
              {dailyResponsibilities.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">{item.title}</span>
                    <span className="text-[#d4af37] font-medium">{item.percentage}%</span>
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
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </motion.div>
                  <p className="text-white/60 text-sm mt-1">{item.description}</p>
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
            CEO学习资源库
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

export default CEOPage;