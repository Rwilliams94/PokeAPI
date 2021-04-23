import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../Components/Context/UserContext';
import '../Styles/Setting.css'



const Settings = (props) => {   
    const context = useContext(UserContext)

    const [list, setList] = useState(null)
    const [dark, setDark] = useState(null)

    useEffect(() => {
        setList(props.listLimit)
        setDark(context.user.darkMode)
    }, [props.listLimit, context])

    function handleChangeList (event) {
        const value = event.target.value
        setList(value)
        
    }

    function handleChangeMode (event) {
        const value = event.target.checked
        setDark(value)
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        const userChange = {"listLength": list, "darkMode": dark};
        props.changeLimit(userChange)
    }

    console.log(dark);

    if (list === null) return <div>loading</div>

    return (
        <div className="settingsMain">
            <div className="settingsBox">
                <h3>Change Your Settings</h3>
                <form className="settingsForm" onSubmit={handleOnSubmit}>
                
                    <label  className="settingsLabel" htmlFor="listLimit">Change the list length</label>
                    <input className="settingsInput"  type="number" id="listLimit" name="listLimit" onChange={handleChangeList} defaultValue={list}/>
                    
                    <label  className="settingsLabel" htmlFor="darkMode">Dark Mode? </label>
                    <input className="settingsInput" type="checkbox" id="darkMode" name="darkMode" onChange={handleChangeMode} checked={`${dark ? true : false}`} />

                    <button className="settingsButton">save</button>
                </form>
            </div>
        </div>
    )
}

export default Settings
