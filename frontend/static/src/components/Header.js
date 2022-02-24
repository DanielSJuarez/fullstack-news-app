import { useState } from 'react'
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";


function Header(props) {

    const handleError = (err) => {
        console.log(err);
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
        props.setAuth(false);
        props.setAdmin(false)
        props.navigate('/popular')  
    }

    const headerUser = (
        <ul>
            <li>
                <NavLink to='/articles'>Your Articles</NavLink>
            </li>
            <li>
                <NavLink to='/create'>Create Article</NavLink>
            </li>
            <li>
                <NavLink to='/popular'>Popular Articles</NavLink>
            </li>
            <li>
                <button type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>

    )

    const headerVistor = (
        <ul>
            <li>
                <NavLink to='/popular'>Popular Articles</NavLink>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Create Account</Link>
            </li>
        </ul>
    )

    const adminUser = (
        <ul>
            <li>
                <NavLink to='/popular'>Popular Articles</NavLink>
            </li>
            <li>
                <NavLink to='/create'>Create Article</NavLink>
            </li>
            <li>
                <NavLink to='/admin'>Site Articles</NavLink>
            </li>
            <li>
                <button type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>
    )

    return (
        <nav>
            {props.auth ? props.admin ? adminUser : headerUser : headerVistor}
        </nav>
    )
}
export default Header