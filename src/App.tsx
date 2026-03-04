import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Generating from "./pages/Generating";
import Storefront from "./pages/Storefront";
import NotFound from "./pages/NotFound";
import ScanKartDashboard from "./pages/scankart/Dashboard";
import ScanKartInventory from "./pages/scankart/Inventory";
import ScanKartCheckout from "./pages/scankart/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<Create />} />
          <Route path="/generating" element={<Generating />} />
          <Route path="/shop/:slug" element={<Storefront />} />
          <Route path="/shop/:slug/pos" element={<ScanKartDashboard />} />
          <Route path="/shop/:slug/pos/inventory" element={<ScanKartInventory />} />
          <Route path="/shop/:slug/pos/checkout" element={<ScanKartCheckout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
