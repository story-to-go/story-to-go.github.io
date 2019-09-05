import L from 'leaflet';
import '../components/Icon/Icon.css'
export const TEXT = 'text';
export const WITH_MEDIA = 'with-media';
export default class Story {
    // title;
    // author;
    // year;
    // medium;
    // content;
    // tags;
    // address;
    // position;

    constructor(title, author, year, medium, content, tags, address, position, iconPath, imageURL){
        this.title = title;
        this.author = author;
        this.year = year;
        this.medium = medium;
        this.content = content;
        this.tags = tags;
        this.address = address;
        this.position = position;
        this.mediumType = TEXT;
        this.iconPath = iconPath;
        this.imageURL = imageURL;

        if((medium && medium !== '') || (imageURL && imageURL !== ''))
        {
            this.mediumType = WITH_MEDIA
        }
        this.icon = {
            iconUrl: iconPath,
            iconRetinaUrl: iconPath,
            iconAnchor: new L.Point(20, 20),
            popupAnchor:  new L.Point(0, 0),
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
            iconSize: new L.Point(40, 40),
            className: 'icon-'+ this.mediumType
        };

    }
}