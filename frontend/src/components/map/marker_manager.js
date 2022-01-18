class MarkerManager {

    constructor(map){
        this.map = map;
        this.markers = [];
        // this.addMarker = this.addMarker.bind(this); 
    }
    
    addMarker(position) {
       const marker = new google.maps.Marker({
            position: position,
            map: this.map.map,
        });
        this.markers.push(marker); 
    }
}


export default MarkerManager; 