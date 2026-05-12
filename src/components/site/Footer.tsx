import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">MIS</span>
              </div>
              <div>
                <div className="font-bold text-xl">MIS Metal</div>
                <div className="text-sm text-gray-300">Construction</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Building excellence in metal construction and steel structures since 2005.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/projects" className="block text-gray-300 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/shop" className="block text-gray-300 hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Metal Structures</p>
              <p className="text-gray-300 text-sm">Steel Fabrication</p>
              <p className="text-gray-300 text-sm">Industrial Buildings</p>
              <p className="text-gray-300 text-sm">Welding Services</p>
              <p className="text-gray-300 text-sm">Installation & Maintenance</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-primary" />
                <span>123 Industrial Ave, Construction City, CC 12345</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={18} className="flex-shrink-0 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={18} className="flex-shrink-0 text-primary" />
                <span>info@mismetal.com</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-primary rounded flex items-center justify-center hover:bg-opacity-80 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded flex items-center justify-center hover:bg-opacity-80 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded flex items-center justify-center hover:bg-opacity-80 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded flex items-center justify-center hover:bg-opacity-80 transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900/40 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 MIS Metal Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
