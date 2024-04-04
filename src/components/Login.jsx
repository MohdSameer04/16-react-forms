import { useRef, useState } from "react";

//            IN THIS COMPONENTS WE SHOW WITH THE HELP OF REF's, IN THIS WE VALIDATE THE INPUT FIELD AT THE TIME OF FORM       SUBMISSION 
export default function Login() {

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmit(event){

    // with the help of this prevent default built in function, when a user clicked on Login button so the whole page was not refreshed, otherwise when user click on login button so the whole page was refreshed, in simple words we can say not set automatically generated HTTP request
    event.preventDefault();
    
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    // console.log(enteredEmail, enteredPassword);

    const emailIsValid = enteredEmail.includes('@');

    if(!emailIsValid){
    setEmailIsInvalid(true);
    return;
  }

  setEmailIsInvalid(false);
  console.log('Sending HTTP request...');
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email"
            ref={email}
            />

        <div className="control-error">
          {emailIsInvalid && <p> Please enter a valid email address. </p>}
        </div>
      </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
