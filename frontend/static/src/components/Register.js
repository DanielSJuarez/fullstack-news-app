import { useState } from 'react';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function Register(props){
    const [auth, setAuth] = useOutletContext();
    const [newState, setNewState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const handleError = (err) => {
        console.log(err);
      }

    const newHandleInput = (event) => {
        const { name, value } = event.target;

        setNewState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
            setNewState({
                username: '',
                email: '',
                password1: '',
                password2: '',
            })
        }
        props.navigate('/articles')
    }

        return (
            <div>
            <h3>New Article</h3>
            <form onSubmit={handleCreateSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='username' onChange={newHandleInput} required value={newState.username} />
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
                    <input type='password' name='password2' id='password' placeholder='password' onChange={newHandleInput} required value={newState.password2}></input>
                </div>
                <div className='col loginField'>
                    <button type='submit'>Create Account</button>
                </div>
            </form>
        </div>
        )
}

export default Register