import Leaflet from 'leaflet';

import mapMarkerImg from '../assets/img/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [54, 64],
  iconAnchor: [24, 58],
  popupAnchor: [0, -54],
});

export default mapIcon;
