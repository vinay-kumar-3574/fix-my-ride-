import { Users, Clock, Star, MapPin } from "lucide-react";

const Stats = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/20 to-forest/40 backdrop-blur-sm"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Users,
              value: "10K+",
              label: "Active Users",
              description: "Trusted by thousands of drivers",
            },
            {
              icon: Clock,
              value: "15min",
              label: "Average Response",
              description: "Quick assistance when you need it",
            },
            {
              icon: Star,
              value: "4.8",
              label: "User Rating",
              description: "Based on verified reviews",
            },
            {
              icon: MapPin,
              value: "50+",
              label: "Cities Covered",
              description: "Nationwide service network",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-forest-light/40 backdrop-blur-md rounded-xl p-6 border border-mint/10
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/20 
                       hover:border-mint/30 group relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-mint/0 to-mint/0 
                            group-hover:from-mint/5 group-hover:to-mint/10 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mb-4
                              transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                              group-hover:bg-mint/30">
                  {stat.icon && (
                    <stat.icon className="w-6 h-6 text-mint transition-transform duration-300 
                                       group-hover:scale-110 group-hover:rotate-12" />
                  )}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white transition-colors duration-300 
                             group-hover:text-mint">{stat.value}</h3>
                <p className="text-lg font-semibold mb-2 text-white/90 transition-colors duration-300 
                            group-hover:text-white">{stat.label}</p>
                <p className="text-white/70 text-sm transition-colors duration-300 
                            group-hover:text-white/90">{stat.description}</p>
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

export default Stats;