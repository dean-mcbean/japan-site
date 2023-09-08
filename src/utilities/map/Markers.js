import { map, loader } from "./Google";

async function displayMarker(location, options = {}) {
    await loader.load();
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    
    const pinOptions = {
      background: "#e1466e",
      glyphColor: "#fff",
      borderColor: "#c52750",
      scale: 1
    };
  
    if (options.type == 'accommodation') { 
      const glyphImg = document.createElement("img");
      glyphImg.src = "https://joypea.app:3000/img/home.png";
      glyphImg.width = 14;
      glyphImg.height = 14;
  
      pinOptions.glyph = glyphImg;
      pinOptions.background = "#ab7e6c";
      pinOptions.borderColor = "#000";
  
    } else if (options.type == 'pin') {
      pinOptions.glyph = "";
      pinOptions.scale = 0.5;
  
    }

    if (options.color) {
        pinOptions.background = options.color;
        pinOptions.borderColor = "#000";
    }
  
    const pinScaled = new PinElement(pinOptions);
    const markerView = new AdvancedMarkerElement({
      map,
      position: location,
      title: options.name,
      content: pinScaled.element,
    });
    console.log(pinOptions)
  
    return markerView;
}
  
  
  
let accommodationMarker = null;
export async function showAccommodation(item) {
    await loader.load();
    if (accommodationMarker) {
      accommodationMarker.setMap(null);
    }
    await displayMarker(item.place.geometry.location, {
      name: item.place.name,
      type: 'accommodation',
      color: item.color
    });
}
  
let placeMakers = {};
export async function focusItem(item, id) {
    await loader.load();
    if (item.place) {
        if (placeMakers[id]) {
            placeMakers[id].setMap(null);
        }
        placeMakers[id] = await displayMarker(place.geometry.location, {
            name: place.name
        });
        map.setCenter(place.geometry.location);
    }
}
  
export async function pinItem(item) {
    await loader.load();
    if (item.place) {
        await displayMarker(item.place.geometry.location, {
          name: item.place.name,
          type: "pin",
          color: item.color
        });
    }
}