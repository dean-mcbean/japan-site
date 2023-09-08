import { uniqueColor } from "./Colors";
import { queryGoogleAPIPlaces } from "./map/Places";


// JSON
async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status == 404) 
          console.error('404 Recieved');
          return null
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return null;
    }
}


// SCHEDULE
async function processSchedule(raw_data = []) {
  const out = [];
  var accommodation;
  var previous_day = null;
  var current_color = 0;

  async function createCheckout() {
      const out = {
          type: 'accommodation-checkout',
          title: "Checkout",
          start_time: accommodation.end_time,
          start_date: accommodation.end_date
      }
      if (accommodation.location) {
          out.place = (await queryPlaces(accommodation.location))[0];
      }
      if (out.start_date != previous_day) {
          previous_day = out.start_date;
          current_color = uniqueColor(); 
      }
      out.color = current_color;
      accommodation = undefined;
      return out;
  }

  for (var item of raw_data) {
      if (accommodation !== undefined && item.type != 'activity') {
          out.push(await createCheckout());
      }
      if (item.location) {
          item.place = (await queryPlaces(item.location))[0];
      }
      if (item.start_date != previous_day) {
          previous_day = item.start_date;
          current_color = uniqueColor(); 
      }
      item.color = current_color;
      out.push(item);
      if (item.type == 'accommodation') {
          accommodation = item;
      }
  }
  if (accommodation !== undefined) {
      out.push(await createCheckout());
  }
  console.log("OUT", out)
  return out
}

export async function loadSchedule() {
    const raw_schedule = await loadJSON("https://joypea.app:3000/schedule")
    return await processSchedule(raw_schedule);
}



// PLACES
export async function queryPlaces(query, count = 1) {
  const cached_place = await loadJSON("https://joypea.app:3000/places?query=" + query)
  if (cached_place) {
    console.log('cached', query, cached_place)
    return cached_place
  }
  const places = await queryGoogleAPIPlaces(query, count)
  if (places) {
    console.log('uncached', query, cached_place, places)
    await fetch("https://joypea.app:3000/places?query=" + query, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(places),
    })
  }
  return places
}