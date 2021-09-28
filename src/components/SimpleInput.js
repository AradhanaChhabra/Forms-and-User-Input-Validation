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
  }
  // gets event object by default when binded to the input

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
        <input ref={inputRef} type='text' id='name' onChange={nameInputHandler} value={enteredName} />
        {nameInputInvalid && <p>Enter a valid name</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
