import React from "react";

//div that renders current state in upper right corner of us-page
const State = ({ currentState }) => {
    return(
        <React.Fragment>
         <h2 id="state-header">{currentState}</h2>
        </React.Fragment>
    )
}

export default State;