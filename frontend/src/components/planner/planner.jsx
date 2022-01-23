import React from 'react';
import '../../assets/css/planner.scss';


class Planner extends React.Component{
    render(){
        return(
            <div className='planner-container'>
                <div className='planner-edit'>Edit form here</div>
                <div className='planner-main-container'>
                    <h1 className='planner-map'>insert map</h1>
                    <h2 className='planner-attractions'>Put Attractions index here</h2>
                </div>
           </div>
    )}     
}

export default Planner;