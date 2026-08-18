//Nous gérons ici le Map pour carte interactive 
// (mentionnée pour la géolocalisation des agences/véhicules via Google Maps)

// Carte interactive — components/Map (Google Maps API, §2.4)
import { useEffect, useRef, useState } from "react";
import { Loader } from "./Loader";
import { env } from "@/config/env";

declare global {
  interface Window {
    google?: typeof google;
  }
  namespace google.maps {
    class Map {
      constructor(el: HTMLElement, options: { center: { lat: number; lng: number }; zoom: number });
    }
    class Marker {
      constructor(options: { position: { lat: number; lng: number }; map: Map; title?: string });
    }
  }
}

let scriptLoadingPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (window.google?.maps) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Échec du chargement de Google Maps."));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

export type MapProps = {
  latitude: number;
  longitude: number;
  zoom: number;
  markerLabel?: string;
};

export function Map({ latitude, longitude, zoom, markerLabel }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!env.googleMapsApiKey) {
      setStatus("error");
      return;
    }

    let cancelled = false;

    loadGoogleMapsScript(env.googleMapsApiKey)
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const map = new window.google!.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom,
        });
        new window.google!.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: markerLabel,
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, zoom, markerLabel]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl border border-asphalt-700">
      <div ref={mapRef} className="absolute inset-0" />

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-asphalt-800">
          <Loader label="Chargement de la carte…" />
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-asphalt-800 text-sm text-sand-400">
          Carte indisponible pour le moment.
        </div>
      )}
    </div>
  );
}