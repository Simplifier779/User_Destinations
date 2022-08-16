import React, { useReducer,useEffect } from 'react';

import './Input.css';

const inputReducer = (state, action) => { //takes the current state and performs an action and returns it.
  switch (action.type) { //here we always need to return a new state
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val,action.validators)
      };
      case 'TOUCH':
      return{
        ...state,
        isTouched:true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {  //{reducer,initial};reducer receives the fuction which performs a action that is dispached ; it receives the current state re renders and returns it.
    value: '',
    isValid: false,
    isTouched:false
  });
// [current state/input state , dispatch(function)]
  useEffect(()=>{props.onInput(props.id,inputState.value,inputState.isValid)},[props.id,inputState.value,inputState.isValid,onInput]);

  const changeHandler = event => {
    dispatch({ type: 'CHANGE', val: event.target.value,validators:props.validators });
  };
  const touchHandler=()=>{
    dispatch({type:'TOUCH'});
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;