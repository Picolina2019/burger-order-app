import React from 'react';
import s from './BuildControl.module.css'


const BuildControl = (props)=>{
    return (
      <div className={s.BuildControl}>
        <div className={s.Label}>{props.label}</div>
        <button className={s.Less} disabled={props.disabled}
         onClick={props.deleted}>less</button>
        <button className={s.More} onClick={props.added}>more</button>
      </div>
    );
    
}
export default BuildControl;