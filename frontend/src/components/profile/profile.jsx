import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itineraries: []
        }
    }
    
    componentWillMount() {
        // console.log(this.props.currentUser.id)
        // this.props.fetchUserItineraries(this.props.currentUser.id);
    }

    // componentWillReceiveProps(newState) {
    //     this.setState({ itineraries: newState.itineraries });
    // }   
    
    render() {
        if (this.state.itineraries.length === 0) {
          return (<div>This user has no travel plans!</div>)
        } else {
          return (
            <div>
              <h2>All of your upcoming adventures</h2>
              {/* {this.state.itineraries.map(tweet => (
                <TweetBox key={itinerary._id} text={itinerary.text} />
              ))} */}
            </div>
          );
        }
      }
}

export default Profile;
