import { useState } from "react";
import Input from "./Input";
import {isEmail, isNotEmpty, hasMinLength} from '../util/validation.js';

export default function Login() {

    // THIS IS USED WHEN WE USED STATE, IN THIS FILE WE WRITE A LOGIC FOR VERIFYING THE INPUT FIELD FOR EVERY KEYSTROKE  

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [enteredPassword, setEnteredPassword] = useState('');

    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: ''
    })

    const [didEdit, setDidEdit] = useState({
        email : false,
        password : false,
    });

    // this validation logic are stored in validation.js file 
    const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);

    const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

    function handleSubmit(event) {

        event.preventDefault();

        console.log(enteredValues);
    }

    // WITH THE HELP OF STATE
    function handleInputChange(identifier, value) {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [identifier]: value
        }))

        // with the help if that it will disable identifier to false for every keystroke
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier] : false,
        }))
    }

    function handleInputBlur(identifier){
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier] : true
        }));

    }

    // function handleEmailChange(event){
    //   setEnteredEmail(event.target.value);
    // }

    // function handlePasswordChange(event){
    //   setEnteredPassword(event.target.value);
    // }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">

                <Input 
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    // with the help of on Blur if user click on another input field but in previous input field he didn't enter right credentials so he may be showed error 
                    onBlur={() => handleInputBlur('email')}
                    onChange={(event) => 
                        handleInputChange('email', event.target.value)
                    }
                    value={enteredValues.email}
                    error={emailIsInvalid && 'Please enter a valid email!'}
                />

                <Input 
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    onChange={(event) =>
                        handleInputChange('password', event.target.value)
                    }
                    onBlur={() => handleInputBlur('password')}
                    value={enteredValues.password}
                    error={passwordIsInvalid && 'Please enter a valid Password!'}
                />

            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
