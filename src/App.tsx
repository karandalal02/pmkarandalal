import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExplorerProvider } from "@/context/ExplorerContext";
import SiteExplorer from "@/components/SiteExplorer";
import Index from "./pages/Index";
import GoldiesGrandMatch from "./pages/GoldiesGrandMatch";
import Shockwave from "./pages/Shockwave";
import AiJobSearchSystem from "./pages/AiJobSearchSystem";
import TvTime2 from "./pages/TvTime2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ExplorerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/goldies-grand-match" element={<GoldiesGrandMatch />} />
            <Route path="/shockwave" element={<Shockwave />} />
            <Route path="/ai-job-search-system" element={<AiJobSearchSystem />} />
            <Route path="/tv-time-2-0" element={<TvTime2 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SiteExplorer />
        </BrowserRouter>
      </ExplorerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
