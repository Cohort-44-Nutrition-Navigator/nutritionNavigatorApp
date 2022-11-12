// import state functions
import { useState } from 'react';

// import Firebase functions
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

// import components
import Main from './Main';

const Login = () => {

    // initial state variables
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [user, setUser] = useState({
        email: '',
        ID: ''
    });

    // authentication from Firebase
    const authentication = getAuth();

    // account registration function
    const handleRegister = (e) => {
        // prevent refresh
        e.preventDefault();
        // create user account passing auth function and inputs to Firebase
        createUserWithEmailAndPassword(authentication, emailInput, passwordInput)
            // when the response comes back from Firebase
            .then((response) => {
                // log in
                setLoggedIn(true);
                // empty inputs
                setEmailInput('');
                setPasswordInput('');
                // store the unique user info in state
                setUser({
                    email: response.user.email,
                    ID: response.user.uid
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // account login function
    const handleLogin = (e) => {
        // prevent refresh
        //e.preventDefault();
        // sign in user account passing auth function and inputs to Firebase
        signInWithEmailAndPassword(authentication, emailInput, passwordInput)
            // when the response comes back from Firebase
            .then((response) => {
                // log in
                setLoggedIn(true);
                // empty inputs
                setEmailInput('');
                setPasswordInput('');
                // store the unique user info in state
                setUser({
                    email: response.user.email,
                    ID: response.user.uid
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // guest login function
    const handleGuestLogin = (e) => {
        // prevent refresh
        //e.preventDefault();
        // log in
        setLoggedIn(true);
        // empty inputs
        setEmailInput('');
        setPasswordInput('');
        // store the unique user info in state
        setUser({
            email: 'guest@nutritionnavigator.com',
            ID: 'guest'
        });
    }

    // account logout function
    const handleLogout = (e) => {
        // prevent refresh
        e.preventDefault();
        // log out
        setLoggedIn(false);
        // empty the user state
        setUser({
            email: '',
            ID: ''
        });
    }

    return (
        <div class="wrapper">
            {/* login form */}
            <form action="">
                {
                    // if logged in
                    loggedIn
                        // show the logout button only
                        ? <>
                            <button id="logout" onClick={handleLogout}>Logout</button>
                        </>
                        // else show the inputs and the login and register buttons
                        : <>
                            {/* <Link to={{pathname:"/main", state:{user: user, loggedIn: loggedIn}}}> */}
                            <input type="email" name="email" id="email" value={emailInput} onInput={(e) => setEmailInput(e.target.value)} />
                            <input type="password" name="password" id="password" value={passwordInput} onInput={(e) => setPasswordInput(e.target.value)} />
                            <button id="login" onClick={handleLogin}>Login</button>
                            <button id="register" onClick={handleRegister}>Register</button>
                            <button id='guestLogin' onClick={handleGuestLogin}>Continue as Guest</button>
                            {/* </Link> */}
                        </>
                }
            </form>
            {
                loggedIn
                    ? /* pass user information and loggedIn state as props to Main component */
                    < Main user={user} loggedIn={loggedIn} />
                    : null
            }
            
        </div>
    )
}

export default Login;