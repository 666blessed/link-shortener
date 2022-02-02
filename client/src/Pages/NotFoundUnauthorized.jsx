import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

function NotFoundUnauthorized() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

   
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    });

    useEffect(() => {      
        setTimeout(() => {
            navigate('/');
        }, 5000)       
    });

    return ( auth.userId === null &&
        <div className='flex flex-col items-center mt-[20%]'>
            <h1 className='text-6xl font-bold mb-6'>Oops :(</h1>
            <h3 className='text-2xl '>404 - Page not found.</h3>              
            <p>You are going to be redirected in: {counter}</p>           
        </div>
    );
    
}

export default NotFoundUnauthorized;
