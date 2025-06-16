import { Button } from "@/components/ui/button";
import { Star, Wrench, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <section className="pt-40 sm:pt-48 pb-20 px-4"> {/* Increased padding to prevent navbar overlap */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8">
          {/* Tagline */}
          <div className="flex items-center justify-center sm:justify-center lg:justify-start gap-2 
                bg-mint/10 w-fit px-4 py-2 rounded-full border border-mint/20 mx-auto lg:mx-0
                transition-all duration-300 hover:bg-mint/20 hover:border-mint/40 hover:scale-105 group">
            <Star className="w-4 h-4 text-mint transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-mint text-sm font-medium transition-colors duration-300 group-hover:text-white">Roadside Assistance</span>
          </div>

          {/* Title */}
          <h1 className="text-center sm:text-left text-4xl sm:text-5xl md:text-6xl lg:text-5xl 
               font-extrabold leading-tight sm:leading-[1.1] md:leading-[1.2] lg:leading-[1.3] 
               text-white tracking-tight font-[Montserrat]">
            Get your <span className="sm:block relative inline-block transition-transform duration-300 hover:scale-105 hover:text-mint">ride fixed</span> 
            <span className="block text-mint relative inline-block transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(132,255,132,0.5)]">fast</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/80 max-w-md mx-auto lg:mx-0">
            24/7 roadside assistance and emergency repairs to get you back on the road quickly when your vehicle breaks down.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <Button 
              className="bg-mint hover:bg-mint/90 text-forest font-medium px-8 py-6 text-lg flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/20"
              onClick={() => navigate("/login")}
            >
              <Wrench className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              Get Assistance Now
            </Button>
            <Button className="bg-mint hover:bg-mint/90 text-forest font-medium px-8 py-6 text-lg flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/20">
              <User className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              Join as Mechanic
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center w-full group overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -inset-0.5 bg-mint/10 rounded-2xl blur opacity-20 hidden sm:block transition-all duration-500 group-hover:opacity-30 group-hover:blur-lg group-hover:bg-mint/20" />

          {/* Image - Optimized for Mobile */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="app.jpg"
              alt="Vehicle breakdown assistance"
              className="relative w-full h-auto 
                       max-w-full max-h-[250px] 
                       sm:max-w-[500px] sm:max-h-[400px] 
                       md:max-w-[600px] md:max-h-[350px] 
                       lg:max-w-[700px] lg:max-h-[400px] 
                       xl:max-w-[900px] xl:max-h-[450px] 
                       object-cover transition-all duration-700 ease-in-out
                       hover:scale-110 hover:shadow-[0_0_20px_rgba(132,255,132,0.15)]
                       hover:brightness-105 hover:contrast-105
                       group-hover:shadow-[0_0_30px_rgba(132,255,132,0.2)]
                       transform-gpu"
            />
          </div>
          {/* Background Glow - Enhanced */}
          <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur opacity-30 hidden sm:block transition-all duration-500 group-hover:opacity-50 group-hover:blur-xl group-hover:bg-mint/30" />

          {/* Statistics Box - Better Positioning */}
          <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 sm:left-10 transform -translate-x-1/2 sm:translate-x-0 
                         bg-forest-light p-4 sm:p-6 rounded-xl shadow-xl border border-mint/10
                         transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/20 hover:border-mint/30">
            <p className="text-mint text-2xl sm:text-4xl font-bold transition-all duration-300 hover:scale-110">100+</p>
            <p className="text-white/80 text-sm sm:text-base transition-colors duration-300 hover:text-white">Rescued vehicles</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;