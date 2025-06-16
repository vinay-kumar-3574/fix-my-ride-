import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";  // Import Leaflet

import "leaflet-routing-machine";

const RoutingMachine = ({ userLocation, mechanicPos }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !mechanicPos) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(mechanicPos[0], mechanicPos[1]),
        L.latLng(userLocation[0], userLocation[1]),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null, // hide routing markers
      show: false, // 💡 this hides the directions/itinerary panel
    }).addTo(map);

    return () => map.removeControl(routingControl); // cleanup
  }, [map, userLocation, mechanicPos]);

  return null;
};

export default RoutingMachine;
