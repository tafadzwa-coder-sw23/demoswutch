import React from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import heroImage from "@/assets/hero-marketplace.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Swumarket Digital Marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-85"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-light/25 rounded-full blur-lg animate-pulse delay-300"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <div className="animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
            Zimbabwe's
            <span className="block gradient-text bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Complete Digital
            </span>
            Marketplace
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your one-stop hub for commerce, services, and community. From local groceries to property, 
            jobs to healthcare - powered by AI for smarter shopping.
          </p>
        </div>

        {/* Search Bar */}
        <div className="animate-fade-up delay-200 mb-12">
          <SearchBar 
            className="max-w-3xl mx-auto"
            placeholder="Search for products, services, properties, jobs..."
          />
        </div>

        {/* Action Buttons */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
            Explore Categories
          </Button>
          <Button variant="outline-light" size="lg" className="px-8 py-4 text-lg">
            Join Beta Program
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="animate-fade-up delay-500 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">AI-Powered</h3>
            <p className="text-primary-foreground/80 text-sm">Smart shopping comparison across all vendors</p>
          </div>
          <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Hyper-Local</h3>
            <p className="text-primary-foreground/80 text-sm">Find everything in your immediate vicinity</p>
          </div>
          <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-3xl mb-3">🏘️</div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Community</h3>
            <p className="text-primary-foreground/80 text-sm">Connect with local businesses and neighbors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;