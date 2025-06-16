import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer bg-gradient-to-b from-forest to-forest-dark relative">
      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-forest transform -translate-y-full"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group">
              <img
                src="/fixmyapp logo.png"
                alt="App Logo"
                className="h-12 w-auto bg-white rounded-full shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:shadow-mint/50"
              />
              <h3 className="text-2xl font-bold text-white group-hover:text-mint transition-colors duration-300">
                Fix my Ride
              </h3>
            </div>
            <p className="text-white/60 max-w-xs leading-relaxed">
              Professional auto repair and maintenance services to keep your vehicle running smoothly.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-mint hover:text-forest transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white relative inline-block group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "All Services", path: "/services" },
                { name: "Oil Change", path: "/services/oil-change" },
                { name: "Brake Repair", path: "/services/brake-repair" },
                { name: "Engine Repair", path: "/services/engine-repair" },
                { name: "Tire Service", path: "/services/tire-service" }
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path} 
                    className="text-white/60 hover:text-mint transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-3 mr-2"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white relative inline-block group">
              Company
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Careers", path: "/careers" },
                { name: "Reviews", path: "/reviews" },
                { name: "Blog", path: "/blog" },
                { name: "Press", path: "/press" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-white/60 hover:text-mint transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-3 mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white relative inline-block group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/60 hover:text-mint transition-all duration-300 group">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-white/60 hover:text-mint transition-all duration-300 group">
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>support@fixmyride.com</span>
              </li>
              <li className="flex items-center space-x-3 text-white/60 hover:text-mint transition-all duration-300 group">
                <MapPin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>123 Auto Street, Car City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-mint/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Fix my Ride. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/60 hover:text-mint transition-all duration-300 text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-white/60 hover:text-mint transition-all duration-300 text-sm">Terms of Service</Link>
            <Link to="/warranty" className="text-white/60 hover:text-mint transition-all duration-300 text-sm">Warranty</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-mint rounded-full flex items-center justify-center text-forest shadow-lg hover:shadow-mint/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
