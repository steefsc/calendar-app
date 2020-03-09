import React from 'react'

import {FaEdit, FaTrash, FaSun, FaCloud, FaCloudRain} from 'react-icons/fa';
import Classes from './EventListElement.module.css'



const eventListElement = (props) => {
    const getWheater = (weather) => {
        switch (weather) {
            case 'Clear' : 
                return (
                    <FaSun color="ffae42"/>
                );
            case 'Rain' : 
                return (
                    <FaCloudRain color="#60A3D4"/>
                );
            default: 
                return (
                    <FaCloud color="#38A3D4"/>
                );
        } 
    }
    return (
        <div className={Classes.EventElement}>
                    <div className={Classes.EventElement} style={{backgroundColor: props.event.color }} >
                        <div>{props.event.hour}</div>
                        <div className={Classes.EventDescription} style={{backgroundColor: props.event.color }} >{props.event.description}</div>
                        <div>{getWheater(props.event.weather)}</div>
                    </div>    
                    <div className={Classes.EventButtons}>
                        <div onClick={props.onClickEdit}>
                            <FaEdit color="#2F74B5"/>
                        </div>
                        <div onClick={props.onClickDelete}>
                            <FaTrash color="#DA3E06"/>
                        </div>
                    </div>
                </div>
    )
}

export default eventListElement;