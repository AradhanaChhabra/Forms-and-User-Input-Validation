import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const inputRef = useRef();
  // for using once
  const [enteredName,setEnteredName] = useState('');
  // for storing values after every key stroke
  
  //VALIDATION
  const [isNameValid, setIsNameValid] = useState(false);//if set to true initially, might create a problem like in useEffect
  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    if (isNameValid)
      console.log("VALID NAME");//in case we might need to send a http request whenever name is valid 
  },[isNameValid])

  const nameInputHandler = event=> {
    setEnteredName(event.target.value);
    // Remove the error when input becomes valid (validationg after every keystroke)
    //we will use event.target.value instead of entered name as  state updtaes aren't scheduled by React
    //not processed immediately
    if (event.target.value.trim() !== "") {
      setIsNameValid(true);
    }
  }
  // gets event object by default when binded to the input

  // validate OR to show the error when input loses it's focus
  const onBlurHandler = () => {
    setInputTouched(true);
    if (enteredName.trim() === "") {
      setIsNameValid(false);
    }
  }

  const submitHandler =event => {
    event.preventDefault();
    // by default http request is sent to the server serving this website
    // and page will be relaoded, current states will be losed
    setInputTouched(true);
    if (enteredName.trim() === "") {
      setIsNameValid(false);
      return;
    }
    setIsNameValid(true);
    console.log(enteredName);
    const inputValue = inputRef.current.value;
    console.log(inputValue);
    // current property of the refs holds the value assigned to ref
    // pointer to the input element holded in current 
    
    //Resetting the value
    setEnteredName('');
    // inputRef.current.value = '';  WITH refs NOT IDEAL || DONOT MANIPULATE THE REAL DOM 
  }

  const nameInputInvalid = !isNameValid && inputTouched;
  const formClass = nameInputInvalid ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={submitHandler}>
      <div className={formClass}>
        <label htmlFor='name'>Your Name</label>
        <input ref={inputRef} type='text' id='name' onChange={nameInputHandler} value={enteredName} onBlur={onBlurHandler}/>
        {nameInputInvalid && <p className="error-text">Enter a valid name</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
