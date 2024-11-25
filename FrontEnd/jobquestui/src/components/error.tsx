import React, {useState, useEffect} from 'react';


const Error = () =>{
    const[errorState, setErrorState] = useState();

    return(
        <div>
            An error has been encountered. Please try again!
        </div>
    )
}

export default Error;