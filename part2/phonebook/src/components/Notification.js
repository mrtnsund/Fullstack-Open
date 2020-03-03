import React from 'react'

const Notification = ({message}) => {
    if (message === null){
        return null;
    } else if (message.charAt(0) === 'A' || message.charAt(0) === 'C'){
        return (
        <div className="add">
             {message}
        </div> 
        )
    } 
    return (
        <div className="delete">
            {message}
        </div>
    )
}

export default Notification