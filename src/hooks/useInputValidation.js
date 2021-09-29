import { useState } from "react";

export default function useInputValidation(validator) {
    const [enteredValue, setEnteredValue] = useState('');
    const [isInputTouched, setIsInputTouched] = useState(false);
    const isValueValid = validator(enteredValue);
    const toShowError = !isValueValid && isInputTouched;
    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }
    const onBlurHandler = () => {
        setIsInputTouched(true);
        
    }
    const resetInput = () => {
        setIsInputTouched(false);
        setEnteredValue('');
    }
    return {
        value: enteredValue,
        isValueValid,
        toShowError,
        onBlurHandler,
        valueChangeHandler,
        reset:resetInput,
    }
}
// no error while typing for the first time =>not touched
// error when input loses its focus(consistent after first time)
// error managment after every keystroke from then ownwards 