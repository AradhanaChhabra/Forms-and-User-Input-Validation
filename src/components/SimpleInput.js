import useValidation from "../hooks/use-validation";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValueValid: isNameValid,
    isInputInvalid: isNameInputInvalid,
    onChangeHandler: nameInputChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: resetNameInput } = useValidation(value => value.trim() !== "");
  
  const {
    value: enteredEmail,
    isValueValid: isEmailValid,
    isInputInvalid: isEmailInputInvalid,
    onChangeHandler: emailInputChangeHandler,
    onBlurHandler: emailInputBlurHandler,
    reset:resetEmail
  } = useValidation(value => value.includes('@'));

  let isFormValid = false;
  if(isNameValid && isEmailValid)
    isFormValid = true;
  
  const submitHandler = event => {
    event.preventDefault();
    // by default http request is sent to the server serving this website
    // and page will be relaoded, current states will be losed
    if (!isNameValid)
      return;
    console.log(enteredName);
    // current property of the refs holds the value assigned to ref
    // pointer to the input element holded in current 
    
    //Resetting the value
    resetNameInput();
    // inputRef.current.value = '';  WITH refs NOT IDEAL || DONOT MANIPULATE THE REAL DOM 
    resetEmail();
  }
  
  const nameInputClass =isNameInputInvalid ? "form-control invalid" : "form-control";
  const emailInputClasses = isEmailInputInvalid? 'form-control invalid': 'form-control';
  
    return (
      <form onSubmit={submitHandler}>
        <div className={nameInputClass}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} onBlur={nameBlurHandler}/>
          {isNameInputInvalid && <p className="error-text">Enter a valid name</p>}
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
        {isEmailInputInvalid && (
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
