
import { Loader } from "@googlemaps/js-api-loader"

export let map;
export const loader = new Loader({
  apiKey: "AIzaSyDfuVx0OlVZMtM6OaYTdtBSnIKG8nG7AYE",
  version: "weekly",
});

export async function initGoogleMapIn(id) {
  await loader.load(); // Wait for the Google Maps API to be loaded
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById(id), {
    center: { lat: 39.64956833885891, lng: 142.00029798666935 },
    zoom: 6.4,
    mapId: "b683f895f3a47c0a",
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
    mapTypeControl: false,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
  });
}



