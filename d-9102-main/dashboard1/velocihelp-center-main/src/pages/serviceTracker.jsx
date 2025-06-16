import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrashIcon, Phone, Star, CheckCircle, Clock, MapPin, Car, Wrench } from "lucide-react";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import RoutingMachine from "./Routing";
// Custom icon
const mechanicIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/8121/8121402.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

const ServiceTracker = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mechanicPos, setMechanicPos] = useState([16.5520, 81.5325]); // starting point
  const [eta, setEta] = useState("15 min");
  const [distance, setDistance] = useState("2.3 km");

  const location = useLocation();
  const navigate = useNavigate();

  const mechanicInfo = {
    name: "Alex Johnson",
    rating: 4.8,
    totalReviews: 156,
    isVerified: true,
  };

  const serviceInfo = {
    serviceType: "Flat Tire Replacement",
    vehicleInfo: {
      make: "Toyota",
      model: "Camry",
      year: 2019,
      licensePlate: "CAL123",
    },
    requestTime: "Today, 10:45 AM",
  };

  // Set user location
  useEffect(() => {
    if (location.state?.latitude && location.state?.longitude) {
      setLatitude(location.state.latitude);
      setLongitude(location.state.longitude);
      setUserLocation([location.state.latitude, location.state.longitude]);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to get location. Please enable GPS.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  // Simulate mechanic movement
  useEffect(() => {
    let interval;
    if (userLocation) {
      interval = setInterval(() => {
        setMechanicPos((prev) => {
          const [lat, lng] = prev;
          const newLat = lat + (userLocation[0] - lat) * 0.05;
          const newLng = lng + (userLocation[1] - lng) * 0.05;

          // update ETA & Distance
          const d = Math.sqrt(
            Math.pow(userLocation[0] - newLat, 2) + Math.pow(userLocation[1] - newLng, 2)
          );
          setDistance(`${(d * 111).toFixed(2)} km`);
          setEta(`${Math.ceil(d * 60)} min`);

          if (d < 0.0005) {
            clearInterval(interval);
            toast("Mechanic has arrived!", { description: "Alex is near your location." });
          }

          return [newLat, newLng];
        });
      }, 3000); 
      
    }

    return () => clearInterval(interval);
  }, [userLocation]);

  const handleCancel = () => {
    toast("Service cancelled", {
      description: "Your service request has been cancelled successfully.",
    });
    navigate("/dashboard/request");

  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        {userLocation && (
          <MapContainer center={userLocation} zoom={15} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>
            <Marker position={mechanicPos} icon={mechanicIcon}>
              <Popup>{mechanicInfo.name} (Mechanic)</Popup>
            </Marker>

            {/* 🚀 Routing Component */}
            <RoutingMachine userLocation={userLocation} mechanicPos={mechanicPos} />
          </MapContainer>
        )}
      </div>


      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl shadow-lg bg-white"
        initial={{ y: "60%" }}
        animate={{ y: isExpanded ? "0%" : "60%" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        onDragEnd={(event, info) => {
          if (info.point.y > 600) setIsExpanded(false);
          else setIsExpanded(true);
        }}
      >
        <div className="flex justify-center items-center p-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
        </div>

        <div className="px-4 pb-4 space-y-4">
          <div className="flex justify-center">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse">
              Mechanic on the way
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xl font-medium text-gray-600">
                  {mechanicInfo.name.charAt(0)}
                </span>
              </div>
              {mechanicInfo.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                  <CheckCircle size={16} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-black">{mechanicInfo.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{mechanicInfo.rating}</span>
                <span className="mx-1.5">·</span>
                <span>{mechanicInfo.totalReviews} reviews</span>
              </div>
            </div>

            <a
              href="tel:8121243574"
              className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Phone size={20} />
            </a>
          </div>

          <div className="px-4 py-3 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-primary/10 rounded-full text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Arrives in</h4>
                  <p className="text-black font-bold">{eta}</p>
                </div>
              </div>
              <div className="text-right">
                <h4 className="text-sm text-gray-600">Distance</h4>
                <p className="text-black font-bold">{distance}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center text-sm">
              <MapPin size={16} className="text-gray-600 mr-1.5" />
              <span className="text-gray-600 truncate">Your current location</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4">
              <h3 className="text-sm text-gray-600 mb-1">Service Details</h3>
              <div className="flex items-center">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary mr-3">
                  <Wrench size={18} />
                </div>
                <span className="font-medium text-black">{serviceInfo.serviceType}</span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary mr-3">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Requested at</p>
                  <p className="font-medium text-black">{serviceInfo.requestTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="text-black flex-1 px-4 py-2 border border-gray-200 rounded-md font-medium hover:bg-gray-50 transition-colors"
              onClick={() => {
                toast("Message sent", {
                  description: "Your message has been sent to Alex",
                });
              }}
            >
              Message
            </button>
            <button
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              onClick={handleCancel}
            >
              <TrashIcon size={16} />
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceTracker;  
