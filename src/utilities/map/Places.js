import { loader } from "./Google";

let placesService;

async function initPlaces() {
    await loader.load();
    if (placesService) return;
    
    const { PlacesService } = await google.maps.importLibrary("places");
    placesService = new PlacesService(map);
}

export async function queryGoogleAPIPlaces(query, count = 1) {  
    await initPlaces();

    const request = {
      query: query,
      fields: ["name", "geometry"],
      language: "en-US",
      region: "jp",
    };
  
    try {
      const response = await new Promise((resolve, reject) => {
        placesService.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results.slice(0, count));
          } else {
            reject(new Error("Places API Error: " + status));
          }
        });
      });
  
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
}