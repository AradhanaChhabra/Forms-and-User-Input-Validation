import { useState } from 'react';
const useValidation = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isInputTouched, setIsInputTouched] = useState(false);
    const isValueValid = validateValue(enteredValue);
    const isInputInvalid = !isValueValid && isInputTouched;
    const onChangeHandler = event => {
        setEnteredValue(event.target.value);
    }
    const onBlurHandler = () => {
        setIsInputTouched(true);
    }
    const reset = () => {
        setEnteredValue('');
        setIsInputTouched(false);
    }
    return {
        value: enteredValue,
        isValueValid,
        isInputInvalid,
        onChangeHandler,
        onBlurHandler,
        reset 
    }

}
export default useValidation;
// to avoid code duplication we could have used another input component but 
// there could be a lot of code passing via props 
// so we could use A CUSTOM HOOK for extracting validation logic 