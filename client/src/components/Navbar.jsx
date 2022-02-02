import React, {useContext} from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function Navbar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        auth.logout();
        navigate('/');
    }

    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-none px-2 mx-2">
                <Link to='/' id="text-logo" className="text-lg font-bold hover:text-indigo-400 duration-300">
                    Link Shortener
                </Link>
            </div> 
            <div className="flex-1 px-2 mx-2 navbar-end">
                <div className="items-stretch hidden lg:flex">
                    <NavLink to='/create' className="btn btn-ghost btn-sm rounded-btn">
                        Create
                    </NavLink> 
                    <NavLink to='/links' className="btn btn-ghost btn-sm rounded-btn">
                        Your Links
                    </NavLink> 
                    <a href='/' className="btn btn-ghost btn-sm rounded-btn" onClick={handleLogout}>
                        Log Out
                    </a>        
                </div>
            </div> 
        </div>
    );
}

export default Navbar;
