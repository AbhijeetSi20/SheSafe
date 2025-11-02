// components/map/MapComponent.tsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";
const OSRM_ROUTE = "https://router.project-osrm.org/route/v1/driving";

type LatLng = [number, number];

interface Props {
  origin: string;
  destination: string;
  /** Increment this (e.g. Date.now()) to force re-geocode + route draw */
  routeTrigger?: number;
  /** whether map should center on user location when available */
  followUser?: boolean;
}

const MapComponent: React.FC<Props> = ({ origin, destination, routeTrigger, followUser = true }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  const userMarkerRef = useRef<L.Marker | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([28.6139, 77.2090], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }

    // initial user location & watch
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latlng: LatLng = [pos.coords.latitude, pos.coords.longitude];
          placeOrMoveUserMarker(latlng);
          if (followUser && mapInstance.current) mapInstance.current.setView(latlng, 15);
        },
        (err) => console.warn("Initial geolocation error:", err),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );

      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const latlng: LatLng = [pos.coords.latitude, pos.coords.longitude];
          placeOrMoveUserMarker(latlng);
          if (followUser && mapInstance.current) mapInstance.current.panTo(latlng);
        },
        (err) => console.warn("watchPosition error:", err),
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }

    return () => {
      // cleanup
      if (watchIdRef.current !== null && "geolocation" in navigator) {
        try {
          navigator.geolocation.clearWatch(watchIdRef.current);
        } catch (e) {
          // ignore
        }
      }
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper: create or move user marker
  function placeOrMoveUserMarker(latlng: LatLng) {
    if (!mapInstance.current) return;
    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker(latlng, { title: "You" }).addTo(mapInstance.current);
      userMarkerRef.current.bindPopup("You are here");
    } else {
      userMarkerRef.current.setLatLng(latlng);
    }
  }

  // Geocode using Nominatim (returns first result as [lat, lon] or null)
  async function geocodeAddress(address: string | null): Promise<LatLng | null> {
    if (!address || address.trim().length === 0) return null;
    const q = encodeURIComponent(address + " India"); // helps disambiguate in many cases
    const url = `${NOMINATIM_BASE}?format=json&limit=1&q=${q}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "SheSafe/1.0 (contact@example.com)" },
      });
      if (!res.ok) throw new Error("Failed to geocode");
      const data = await res.json();
      if (!data || data.length === 0) return null;
      const item = data[0];
      return [parseFloat(item.lat), parseFloat(item.lon)];
    } catch (e) {
      console.error("geocodeAddress error", e);
      return null;
    }
  }

  // Draw route between two coords using OSRM and add start/dest markers
  async function drawRoute(start: LatLng, dest: LatLng) {
    if (!mapInstance.current) return;

    // remove previous
    routeLayerRef.current?.remove();
    startMarkerRef.current?.remove();
    destMarkerRef.current?.remove();

    startMarkerRef.current = L.marker(start).addTo(mapInstance.current).bindPopup("Start").openPopup();
    destMarkerRef.current = L.marker(dest).addTo(mapInstance.current).bindPopup("Destination");

    const coords = `${start[1]},${start[0]};${dest[1]},${dest[0]}`; // lon,lat
    const url = `${OSRM_ROUTE}/${coords}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("OSRM fetch failed");
      const json = await res.json();
      if (json.routes && json.routes.length > 0) {
        const coordsGeo: number[][] = json.routes[0].geometry.coordinates; // [ [lon,lat], ... ]
        const latlngs: LatLng[] = coordsGeo.map((c) => [c[1], c[0]]);
        routeLayerRef.current = L.polyline(latlngs as L.LatLngExpression[], {
          color: "#8a2be2",
          weight: 5,
          opacity: 0.8,
        }).addTo(mapInstance.current);

        // fit bounds
        mapInstance.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [50, 50] });
      } else {
        console.warn("No route returned from OSRM", json);
        alert("No route found for the provided addresses.");
      }
    } catch (e) {
      console.error("drawRoute error", e);
      alert("Failed to fetch route. Check console for details.");
    }
  }

  // Effect: when origin/destination or routeTrigger changes, geocode & draw
  useEffect(() => {
    let mounted = true;
    async function run() {
      if (!origin || !destination) return;
      // geocode both
      const [s, d] = await Promise.all([geocodeAddress(origin), geocodeAddress(destination)]);
      if (!mounted) return;
      if (!s) {
        alert("Start address not found. Try a more specific address.");
        return;
      }
      if (!d) {
        alert("Destination address not found. Try a more specific address.");
        return;
      }
      await drawRoute(s, d);
    }
    run();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, routeTrigger]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
