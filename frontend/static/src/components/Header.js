import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";


function Header(props) {

    const handleError = (err) => {
        console.log(err);
      }

    useEffect(() => {
        const getIsAdmin = async () => {
            const response = await fetch('/rest-auth/user/').catch(handleError);
            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                if (data.is_superuser == true)
                    props.setAdmin(true)
            }
        }
        getIsAdmin();
    }, []);

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
        <ul className='row header mx-0'>
            <li className='col navLinkButton mx-0'>
                    <NavLink className='navLinks' to='/articles'>Your Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/create'>Create Article</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/popular'>Popular Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/trending'>Trending Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/all'>Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
            </li>
        </ul>

    )

    const headerVistor = (
        <ul className='row header mx-0'>
            <li className=' col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/popular'>Popular Articles</NavLink>
            </li>
            <li className=' col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/trending'>Trending Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/all'>Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/login'>Login</Link>
            </li>
            <li className='col navLinkButton mx-0'>
                <Link className='navLinks' to='/register'>Create Account</Link>
            </li>
        </ul>
    )

    const adminUser = (
        <ul className='row header mx-0'>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/popular'>Popular Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/trending'>Trending Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/all'>Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks'to='/create'>Create Article</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/admin'>Site Articles</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <button className='logout' type='button' name='logout' onClick={handleLogout}>Sign Out</button>
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