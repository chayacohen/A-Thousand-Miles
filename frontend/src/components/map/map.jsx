const google = window.google;
class Map {
    constructor(mapNode) {
        this.mapNode = mapNode;
        this.clicked = false;
        this.round = true;
    }

    instantiateMap() {
        const mapOptions = {
            center: { lat: 38.0902, lng: -96.5129 },
            zoom: 4.7,
            draggable: false
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);
        const lineSymbol = {
            path: "M 0,-1 0,1",
            strokeOpacity: 1,
            scale: 4,
        };
        this.poly = new google.maps.Polyline({
            strokeColor: "#000000",
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: "0",
                repeat: "20px"
            }]
        });

        this.poly.setMap(this.map);

        this.poly.setVisible(true);
    }
}


export default Map; 