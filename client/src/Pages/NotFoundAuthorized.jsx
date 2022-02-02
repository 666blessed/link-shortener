import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

function NotFoundAuthorized() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        setTimeout(() => {
            navigate('/create');
        }, 5000)
    });


    return (
        <div className='flex flex-col items-center mt-[20%]'>
            <h1 className='text-6xl font-bold mb-6'>Oops :(</h1>
            <h3 className='text-2xl '>404 - Page not found.</h3>              
            <p>You are going to be redirected in: {counter}</p>           
        </div>
    );
}

export default NotFoundAuthorized;
