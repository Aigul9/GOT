import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={'/img/error.jpg'} alt='error'></img>
            {/* <img src={img} alt='error'></img> */}
            <span>Something is going wrong</span>
        </>
    )
}

export default ErrorMessage;