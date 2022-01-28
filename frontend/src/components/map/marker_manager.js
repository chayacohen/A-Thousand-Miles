const google = window.google;
class MarkerManager {

    constructor(map){
        this.map = map;
        this.markers = {};
        // this.addMarker = this.addMarker.bind(this); 
    }
    
    addMarker(position, icon) {
       const marker = new google.maps.Marker({
            position: position,
            map: this.map.map,
            icon: icon
            //add on click to go to that attraction on attraction list 
            // custom the markers 
            // hover to see the name 
        });
        if (typeof position.lat === 'function' ) {
            this.markers[position.lat()] = marker; 
        }
        else {
            this.markers[position.lat] = marker; 
        }
    }

    removeMarker(lat) {
        this.markers[lat].setMap(null);
        delete this.markers[lat];
    }
}


export default MarkerManager; 