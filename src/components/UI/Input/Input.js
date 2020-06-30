import React from 'react';
import c from './Input.module.css';

export const Input = (props) => {
    let inputElement = null;
    const inputClasses =[c.InputElement];
     if (props.invalid && props.shouldValidate && props.touched){
         inputClasses.push(c.Invalid)
     }

    switch(props.elementType){
        case('input'):
        inputElement = <input onChange={props.changed}
         className={inputClasses.join(' ')} 
         {...props.elementConfig} value={props.value}/>;
        break;
        case('textarea'):
        inputElement = <textarea onChange={props.changed} 
         className={inputClasses.join(' ')}  {...props.elementConfig}
          value={props.value}/>;
        break;
        case('select'):
        inputElement =(
          <select onChange={props.changed} 
          className={inputClasses.join(' ')}
           value={props.value}>
           {props.elementConfig.options.map(option=>(
               <option key={option.value} value={option.value}>
                   {option.displayValue}
               </option>
              
           ))} 
           </select>
        )
        break;
        default:
            inputElement = <input className={c.InputElement}  {...props.elementConfig} value={props.value}/>;
    };
    let validationError = null;
if (props.invalid && props.touched) {
    validationError = <p>Please,enter a valid value!</p>;
}
 
    return (
        <div className={c.Input} >
            <label className={c.Label}>{props.label}</label>
            {inputElement}
            <span className={c.error}>{validationError}</span>
        </div>
    )
}
