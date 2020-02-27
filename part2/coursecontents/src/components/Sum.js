import React from 'react'

const Sum = ( {parts} ) => {
    let sum = parts.reduce( (sum, i) => sum + i.exercises, 0)
    return (
        <div>
            <b>total of {sum} exercises</b>
        </div>
    )
}

export default Sum;