import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Swumarket
              </h3>
              <p className="text-neutral-light mt-2">
                Zimbabwe's complete digital marketplace ecosystem
              </p>
            </div>
            
            <div className="space-y-3 text-sm text-neutral-light">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@swumarket.co.zw</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+263 77 123 4567</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-neutral-light hover:text-secondary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Marketplace Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li><a href="#" className="hover:text-secondary transition-colors">Supermarkets & Groceries</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Food & Restaurants</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Property Marketplace</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Hardware & Building</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Pharmacies & Health</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Agricultural Supplies</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Jobs & Gig Economy</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-light">
              <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Beta Program</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Stay Updated</h4>
            <p className="text-sm text-neutral-light mb-4">
              Get the latest updates on new features and marketplace insights.
            </p>
            
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-neutral-light/10 border-neutral-light/20 text-white placeholder:text-neutral-light/60"
              />
              <Button variant="secondary" className="w-full">
                Subscribe to Newsletter
              </Button>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs text-neutral-light">
                🎉 <strong>Beta Launch:</strong> Be among the first to experience the future of commerce in Zimbabwe!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-light/20" />
      
      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-neutral-light">
            © {currentYear} Swumarket. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm text-neutral-light">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;