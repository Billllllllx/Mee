import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import CFOPage from "@/pages/CFOPage";
import FinancePage from "@/pages/FinancePage";
import EconomicsPage from "@/pages/EconomicsPage";
import CalculatorPage from "@/pages/CalculatorPage";
import NewsPage from "@/pages/NewsPage";
import ExcelPage from "@/pages/ExcelPage";
import BusinessPage from "@/pages/BusinessPage";
import CEOPage from "@/pages/CEOPage";
import CTOPage from "@/pages/CTOPage";
import CMOPage from "@/pages/CMOPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/business/cfo" element={<CFOPage />} />
        <Route path="/business/ceo" element={<CEOPage />} />
        <Route path="/business/cto" element={<CTOPage />} />
        <Route path="/business/cmo" element={<CMOPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/economics" element={<EconomicsPage />} />
        <Route path="/calculators" element={<CalculatorPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/excel" element={<ExcelPage />} />
        {/* 添加通配符路由，确保所有未匹配的路由都能重定向到首页 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  );
}