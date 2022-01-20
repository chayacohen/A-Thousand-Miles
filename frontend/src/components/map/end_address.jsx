import React from "react";

class EndAddress extends React.Component {


    render() {
        return (
            <div style={{ height: "100vh", width: "100vw" }} className="starting-map">
                <div className="address-input">
                    <input id="autocomplete" placeholder='Enter starting point' type="text" className="address-input" />
                </div>
                <div className="map-container" style={{ width: "80vw", height: "80vh" }}>
                    <div className="map" ref={map => this.mapNode = map} style={{ width: "100%", height: "100%" }}></div>
                </div>
                <Link to="/map/2">Choose End Point</Link>
            </div>
        )
    }
}

export default EndAddress; 