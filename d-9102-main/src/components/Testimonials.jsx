import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "FixMyRide saved me when my car broke down on the highway. The mechanic arrived within 20 minutes and had me back on the road in no time. Their service is truly exceptional!",
              author: "Sarah Chen",
      role: "Marketing Director at TechFlow",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            },
            {
      quote: "As a busy professional, I can't afford car troubles. FixMyRide's quick response and professional service have been a lifesaver. Their app makes everything so convenient!",
              author: "Michael Rodriguez",
      role: "Senior Software Engineer at DevScale",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            },
            {
      quote: "The transparency in pricing and real-time tracking of mechanics is what sets FixMyRide apart. I always know exactly what's happening with my car repair.",
              author: "Emily Watson",
      role: "Product Manager at CloudPeak",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      quote: "I've used FixMyRide multiple times for different car issues. Their mechanics are knowledgeable, and the service is consistently excellent. Highly recommended!",
      author: "David Kim",
      role: "Business Analyst at DataCorp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      quote: "The emergency roadside assistance feature is a game-changer. When my battery died late at night, FixMyRide had someone there within 15 minutes. Amazing service!",
      author: "Lisa Patel",
      role: "HR Manager at GlobalTech",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
    },
    {
      quote: "What impressed me most was the quality of work. The mechanic not only fixed my immediate issue but also identified and fixed a potential problem. That's true professionalism!",
      author: "James Wilson",
      role: "Operations Director at LogiTech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      quote: "The app's interface is intuitive, and the ability to track your mechanic in real-time gives you peace of mind. FixMyRide has revolutionized car maintenance!",
      author: "Maria Garcia",
      role: "UX Designer at CreativeMinds",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      quote: "I was skeptical about mobile car repair services, but FixMyRide proved me wrong. Their mechanics are certified professionals who do quality work.",
      author: "Robert Taylor",
      role: "Financial Advisor at WealthFirst",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      quote: "The customer service is outstanding. They kept me informed throughout the process and followed up after the service. That's attention to detail!",
      author: "Sophie Anderson",
      role: "Content Strategist at MediaPro",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e"
    },
    {
      quote: "FixMyRide's preventive maintenance alerts have helped me avoid major car issues. Their proactive approach to car care is what every car owner needs.",
      author: "Thomas Brown",
      role: "Project Manager at BuildRight",
      image: "https://images.unsplash.com/photo-1506795660198-e95c6320213d"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block group">
            What Our Users Say
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
          </h2>
          <p className="text-white/80 transition-colors duration-300 group-hover:text-white">
            Real experiences from our satisfied customers
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-forest-light rounded-full flex items-center justify-center text-white 
                       hover:bg-mint hover:text-forest transition-all duration-300 
                       shadow-lg hover:shadow-mint/30 border border-white/10 hover:border-mint/30
                       group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === 0}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mint/0 to-mint/0 group-hover:from-mint/20 group-hover:to-mint/0 transition-all duration-300"></div>
              <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2 mx-4">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 3)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index * 3 
                      ? 'bg-mint scale-125' 
                      : 'bg-white/20 hover:bg-mint/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-forest-light rounded-full flex items-center justify-center text-white 
                       hover:bg-mint hover:text-forest transition-all duration-300 
                       shadow-lg hover:shadow-mint/30 border border-white/10 hover:border-mint/30
                       group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === testimonials.length - 3}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-mint/0 to-mint/0 group-hover:from-mint/20 group-hover:to-mint/0 transition-all duration-300"></div>
              <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-forest-light p-8 rounded-xl relative transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/20 hover:border hover:border-mint/30 group"
              >
                <Quote className="text-mint w-8 h-8 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <p className="text-white/90 mb-6 transition-colors duration-300 group-hover:text-white">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:ring-2 group-hover:ring-mint"
                />
                <div>
                    <p className="font-medium transition-colors duration-300 group-hover:text-mint">{testimonial.author}</p>
                    <p className="text-white/60 text-sm transition-colors duration-300 group-hover:text-white/80">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;