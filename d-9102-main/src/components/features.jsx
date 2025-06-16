import React from "react";
import { Wrench, MapPin, Truck, CreditCard, AlertTriangle } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block group">
            How it works?
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
          </h2>
          <p className="text-white/80 transition-colors duration-300 group-hover:text-white">
            Comprehensive breakdown assistance services at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: MapPin,
              title: "Live Location Tracking",
              description: "View mechanics nearby in real-time and get accurate ETA updates.",
            },
            {
              icon: Wrench,
              title: "AI-Based Recommendations",
              description: "Our smart system suggests the best qualified mechanics for your issue.",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              description: "Pay seamlessly with multiple secure options and get instant receipts.",
            },
            {
              icon: AlertTriangle,
              title: "SOS Emergency Assistance",
              description: "Priority service for unsafe locations with direct emergency connections.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-forest-light/40 backdrop-blur-md rounded-xl border border-mint/10
                       transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-mint/20 
                       hover:border-mint/30 overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-mint/0 to-mint/0 
                            group-hover:from-mint/5 group-hover:to-mint/10 transition-all duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4
                            transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
                            group-hover:bg-mint/30 group-hover:shadow-lg group-hover:shadow-mint/20">
                {feature.icon && (
                  <feature.icon className="w-6 h-6 text-mint transition-all duration-500 
                                         group-hover:scale-110 group-hover:rotate-12
                                         group-hover:text-white" />
                )}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 transition-all duration-500 
                             group-hover:text-mint group-hover:scale-105">{feature.title}</h3>
                <p className="text-white/80 text-sm transition-all duration-500 
                            group-hover:text-white group-hover:translate-y-1">{feature.description}</p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-mint/0 rounded-xl 
                            transition-all duration-500 group-hover:border-mint/30"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-1000 bg-gradient-to-r from-transparent 
                            via-white/10 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
