import React from 'react'
const Person = (props) => {
    return (
        <div id={props.person.id}>
             {props.person.name} {props.person.number} <button onClick={props.onSubmit}>delete</button>
        </div>
    )
}

export default Person