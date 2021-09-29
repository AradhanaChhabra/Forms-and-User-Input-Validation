import useInputValidation from "../hooks/useInputValidation";

const BasicForm = (props) => {
  const {
    value: firstName,
    isValueValid: isFirstNameValid,
    toShowError: errorForFirstName,
    onBlurHandler: onBlurFirstName,
    valueChangeHandler: changeFirstName,
    reset: resetFirstName,
  } = useInputValidation(value => value.trim() !=="");

    const {
      value: lastName,
      isValueValid: isLasttNameValid,
      toShowError: errorForLastName,
      onBlurHandler: onBlurLastName,
      valueChangeHandler: changeLastName,
      reset: resetLastName,
    } = useInputValidation(value => value.trim() !== '');
  
  const {
    value: enteredEmail,
    isValueValid: isEmailValid,
    toShowError: errorForEmail,
    onBlurHandler: onBlurEmail,
    valueChangeHandler: emailChangeHandler,
    reset: resetEmail,
  } = useInputValidation(value => value.includes('@'));
    
  let isFormValid = false;
  if (isFirstNameValid && isLasttNameValid&&isEmailValid)
    isFormValid = true;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(firstName);
    console.log(lastName);
    console.log(enteredEmail);
    resetFirstName();
    resetLastName();
    resetEmail();
  }
  const lastNameClass = errorForLastName ? 'form-control invalid' : 'form-control';
  const firstNameClass = errorForFirstName ? 'form-control invalid' : 'form-control';
  const emailClass= errorForEmail?'form-control invalid' : 'form-control';

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameClass}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={changeFirstName} onBlur={onBlurFirstName} value={firstName} />
          {errorForFirstName&&<p className="error-text">First Name must not be empty.</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={lastName} onChange={changeLastName} onBlur={onBlurLastName} />
          {errorForLastName &&<p className="error-text">Last Name must not be empty.</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' onChange={emailChangeHandler} value={enteredEmail} onBlur={onBlurEmail} />
        {errorForEmail&&<p className="error-text">Email must inclue '@'</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
