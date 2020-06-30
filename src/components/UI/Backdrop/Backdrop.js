import React from 'react'
import s from './Backdrop.module.css';


export const Backdrop = (props) => {
    return (
        props.show ? 
        <div className={s.Backdrop} onClick={props.clicked}>
            
        </div>: null
    )
}
