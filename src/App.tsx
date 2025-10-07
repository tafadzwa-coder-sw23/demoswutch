import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";       
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CommodityExchangePage from "./pages/category-pages/CommodityExchangePage";
import SupermarketPage from "./pages/category-pages/SupermarketPage";
import FoodRestaurantPage from "./pages/category-pages/FoodRestaurantPage";
import HardwareBuildingPage from "./pages/category-pages/HardwareBuildingPage";
import PharmaciesPage from "./pages/category-pages/PharmaciesPage";
import AgriculturePage from "./pages/category-pages/AgriculturePage";
import PetShopsPage from "./pages/category-pages/PetShopsPage";
import ServiceExchangePage from "./pages/category-pages/ServiceExchangePage";
import SearchResults from "./pages/SearchResults";
import ProductPage from "./pages/ProductPage";
import Scan from "./pages/Scan";
import Cart from "./pages/Cart";
import Budget from "./pages/Budget";
import Map from "./pages/Map";
import VideoHub from "./pages/VideoHub";
import Reminders from "./pages/Reminders";
import SellerDashboard from "./pages/SellerDashboard";
import GroupPayments from "./pages/GroupPayments";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import { I18nProvider } from "@/i18n/i18n";
import { CartProvider } from "@/context/CartContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { SearchProvider } from "@/context/SearchContext";
import { FinancialProvider } from "@/context/FinancialContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { AnonymousGroupsProvider } from "@/context/AnonymousGroupsContext";
import { FitnessGamingProvider } from "@/context/FitnessGamingContext";
import { SafetyProvider } from "@/context/SafetyContext";
import { TrafficProvider } from "@/context/TrafficContext";
import BottomNavigation from "./components/BottomNavigation";
import FloatingAIAssistant from "./components/FloatingAIAssistant";
import FinancialServices from "./pages/FinancialServices";
import Gamification from "./pages/Gamification";
import AnonymousGroups from "./pages/AnonymousGroups";
import FitnessGaming from "./pages/FitnessGaming";
import Safety from "./pages/Safety";
import Traffic from "./pages/Traffic";
import PlanningTool from "./pages/PlanningTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <CartProvider>
          <SettingsProvider>
            <MarketplaceProvider>
              <SearchProvider>
                <FinancialProvider>
                  <GamificationProvider>
                    <AnonymousGroupsProvider>
                      <FitnessGamingProvider>
                        <SafetyProvider>
                          <TrafficProvider>
                            <BrowserRouter>
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/map" element={<Map />} />
          <Route path="/videos" element={<VideoHub />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/dashboard" element={<SellerDashboard />} />
              <Route path="/group-payments" element={<GroupPayments />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/help" element={<Help />} />
              <Route path="/financial" element={<FinancialServices />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/groups" element={<AnonymousGroups />} />
              <Route path="/fitness" element={<FitnessGaming />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/traffic" element={<Traffic />} />
              <Route path="/planner" element={<PlanningTool />} />
              {/* Category Pages */}
          <Route path="/category/commodity-exchange" element={<CommodityExchangePage />} />
          <Route path="/category/supermarket" element={<SupermarketPage />} />
          <Route path="/category/food-restaurant" element={<FoodRestaurantPage />} />
          <Route path="/category/hardware-building" element={<HardwareBuildingPage />} />
          <Route path="/category/pharmacies" element={<PharmaciesPage />} />
          <Route path="/category/agriculture" element={<AgriculturePage />} />
          <Route path="/category/pet-shops" element={<PetShopsPage />} />
          <Route path="/category/service-exchange" element={<ServiceExchangePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
                  </Routes>
                  <BottomNavigation />
                  <FloatingAIAssistant />
                            </BrowserRouter>
                          </TrafficProvider>
                        </SafetyProvider>
                      </FitnessGamingProvider>
                    </AnonymousGroupsProvider>
                  </GamificationProvider>
                </FinancialProvider>
              </SearchProvider>
            </MarketplaceProvider>
          </SettingsProvider>
        </CartProvider>
      </I18nProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );

export default App;
