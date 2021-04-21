import React, { useState } from 'react';



const Settings = (props) => {

    const [list, setList] = useState(props.listLimit)

    function handleChange (event) {
        const value = event.target.value
        setList(value)
        
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        props.changeLimit(list)
    }

    console.log(list);


    return (
        <div>
            <h3>Change Your Settings</h3>
            <form onSubmit={handleOnSubmit}>
               
                <label htmlFor="listLimit">Change the list length</label>
                <input type="number" id="listLimit" name="listLimit" onChange={handleChange} defaultValue={list}/>
                
                <label htmlFor="darkMode">Dark Mode? </label>
                <input type="checkbox" id="darkMode" name="darkMode"/>

                <button>save</button>
            </form>
        </div>
    )
}

export default Settings
