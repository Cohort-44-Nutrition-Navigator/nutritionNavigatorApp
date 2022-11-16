// import logo
import logo from '../assets/logo.png';

// import react functions
import { useState } from 'react';

// import firebase functions
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

// import components
import Main from './Main';

// login component
const Login = () => {

    // initial state variables
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [user, setUser] = useState({
        email: '',
        ID: ''
    });
    const [showProfile, setShowProfile] = useState(false)
    const [favouritesNumber, setFavouritesNumber] = useState(0)

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

            // alert the user if error
            .catch(() => {
                alert('Something went wrong. Please try again.');
            });
    }

    // account login function
    const handleLogin = (e) => {

        // prevent refresh
        e.preventDefault();

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

            // alert the user if error
            .catch(() => {
                alert('Something went wrong. Please try again.');
            });
    }

    // guest login function
    const handleGuestLogin = (e) => {

        // prevent refresh
        e.preventDefault();

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

    // show profile function
    const handleProfile = (e) => {

        // prevent refresh
        e.preventDefault();

        // set show profile state
        setShowProfile(!showProfile)
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

    // Login return
    return (
        <>
            {/* header */}
            <header>
                <div className="wrapperHeader">
                    <img src={logo} alt="Nutrition Navigator Logo" />
                    <h1>Nutrition Navigator </h1>

                    {/* account information and logout button */}
                    {
                        loggedIn
                            // show the profile button only
                            ? <form action="" className='formLogout'>
                                <button id="logout" onClick={handleProfile}><i className="fa fa-user-circle-o" aria-hidden="true"></i></button>
                                {
                                    showProfile
                                        ? <ul className='accountInfo'>
                                            <li className='profile'><i className="fa fa-user" aria-hidden="true"></i>{user.email}</li>
                                            <li className='favouritesNumber'><i className="fa fa-heart fullHeart" aria-hidden="true"></i> {favouritesNumber}</li>
                                            <li><button className='logoutButton' onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button></li>
                                        </ul>
                                        : null
                                }
                            </form>
                            : null

                    }
                </div>
            </header>
        
            {/* login form */}
            <section className='login'>
                    {
                        // if logged in
                        loggedIn
                            ? null
                            // else show the inputs and the login and register buttons
                            : <form action="" className='formLogin'>
                                {/* <Link to={{pathname:"/main", state:{user: user, loggedIn: loggedIn}}}> */}
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={emailInput} onInput={(e) => setEmailInput(e.target.value)} />
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={passwordInput} onInput={(e) => setPasswordInput(e.target.value)} />
                                <button className='smallButton' id="login" onClick={handleLogin}>Login</button>
                                <button className='smallButton right' id="register" onClick={handleRegister}>Register</button>
                                <button className='bigButton' id='guestLogin' onClick={handleGuestLogin}>Continue as Guest</button>
                                {/* </Link> */}
                            </form>
                    }
                    {
                        loggedIn
                            ? /* pass user information and loggedIn state as props to Main component */
                                < Main user={user} loggedIn={loggedIn} favouritesNumber={setFavouritesNumber}/>
                            : null
                    }
            </section>
        </>
    )
}

// export component
export default Login;
