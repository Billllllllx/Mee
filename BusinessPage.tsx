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

// 管理角色卡片组件
const RoleCard: React.FC<{
  role: {
    title: string;
    subtitle: string;
    icon: string;
    description: string;
    path: string;
    emphasis?: boolean;
  };
}> = ({ role }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      className={`w-full ${role.emphasis ? 'md:col-span-2' : ''}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard 
        className={`p-6 h-full cursor-pointer transition-all duration-300 ${
          role.emphasis ? 'border-[#d4af37]/40' : ''
        }`}
        onClick={() => navigate(role.path)}
      >
        <div className="flex items-center mb-4">
          <motion.div 
            className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 
              ${role.emphasis 
                ? 'bg-gradient-to-br from-[#d4af37] to-[#f5d76e] text-[#0b1e2e]' 
                : 'bg-[#d4af37]/20 text-[#d4af37]'
              }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <i className={`fa-solid fa-${role.icon} text-2xl`}></i>
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              {role.title}
            </h3>
            <p className="text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
              {role.subtitle}
            </p>
          </div>
        </div>
        
        <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          {role.description}
        </p>
        
        <motion.div 
          className="flex items-center text-[#d4af37] font-medium"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span>探索更多</span>
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
};

// 商业趋势卡片组件
const TrendCard: React.FC<{
  trend: {
    title: string;
    description: string;
    icon: string;
  };
}> = ({ trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-5 h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
            {trend.title}
          </h3>
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
            <i className={`fa-solid fa-${trend.icon} text-[#d4af37]`}></i>
          </div>
        </div>
        <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          {trend.description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

const BusinessPage = () => {
  const navigate = useNavigate();
  
  // 管理角色数据
  const roles = [
    {
      title: "CEO",
      subtitle: "首席执行官",
      icon: "user-tie",
      description: "负责制定公司整体战略方向、建立企业文化、领导高管团队并对公司整体业绩负责。CEO是公司与外部利益相关者的主要联系人，需要平衡短期目标与长期愿景。",
      path: "/business/ceo",
      emphasis: true
    },
    {
      title: "CFO",
      subtitle: "首席财务官",
      icon: "chart-line",
      description: "负责公司的财务管理、财务规划、风险管理、财务报告与分析。CFO需要确保公司财务健康，为战略决策提供财务洞见，并优化资本结构与投资决策。",
      path: "/business/cfo",
      emphasis: true
    },
    {
      title: "CTO",
      subtitle: "首席技术官",
      icon: "code",
      description: "负责公司的技术战略、产品研发、技术架构与创新。CTO需要领导技术团队，推动技术创新，并确保技术战略与业务目标保持一致。",
      path: "/business/cto"
    },
    {
      title: "CMO",
      subtitle: "首席营销官",
      icon: "bullhorn",
      description: "负责公司的营销策略、品牌管理、市场推广与客户关系。CMO需要了解市场趋势，制定有效的营销计划，并推动产品与服务的市场认可。",
      path: "/business/cmo"
    }
  ];
  
  // 商业趋势数据
  const trends = [
    {
      title: "数字化转型",
      description: "企业数字化转型已成为必然趋势，通过技术创新提升运营效率与竞争力",
      icon: "digital-tachograph"
    },
    {
      title: "可持续发展",
      description: "ESG战略已成为企业长期发展的核心竞争力，影响投资者决策与品牌价值",
      icon: "leaf"
    },
    {
      title: "远程工作",
      description: "混合办公模式成为新常态，企业需要重新思考组织设计与人才管理策略",
      icon: "laptop-house"
    },
    {
      title: "数据驱动决策",
      description: "数据分析与人工智能正在改变企业决策方式，提升决策精准度与效率",
      icon: "database"
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
                  商业管理
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
                企业领导力 · 管理策略 · 组织发展
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* 管理角色卡片网格 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            管理角色指南
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <RoleCard key={index} role={role} />
            ))}
          </div>
        </section>
        
        {/* 商业趋势卡片 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            商业前沿趋势
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trends.map((trend, index) => (
              <TrendCard key={index} trend={trend} />
            ))}
          </div>
        </section>
        
        {/* 管理挑战与解决方案 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            管理挑战与解决方案
          </motion.h2>
          
          <GlassCard className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  当前企业面临的主要挑战
                </h3>
                <ul className="space-y-4">
                  {[
                    "全球经济不确定性与市场波动",
                    "数字化转型的复杂性与资源需求",
                    "人才争夺战与员工留存问题",
                    "可持续发展的压力与机遇",
                    "供应链韧性与风险管理"
                  ].map((challenge, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <i className="fa-solid fa-circle-exclamation text-[#d4af37] mt-1 mr-3"></i>
                      <span className="text-white/80">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  管理解决方案与最佳实践
                </h3>
                <ul className="space-y-4">
                  {[
                    "建立敏捷组织，提高适应变化的能力",
                    "投资数字技术，优化业务流程与客户体验",
                    "培养学习型文化，吸引并留住顶尖人才",
                    "将ESG融入企业战略，创造长期价值",
                    "构建多元化供应链，增强风险抵御能力"
                  ].map((solution, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <i className="fa-solid fa-lightbulb text-[#d4af37] mt-1 mr-3"></i>
                      <span className="text-white/80">{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
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

export default BusinessPage;