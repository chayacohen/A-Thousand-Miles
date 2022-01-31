# A-Thousand-Miles
[Link to the live site](https://a-thousand-miles.herokuapp.com/#/)
## Background and Overview 

A Thousand Miles is a roadtrip planning web application that allows users to plan a trip through interactively drawing on a map. Users can create custom itineraries and add their favorite attractions.

## How does it work?

A Thousand Miles' goal is to give the user an easy way to find attractions to visit when planning a road trip or vacation. Users will be able to create and account, log in, or sign in with a demo user. Once the user logs in, they will be prompted to create an itinerary for their trip. The user can then put in their starting address (defaulted to the address entered during sign up) and final destination. Users will then be able to draw a line on their map that represents the general path they would like to travel. Once the line is drawn, a list of tourist attraction location near the line will be available for the user to add to their itineray.

## Functionalitiy & MVP

#### User Auth & Splash

 - Users can create an account and enter their home address. Errors will be down when the user enters invalid information.

#### Profile

 - Users can see/edit their profile information, as well at their itineraries.
 - Users can delete or edit their itineraries.
 - Users can also delete the attractions in their itinerary.

#### Trip Planner

 - Users will be prompted to add a title and description for their itinerary.
 - Users then will be prompted to enter a starting and ending address.
 - User can then draw a path on the map.

#### Finding Attractions

 - Users can add attractions that appear along the path drawn.

1. User Profile (CRUD)
2. Maps 
3. Drawing on Map  
4. Itinerary (CRUD)
5. Groups (bonus)
6. Popular routes (bonus)

## Technologies

A Thousand Miles is a MERN-stack web application that also utilizes Google Map API. MERN handles all of the users data and visualization while Google Map API is responsible to fetching data necessary to create itineraries and attractions.

#### Google Map API
 - This web application utilizes Google Map API n order to auto-complete address, render maps, and fetch attraction locations.

#### MERN
 - This web application utilizes MongoDB, Express, React, and Node.js to store data in a non-relational database with documents and renders all visual components through a single page model using React.

- MongoDB
- Express 
- React
- Node.js 
- Javascript 
- HTML 
- CSS 
- Google MAPS/PLACES API 

## Code Snippets
``` Javascript
    receiveResults() {
        const promises = [];
        this.service = new google.maps.places.PlacesService(this.map.map);
        const increment = Math.floor(this.path.length / 15);
        for (let i = 1; i < this.path.length; i += (increment > 0 ? increment : 1)) {
            if (this.path[i])
                promises.push(new Promise((resolve, reject) => {
                    this.service.nearbySearch({
                        location: { lat: this.path[i].lat(), lng: this.path[i].lng() },
                        radius: 50000,
                        type: ['tourist_attraction'],
                    }, (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            this.setState({ totalResults: this.state.totalResults.concat(results) });
                            resolve();
                        }
                        else if (status) {
                            resolve();
                        }
                    });
                }))
        }
        return Promise.all(promises)
    }
```
- In the above code, in order to be able to wait for results from the Google Maps API, each call to the API was created as a promise. 
- Sequentially, the function returns a promise that resolves once all the promises resolve.
- This approach allows for the results to be rendered only once they are all returned from the API call. 


``` Javascript
addMapListeners() {
        this.map.map.addListener("mousedown", (e) => {
            this.clicked = !this.clicked;
        });

        this.drawListener = this.map.map.addListener("mousemove", e => {
            if (this.clicked && this.round) {
                this.addLatLng(e);
            }
        }); 

        this.map.poly.addListener("mouseup", (e) => {
            if (this.clicked) {
                this.clicked = false;
                this.round = false;
                this.path = this.map.poly.getPath().xd;
                this.map.poly.getPath().insertAt(0, this.state.start_pos);
                this.map.poly.getPath().insertAt((this.path.length), this.state.end_pos);
                this.path = this.map.poly.getPath().xd;
                this.setState({save: true}); 
            }
        });
    }
```

- The above code is responsible for interactively drawing a line on the map.
- The map listens for a mousedown event that activates a mousemove event listener.
- The mousemove event listener adds lat/lng points to the Google Maps Polyline based on the mouse's position on the map.
- The mouseup event listener, which is on the polyline, removes the mousemove event listener, adds the start position to the front of the line and the end position to the end of the line, ensuring a complete path from start to end. 

``` Javascript 
    handleMapBounds() {
            const bounds = new google.maps.LatLngBounds();
            const markers = Object.values(this.markerManager.markers);
            markers.forEach(marker => {
                bounds.extend(marker.position)
            });
            this.map.map.fitBounds(bounds);
        }
```

- The above code ensures that the map is positioned so all points (e.g. start and end address) are in view when the map is rendered.  



## Timeline & Group Breakdown 

### Day 1: 
  - User Auth/Splash Fontend Routes (Nick) [/] 
  - User profile (Brian) [/:id/profile]
  - Figuring out map draw / fetch attractions from map (Chaya)
  - User table / schema 

### Day 2: 
  - Map 
  - Drawing on Map 

### Day 3: 
  - Completing itinerary 
  - Updating and deleting itinerary 
  - Adding itinerary to profile page 

### Day 4: 
  - Wrap up 
  - (Bonus) Add groups feature 
