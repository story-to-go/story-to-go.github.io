import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { geolocated } from "react-geolocated";
import icon from '../Icon/Icon';
import './StoryToGoMap.css'
import L from 'leaflet';
import StoryView from "../StoryView/StoryView";
import Loader from 'react-loader-spinner'
import GeoCodeService from '../GoogleMapsService/GeoCodeService';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class StoryToGoMap extends React.Component {


    constructor(props) {
        super(props);

        let lat = 31.9;
        let lng = 34.6;

        this.toggleAddStory = this.props.toggleAddStory;
        this.onStorySelected= this.props.onStorySelected;

        if(this.props.coords){
            lat = this.props.coords.latitude;
            lng = this.props.coords.longitude;
        }
        this.state = {
            lat: lat,
            lng: lng,
            zoom: 17,
            stories: this.props.stories,
            popUpOpen: false,
            loading: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.coords != null) {
            let lat = nextProps.coords.latitude;
            let lng = nextProps.coords.longitude;
            let zoom = 17;
            let stories = nextProps.stories;
            this.setState({lat, lng, zoom, stories});
        }
    }

    onContextMenu(event){
        //event.latlng;
        GeoCodeService.fromLatLng(event.latlng.lat, event.latlng.lng).then(
            response => {
                const address = response.results[0].formatted_address;
                this.toggleAddStory(address, event.latlng);
                console.log(address);
            },
            error => {
                console.error(error);
            }
        );

    }

    toggleBlur(){
        let open = !this.state.popUpOpen;
        this.setState({popUpOpen: open});
    }
    onPopup(story)
    {
        this.toggleBlur();
        this.onStorySelected(story);
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        // let mapStyle = this.state.popUpOpen ? { width:'100%', height:'100%', filter: 'blur(4px)',
        //          } : {};

        const wider = (story) => ' wider';
        return(
            !this.props.isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : !this.props.isGeolocationEnabled ? (
                <div>Geolocation is not enabled</div>
            ) :  this.props.coords && !this.state.loading ? ( //this.props.coords

            <Map center={position} zoom={this.state.zoom}
                 className={"leaflet-container"}
                 onContextMenu={(event) => this.onContextMenu(event)}
                 onViewportChanged={() => console.log(this.state.zoom)}
                 whenReady = {() => this.setState({loading: false})}
            >

                <TileLayer className={'tile'}
                    url= "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                           opacity={this.state.popUpOpen ? 0.2 : 1}
                />
                <Marker
                    position={position} radius={20} icon={icon}>
                    <Popup><b>אתה נמצא כאן</b></Popup>
                </Marker>

                {this.state.stories.map((story, index) =>
                    <Marker key={index} position={story.position} icon={new L.Icon(story.icon)}
                            onClick={() => this.onPopup(story)}
                    >
                        <Popup className={'marker' + wider(story)} onOpen={() =>  this.toggleBlur()} onClose={() =>  this.toggleBlur()}>
                            <StoryView className={wider(story)} story={story}/>
                        </Popup>
                    </Marker>
                )}
            </Map>

        ): (
            <div className={'loaderContainer'}>
                <div className={'loader'}>
                <Loader  type="RevolvingDot"
                        color="#2D8FC7"
                        height={100}
                        width={100}
                />
                <h2>ממתין לסיפורים...</h2>
                </div>
            </div>

            ));
    }
}
//{story.title}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 50000,
})(StoryToGoMap);

