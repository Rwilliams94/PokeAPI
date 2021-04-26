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
        // event.preventDefault();
        const userChange = {"listLength": list, "darkMode": dark};
        props.changeLimit(userChange)
    }

    console.log(dark);

    if (list === null) return <div>loading</div>

    const darkMode = context.user.darkMode;

    return (
        <div className="settingsMain">
            <div className="settingsBox">
                <h3>Change Your Settings</h3>
                <form className="settingsForm" onSubmit={handleOnSubmit}>
                
                    <label  className="settingsLabel" htmlFor="listLimit"><h3>List Length: </h3>
                    <input className="settingsInput"  type="number" id="listLimit" name="listLimit" onChange={handleChangeList} defaultValue={list}/>
                    </label>
                    
                    <label className="settingsLabel" htmlFor="darkMode"><h3>Dark Mode?</h3></label>
                    <label  className="switch" htmlFor="darkMode">
                    <input className="settingsInput" type="checkbox" id="darkMode" name="darkMode" onChange={handleChangeMode} defaultChecked={darkMode} />
                    <span className="slider"></span>
                    </label>

                    <button className={`settingsButton ${darkMode ? "dark-mode" : "light-mode"} `}><h3>Save</h3></button>
                </form>
            </div>
        </div>
    )
}

export default Settings
