import { useState } from 'react'
import Cookies from 'js-cookie';

function LoginRegisterUser({ handleError }) {

    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const [newState, setNewState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const handleSubmit = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch('/rest-auth/login/', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            setAuth(true);
            setLogin(false)
            setState({
                username: '',
                password: ''
            })
        }
    }


    const handleInput = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const newHandleInput = (event) => {
        const { name, value } = event.target;

        setNewState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
    }


    const handleLogout = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch('/rest-auth/logout/', options).catch(
            handleError
        )

        const data = await response.json();
        Cookies.remove('Authorization', `Token ${data.key}`);
        setAuth(false);
    }

    const handleCreateSubmit = async event => {
        event.preventDefault();
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newState),
        }

        const response = await fetch('/rest-auth/registration/', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            setAuth(true);
            setRegister(false);
            setLogin(false)
            setNewState({
                username: '',
                email: '',
                password1: '',
                password2: '',
            })
        }
    }


    const loginButton = (
        <button type='button' name='login' onClick={() => setLogin(true)}>Sign In</button>
    )

    const signIn = (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' placeholder='email' onChange={handleInput} required value={state.email} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='password' onChange={handleInput} required value={state.password}></input>
                </div>
                <div>
                    <button type='submit'>Login</button>
                    <button type='button' name='register' onClick={() => setRegister(true)}>Register</button>
                </div>
            </form>
        </div>
    )

    const createAccount = (
        <div>
        <form onSubmit={handleCreateSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input type='text'  name='username' id='username' placeholder='username' onChange={newHandleInput} required value={newState.username} />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' placeholder='email' onChange={newHandleInput} required value={newState.email} />
            </div>
            <div>
                <label htmlFor='password1'>Password</label>
                <input type='password' name='password1' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password1}></input>
            </div>
            <div>
                <label htmlFor='password2'>Confirm Password</label>
                <input type='password'  name='password2' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password2}></input>
            </div>
            <div className='col loginField'>
                <button type='submit'>Create Account</button>
                <button type='button' name='backToLogin' onClick={() => setRegister(false)}>Back</button>
            </div>
        </form>
        </div>
    )

    return (
        <nav>
            {login ? register ? createAccount : signIn : loginButton}
            <button type='button' name='logout' onClick={handleLogout}>Sign Out</button>
        </nav>
    )
}
export default LoginRegisterUser