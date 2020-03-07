import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                        name: <input value={props.valueName} onChange={props.onChangeName} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                        number: <input value={props.valueNumber} onChange={props.onChangeNumber} />
                        </td>
                    </tr>
                </tbody>
                </table>
                <button type="submit">add</button>            
            </form>
        </div>
    
    )
}

export default PersonForm