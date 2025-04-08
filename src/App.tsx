
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Information from "./pages/Information";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import CategoryDetail from "./pages/CategoryDetail";
import Blog from "./pages/Blog";
import FloatingContactButton from "./components/floating-contact/FloatingContactButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customers" element={<Navigate to="/" />} />
          <Route path="/designers" element={<Navigate to="/" />} />
          <Route path="/information" element={<Information />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:category" element={<CategoryDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingContactButton />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
