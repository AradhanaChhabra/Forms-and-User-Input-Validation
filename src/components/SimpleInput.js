import {useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  // for storing values after every key stroke
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  
  //VALIDATION
  const [inputTouched, setInputTouched] = useState(false);

  const isNameValid = !(enteredName.trim() === "");//since component will be re-rendered after every keystroke
  const nameInputInvalid = !isNameValid && inputTouched;

  const isEmailValid = enteredEmail.includes('@');
  const emailInputInvalid = !isEmailValid && enteredEmailTouched;

  let isFormValid = false;
  if(isNameValid && isEmailValid)
    isFormValid = true;

  const nameInputHandler = event => {
    setEnteredName(event.target.value);
  }
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  // gets event object by default when binded to the input

  // validate OR to show the error when input loses it's focus
  const onBlurHandler = () => {
    setInputTouched(true);
  }
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = event => {
    event.preventDefault();
    // by default http request is sent to the server serving this website
    // and page will be relaoded, current states will be losed
    setInputTouched(true);
    if (!isNameValid)
      return;
    console.log(enteredName);
    // current property of the refs holds the value assigned to ref
    // pointer to the input element holded in current 
    
    //Resetting the value
    setEnteredName('');
    setInputTouched(false);
    // inputRef.current.value = '';  WITH refs NOT IDEAL || DONOT MANIPULATE THE REAL DOM 
    setEnteredEmail('');
    setEnteredEmailTouched(false);
  }
  
  const nameInputClass = nameInputInvalid ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputInvalid? 'form-control invalid': 'form-control';
  
    return (
      <form onSubmit={submitHandler}>
        <div className={nameInputClass}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' onChange={nameInputHandler} value={enteredName} onBlur={onBlurHandler}/>
          {nameInputInvalid && <p className="error-text">Enter a valid name</p>}
        </div>
        <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputInvalid && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
        </div>
        <div className="form-actions">
          <button disabled={!isFormValid}>Submit</button>
        </div>
      </form>
    );
};

export default SimpleInput;
