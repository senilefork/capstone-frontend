import React from "react";

const State = ({ currentState }) => {
    return(
        <React.Fragment>
         <h2 id="state-header">{currentState}</h2>
        </React.Fragment>
    )
}

export default State;