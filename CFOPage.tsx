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

// 财务领域卡片组件
const FinanceDomainCard: React.FC<{
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

// PDF上传和预览组件
const PDFUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // 在实际应用中，这里可以处理文件上传逻辑
      // 这里仅做预览
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleUpload = () => {
    if (selectedFile) {
      // 这里可以添加实际的文件上传逻辑
      alert(`文件 "${selectedFile.name}" 已上传成功！`);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
        />
        <label 
          htmlFor="pdf-upload"
          className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-[#0b1e2e] font-bold rounded-lg cursor-pointer flex items-center justify-center"
        >
          <i className="fa-solid fa-file-pdf mr-2"></i> 选择PDF文件
        </label>
        
        {selectedFile && (
          <motion.button
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
          >
            上传文件
          </motion.button>
        )}
      </div>
      
      {selectedFile && (
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fa-solid fa-file-pdf text-[#d4af37] mr-2"></i>
              <span className="text-white/90">{selectedFile.name}</span>
            </div>
            <span className="text-white/60 text-sm">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>
      )}
      
      {previewUrl && (
        <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
          <h4 className="text-lg font-medium mb-3 text-[#d4af37]">文件预览</h4>
          <div className="w-full h-[400px] bg-white/5 rounded-lg flex items-center justify-center">
            {/* 在实际应用中，这里可以使用PDF.js等库来渲染PDF */}
            <div className="text-center">
              <i className="fa-solid fa-file-pdf text-5xl text-[#d4af37] mb-3"></i>
              <p className="text-white/80">点击查看PDF文件</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 学习资源卡片组件
const LearningResourceCard: React.FC<{
  resource: {
    title: string;
    author: string;
    description: string;
    coverUrl?: string;
    link?: string;
  };
  type: 'book' | 'course' | 'podcast';
}> = ({ resource, type }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={() => resource.link && window.open(resource.link, '_blank')}
    >
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 h-full">
        <div className="flex items-start">
          {resource.coverUrl && (
            <div className="w-20 h-28 bg-gray-800 rounded-md overflow-hidden mr-4 flex-shrink-0">
              <img 
                src={resource.coverUrl} 
                alt={resource.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className={`flex-1 ${!resource.coverUrl ? 'flex items-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center mr-3 flex-shrink-0">
              {type === 'book' && <i className="fa-solid fa-book text-[#d4af37]"></i>}
              {type === 'course' && <i className="fa-solid fa-graduation-cap text-[#d4af37]"></i>}
              {type === 'podcast' && <i className="fa-solid fa-podcast text-[#d4af37]"></i>}
            </div>
            <div>
              <h4 className="font-medium text-white/90">{resource.title}</h4>
              {resource.author && (
                <p className="text-white/60 text-sm">{resource.author}</p>
              )}
              <p className="text-white/70 text-sm mt-1">{resource.description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CFOPage = () => {
  const navigate = useNavigate();
  
  // 财务领域数据
  const financeDomains = [
    {
      title: "财务战略",
      description: "制定与企业战略一致的财务战略，优化资本结构，进行战略投资决策，创造长期股东价值",
      icon: "chess"
    },
    {
      title: "财务报表分析",
      description: "分析财务报表，评估企业财务健康状况，识别业务趋势，为决策提供数据支持",
      icon: "chart-line"
    },
    {
      title: "财务管理",
      description: "管理企业日常财务活动，优化现金流，控制成本，确保财务合规与报告质量",
      icon: "wallet"
    },
    {
      title: "资本运作",
      description: "负责企业融资、并购、上市等资本运作活动，优化资本结构，提升企业价值",
      icon: "money-bill-wave"
    },
    {
      title: "风险管理",
      description: "识别、评估与管理企业面临的各类风险，包括财务风险、市场风险、运营风险等",
      icon: "shield-halved"
    },
    {
      title: "财务科技",
      description: "推动财务数字化转型，采用新技术提升财务效率与决策质量",
      icon: "laptop-code"
    }
  ];
  
  // CFO关键职责数据
  const cfoResponsibilities = [
    {
      title: "财务规划与分析",
      description: "制定财务计划与预算，进行财务分析，为战略决策提供支持",
      percentage: 30
    },
    {
      title: "资本结构与融资",
      description: "管理企业资本结构，制定融资策略，优化资金成本",
      percentage: 25
    },
    {
      title: "财务报告与合规",
      description: "确保财务报告的准确性与及时性，遵守相关法规与准则",
      percentage: 20
    },
    {
      title: "风险管理",
      description: "识别与管理财务风险，制定风险应对策略",
      percentage: 15
    },
    {
      title: "投资者关系",
      description: "与投资者保持沟通，管理投资者预期，提升企业市场价值",
      percentage: 10
    }
  ];
  
  // 必读书籍数据
  const books = [
    {
      title: "《财务战略》· 哈佛课程笔记",
      author: "罗伯特·卡普兰",
      description: "CFO视角的资本配置与战略决策，提升财务战略思维",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=finance%20strategy%20book%20cover&sign=1b3c3c3a95c633006d01353ac7c4722e",
    },
    {
      title: "《估值》· 达莫达兰",
      author: "阿斯沃斯·达莫达兰",
      description: "内在价值评估与投资决策框架，掌握企业估值核心方法",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=valuation%20book%20cover&sign=e50fe43f96973acd3c8b7d0edfce793a",
    },
    {
      title: "《财务报表分析》",
      author: "马丁·弗里德森",
      description: "透视企业财务健康状况的核心方法，提升财务分析能力",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=financial%20statement%20analysis%20book&sign=698ed60df9f15aacd0f8fd2db0dc9d84",
    },
    {
      title: "《公司金融》",
      author: "理查德·布雷利",
      description: "现代企业融资与投资管理，掌握公司金融核心理论与实践",
      coverUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=corporate%20finance%20book%20cover&sign=965daea12040f9ab4570396a4f387f61",
    }
  ];
  
  // 在线课程数据
  const courses = [
    {
      title: "B站·牛津大学\"公司财务\"公开课",
      description: "由牛津大学教授讲解的公司财务管理核心课程",
      link: "https://www.bilibili.com/video/av12345678"
    },
    {
      title: "YouTube·沃顿商学院\"首席财务官\"专项课程节选",
      description: "沃顿商学院专为CFO设计的高级管理课程",
      link: "https://www.youtube.com/watch?v=1234567890"
    },
    {
      title: "财务领导力提升",
      description: "从财务专家到战略领导者的转型之路",
      link: "https://www.bilibili.com/video/av87654321"
    },
    {
      title: "企业数字化转型中的财务管理",
      description: "数字化时代CFO的新角色与挑战",
      link: "https://www.bilibili.com/video/av23456789"
    }
  ];
  
  // 播客数据
  const podcasts = [
    {
      title: "《CFO Think Tank》· 第45期 \"数字化转型中的财务\"",
      description: "探讨数字化转型对企业财务管理的影响",
      link: "https://example.com/podcast1"
    },
    {
      title: "《财务领导力》· \"从数据到决策\"",
      description: "如何利用财务数据驱动企业战略决策",
      link: "https://example.com/podcast2"
    },
    {
      title: "《金融前沿》· \"财务科技创新与应用\"",
      description: "最新财务科技趋势及其在企业中的实际应用",
      link: "https://example.com/podcast3"
    },
    {
      title: "《CFO访谈录》· \"危机中的财务管理\"",
      description: "如何在经济不确定性时期保持企业财务健康",
      link: "https://example.com/podcast4"
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
                  CFO角色指南
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
                财务战略 · 资本运作 · 风险管理
              </motion.div>
            </div>
            
            <div className="w-10"></div> {/* 占位，保持标题居中 */}
          </div>
        </motion.header>
        
        {/* CFO角色概述 */}
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
              首席财务官角色概述
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  首席财务官(CFO)负责公司的财务管理、财务规划、风险管理、财务报告与分析。CFO需要确保公司财务健康，为战略决策提供财务洞见，并优化资本结构与投资决策。在现代企业中，CFO的角色已经从传统的财务管家转变为战略合作伙伴，参与公司的战略制定与执行。
                </p>
                
                <p className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  优秀的CFO不仅需要精通财务专业知识，还需要具备战略思维、领导力、沟通能力与商业敏感度。CFO需要与CEO、董事会及其他高管密切合作，确保财务战略与业务战略保持一致，为企业创造长期价值。
                </p>
              </div>
              
              <div>
                <GlassCard className="p-5 h-full bg-[#0b1e2e]/50 border-[#d4af37]/30">
                  <h3 className="text-xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    关键角色职责
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      "制定公司财务战略与规划",
                      "管理企业资本结构与融资活动",
                      "监督财务报告与内部控制",
                      "进行财务分析与决策支持",
                      "识别与管理财务风险",
                      "优化成本结构与提升效率",
                      "参与战略规划与业务决策"
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
        
        {/* 核心财务领域 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            核心财务领域
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeDomains.map((domain, index) => (
              <FinanceDomainCard key={index} domain={domain} />
            ))}
          </div>
        </section>
        
        {/* CFO日常职责分布 */}
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
              {cfoResponsibilities.map((item, index) => (
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
        
        {/* PDF上传区域 */}
        <section className="mb-16">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              <i className="fa-solid fa-upload text-[#d4af37] mr-2"></i> 上传学习资料
            </h2>
            <p className="text-white/70 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              上传您的PDF学习资料，方便随时查阅和学习
            </p>
            
            <PDFUploader />
          </GlassCard>
        </section>
        
        {/* 学习资源区域 */}
        <section className="mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CFO学习资源库
          </motion.h2>
          
          {/* 必读书籍 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center mr-3">
                <i className="fa-solid fa-book text-[#d4af37]"></i>
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                必读书籍
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <LearningResourceCard key={index} resource={book} type="book" />
              ))}
            </div>
          </div>
          
          {/* 在线课程 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center mr-3">
                <i className="fa-solid fa-graduation-cap text-[#d4af37]"></i>
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                在线课程
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <LearningResourceCard key={index} resource={course} type="course" />
              ))}
            </div>
          </div>
          
          {/* 推荐播客 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center mr-3">
                <i className="fa-solid fa-podcast text-[#d4af37]"></i>
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                推荐播客
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {podcasts.map((podcast, index) => (
                <LearningResourceCard key={index} resource={podcast} type="podcast" />
              ))}
            </div>
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

export default CFOPage;