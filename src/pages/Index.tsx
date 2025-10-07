import React from "react";
import FixedSearchBar from "@/components/FixedSearchBar";
import VideoFeed from "@/components/video-feed";
// Removed featured products grid per request
import CategoriesSection from "@/components/categories-section";
import HeaderControls from "@/components/HeaderControls";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar - Global Search */}
      <FixedSearchBar 
        searchContext="global"
        placeholder="Search for anything on Swumarket..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Swumarket
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Your Local Community Marketplace
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Buy & Sell Locally
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Formal & Informal
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Community First
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <CategoriesSection />


      {/* Video Feed Section */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Community Showcase
            </h2>
            <p className="text-muted-foreground">
              See what your neighbors are selling and sharing
            </p>
          </div>

          <VideoFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;
