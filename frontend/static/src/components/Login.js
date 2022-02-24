import {useState} from 'react'
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";

function Login(props){
    const [auth, setAuth, navigate] = useOutletContext();
    
    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const handleError = (err) => {
        console.log(err);
      }

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
            setState({
                username: '',
                password: ''
            })
        }
        navigate('/articles')
    }


    const handleInput = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
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
                </div>
            </form>
        </div>
    )
}

export default Login