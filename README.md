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
