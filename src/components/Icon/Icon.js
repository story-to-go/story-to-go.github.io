import L from 'leaflet';
import './Icon.css'

const icon = new L.Icon({
    iconUrl: 'spots/grey/spot 8.svg',
    iconRetinaUrl: 'spots/grey/spot 8.svg',
    iconAnchor: new L.Point(0, 0),
    popupAnchor:  new L.Point(15, 15),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
     className: 'icon-my-location'
});




export default icon;