
export let API_KEY = "";
export const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";
export let LANGUAGE = 'iw';

export default class GeoCodeService {
   static async handleUrl(url) {
        const response = await fetch(url).catch(error =>
            Promise.reject(new Error("Error fetching data"))
        );

        const json = await response.json().catch(() => {
            console.log("Error parsing server response");
            return Promise.reject(new Error("Error parsing server response"));
        });

        if (json.status === "OK") {
            console.log(json);
            return json;
        }
        console.log(`Server returned status code ${json.status}`, true);
        return Promise.reject(
            new Error(`Server returned status code ${json.status}`)
        );
    }

   static async fromLatLng(lat, lng) {
        if (!lat || !lng) {
            console.log("Provided coordinates are invalid", true);
            return Promise.reject(new Error("Provided coordinates are invalid"));
        }

        const latLng = `${lat},${lng}`;
        let url = `${GOOGLE_API}?latlng=${encodeURI(latLng)}`;

        url += `&key=${API_KEY}&language=${LANGUAGE}`;

        return this.handleUrl(url);
    }

    static async fromAddress(address) {
        if (!address) {
            console.log("Provided address is invalid", true);
            return Promise.reject(new Error("Provided address is invalid"));
        }

        let url = `${GOOGLE_API}?address=${encodeURI(address)}`;

        if (API_KEY) {
            url += `&key=${API_KEY}`;
        }

        return this.handleUrl(url);
    }
}