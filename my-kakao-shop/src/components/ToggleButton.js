import React, {useEffect, useState} from 'react';

const ToggleButton = ({isToggled, setIsToggled}) => {

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    useEffect(() => {
    }, [isToggled])


    return (
        <button onClick={handleToggle} className={"toggle-button " + `${isToggled ? "active":""}`}>
            {isToggled ? 'ON' : 'OFF'}
        </button>
    );
}

export default ToggleButton;