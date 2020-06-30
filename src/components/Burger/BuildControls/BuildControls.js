import React from 'react';
import s from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
        {label:'Salad',type:'salad'},
        {label:'Bacon',type:'bacon'},
        {label:'Cheese',type:'cheese'},
        {label:'Meat',type:'meat'}
    ]
const BuildControls = (props)=>(
        <div className={s.BuildControls}>
            <p>Current price: <b>{props.price.toFixed(2)}</b></p>
            { controls.map(ctrl=>(
                <BuildControl 
                key={ctrl.label}
                 label={ctrl.label}
                 added={()=> props.addIngredient(ctrl.type)}
                 deleted={()=> props.removeIngredient(ctrl.type)}
                 disabled={props.disabled[ctrl.type]}
                    />
            ))}
            <br/>
            <button className={s.OrderButton}
            disabled={!props.purchasable}
            onClick={props.onPurchase}
            >{props.isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}</button>

        </div>
    )

export default BuildControls;