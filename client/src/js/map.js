import { getBanks } from "./requests.js"
import ymaps from 'ymaps'

export const createMap = async () => {
    const data = await getBanks()
    const res = data.payload
    const map = document.createElement('div')
    map.id = 'map'
    map.style.height = '728px'
    map.style.marginBottom = '50px'
    getGoogleMap(map, res)
    return map
}

const getGoogleMap = async (map, marMapArray) => {
    const maps = await ymaps.load();
    let myMap = new maps.Map(map, {
      center: [55.76, 37.64],
      zoom: 10,
    });
  
    marMapArray.map((el) => {
      let myGeoObject = new maps.GeoObject({
        geometry: {
          coordinates: [el.lat, el.lon],
          type: 'Point',
        },
      });
      return myMap.geoObjects.add(myGeoObject);
    });
  };