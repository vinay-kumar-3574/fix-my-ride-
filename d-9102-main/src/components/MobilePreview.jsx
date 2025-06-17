import { Wrench, MapPin, CreditCard, AlertTriangle } from "lucide-react";

const MobilePreview = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/20 to-forest/40 backdrop-blur-sm"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block group">
            Key Features
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
          </h2>
          <p className="text-white/80 transition-colors duration-300 group-hover:text-white">
            Explore the smart features that make vehicle breakdown assistance effortless.
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-wrap justify-center gap-8">
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
              className="w-64 p-6 bg-forest-light/40 backdrop-blur-md rounded-xl border border-mint/10 text-center
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/20 
                       hover:border-mint/30 group relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-mint/0 to-mint/0 
                            group-hover:from-mint/5 group-hover:to-mint/10 transition-all duration-300"></div>
              
              {/* Icon Container */}
              <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4
                            transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                            group-hover:bg-mint/30 relative z-10">
                {feature.icon && (
                  <feature.icon className="w-6 h-6 text-mint transition-transform duration-300 
                                         group-hover:scale-110 group-hover:rotate-12" />
                )}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 transition-colors duration-300 
                             group-hover:text-mint">{feature.title}</h3>
                <p className="text-white/80 text-sm transition-colors duration-300 
                            group-hover:text-white">{feature.description}</p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-mint/0 rounded-xl 
                            transition-all duration-300 group-hover:border-mint/30"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
